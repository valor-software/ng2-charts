// tslint:disable:variable-name
// tslint:disable:no-var-keyword
// tslint:disable:prefer-const
// tslint:disable:only-arrow-functions
// tslint:disable:one-variable-per-declaration
// tslint:disable:object-literal-shorthand
// tslint:disable:space-before-function-paren

declare class Chart {
  static readonly Chart: typeof Chart;
  static readonly Tooltip: any;
  static readonly helpers: any;
  static readonly defaults: any;
  static readonly plugins: any;
}

const helpers = Chart.helpers;
const defaults = Chart.defaults;
const valueOrDefault = helpers.valueOrDefault;

function getBoxWidth(labelOpts, fontSize) {
  return labelOpts.usePointStyle && labelOpts.boxWidth > fontSize ?
    fontSize :
    labelOpts.boxWidth;
}

function fit() {
  var me = this;
  var opts = me.options;
  var labelOpts = opts.labels;
  var display = opts.display;

  var ctx = me.ctx;

  var labelFont = helpers.options._parseFont(labelOpts);
  var fontSize = labelFont.size;

  // Reset hit boxes
  var hitboxes = me.legendHitBoxes = [];

  var minSize = me.minSize;
  var isHorizontal = me.isHorizontal();

  if (isHorizontal) {
    minSize.width = me.maxWidth; // fill all the width
    minSize.height = display ? 10 : 0;
  } else {
    minSize.width = display ? 10 : 0;
    minSize.height = me.maxHeight; // fill all the height
  }

  var getMaxLineWidth = function (textLines) {
    return textLines.map(function (textLine) {
      return ctx.measureText(textLine).width;
    }).reduce(function (acc, v) {
      return v > acc ? v : acc;
    }, 0);
  };

  // Increase sizes here
  if (display) {
    ctx.font = labelFont.string;

    if (isHorizontal) {

      // Labels

      // Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
      var lineWidths = me.lineWidths = [0];
      var lineHeights = me.lineHeights = [];
      var currentLineHeight = 0;
      var lineIndex = 0;

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      helpers.each(me.legendItems, function (legendItem, i) {
        var width, height, grossHeight;

        if (helpers.isArray(legendItem.text)) {
          width = getMaxLineWidth(legendItem.text);
          height = fontSize * legendItem.text.length;
          grossHeight = height;
        } else {
          width = ctx.measureText(legendItem.text).width;
          height = fontSize;
          grossHeight = height + labelOpts.padding;
        }
        width += getBoxWidth(labelOpts, fontSize) + (fontSize / 2);

        if (lineWidths[lineWidths.length - 1] + width + 2 * labelOpts.padding > minSize.width) {
          lineHeights.push(currentLineHeight);
          currentLineHeight = 0;
          lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
          lineIndex++;
        }

        legendItem.lineOrColumnIndex = lineIndex;

        if (grossHeight > currentLineHeight) {
          currentLineHeight = grossHeight;
        }

        // Store the hitbox width and height here. Final position will be updated in `draw`
        hitboxes[i] = {
          left: 0,
          top: 0,
          width: width,
          height: grossHeight,
        };

        lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
      });

      lineHeights.push(currentLineHeight);
      minSize.height += lineHeights.reduce(function (acc, v) {
        return acc + v;
      }, 0);

    } else {
      var vPadding = labelOpts.padding;
      var columnWidths = me.columnWidths = [];
      var columnHeights = me.columnHeights = [];
      var totalWidth = labelOpts.padding;
      var currentColWidth = 0;
      var currentColHeight = 0;
      var columnIndex = 0;

      helpers.each(me.legendItems, function (legendItem, i) {
        var itemWidth;
        var height;

        if (helpers.isArray(legendItem.text)) {
          itemWidth = getMaxLineWidth(legendItem.text);
          height = fontSize * legendItem.text.length;
        } else {
          itemWidth = ctx.measureText(legendItem.text).width;
          height = fontSize;
        }
        itemWidth += getBoxWidth(labelOpts, fontSize) + (fontSize / 2);

        // If too tall, go to new column
        if (currentColHeight + fontSize + 2 * vPadding > minSize.height) {
          totalWidth += currentColWidth + labelOpts.padding;
          columnWidths.push(currentColWidth); // previous column width
          columnHeights.push(currentColHeight);
          currentColWidth = 0;
          currentColHeight = 0;
          columnIndex++;
        }

        legendItem.lineOrColumnIndex = columnIndex;

        // Get max width
        currentColWidth = Math.max(currentColWidth, itemWidth);
        currentColHeight += height + vPadding;

        // Store the hitbox width and height here. Final position will be updated in `draw`
        hitboxes[i] = {
          left: 0,
          top: 0,
          width: itemWidth,
          height: height
        };
      });

      totalWidth += currentColWidth;
      columnWidths.push(currentColWidth);
      columnHeights.push(currentColHeight);
      minSize.width += totalWidth;
    }
  }

  me.width = minSize.width;
  me.height = minSize.height;
}

function draw() {
  const me = this;
  const opts = me.options;
  const labelOpts = opts.labels;
  const globalDefaults = defaults.global;
  const defaultColor = globalDefaults.defaultColor;
  const lineDefault = globalDefaults.elements.line;
  const legendHeight = me.height;
  const columnHeights = me.columnHeights;
  const legendWidth = me.width;
  const lineWidths = me.lineWidths;

  if (opts.display) {
    const ctx = me.ctx;
    const fontColor = valueOrDefault(labelOpts.fontColor, globalDefaults.defaultFontColor);
    const labelFont = helpers.options._parseFont(labelOpts);
    const fontSize = labelFont.size;
    let cursor;

    // Canvas setup
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = fontColor; // for strikethrough effect
    ctx.fillStyle = fontColor; // render in correct colour
    ctx.font = labelFont.string;

    const boxWidth = getBoxWidth(labelOpts, fontSize);
    const hitboxes = me.legendHitBoxes;

    const maxHeight = hitboxes.map(x => {
      return x.height;
    }).reduce((acc, v) => {
      return v > acc ? v : acc;
    }, 0);

    // current position
    const drawLegendBox = (x, y, legendItem) => {
      if (isNaN(boxWidth) || boxWidth <= 0) {
        return;
      }

      // Set the ctx for the box
      ctx.save();

      const lineWidth = valueOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
      ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
      ctx.lineCap = valueOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
      ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
      ctx.lineJoin = valueOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);

      if (ctx.setLineDash) {
        // IE 9 and 10 do not support line dash
        ctx.setLineDash(valueOrDefault(legendItem.lineDash, lineDefault.borderDash));
      }

      if (opts.labels && opts.labels.usePointStyle) {
        // Recalculate x and y for drawPoint() because its expecting
        // x and y to be center of figure (instead of top left)
        const radius = boxWidth * Math.SQRT2 / 2;
        const centerX = x + boxWidth / 2;
        const centerY = y + fontSize / 2;

        // Draw pointStyle as legend symbol
        helpers.canvas.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY);
      } else {
        // Draw box as legend symbol
        if (lineWidth !== 0) {
          ctx.strokeRect(x, y, boxWidth, fontSize);
        }
        ctx.fillRect(x, y, boxWidth, fontSize);
      }

      ctx.restore();
    };

    const drawStrikeThrough = (x, y, w) => {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(x, y);
      ctx.lineTo(x + w, y);
      ctx.stroke();
    };

    const drawCrossOver = (x, y, w, h) => {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(x, y);
      ctx.lineTo(x + w, y + h);
      ctx.moveTo(x, y + h);
      ctx.lineTo(x + w, y);
      ctx.stroke();
    };

    const fillText = (x, y, legendItem, textWidth) => {
      const halfFontSize = fontSize / 2;
      const xLeft = boxWidth + halfFontSize + x;
      const yMiddle = y + halfFontSize;

      if (helpers.isArray(legendItem.text)) {
        helpers.each(legendItem.text, (textLine, index) => {
          const lineOffset = index * fontSize;
          ctx.fillText(textLine, xLeft, yMiddle + lineOffset);
        });
      } else {
        ctx.fillText(legendItem.text, xLeft, yMiddle);
      }

      if (legendItem.hidden) {
        if (helpers.isArray(legendItem.text)) {
          drawCrossOver(xLeft, yMiddle, textWidth, (legendItem.text.length - 1) * (fontSize - 1));
        } else {
          drawStrikeThrough(xLeft, yMiddle, textWidth);
        }
      }
    };

    const alignmentOffset = (dimension, blockSize) => {
      switch (opts.align) {
        case 'start':
          return labelOpts.padding;
        case 'end':
          return dimension - blockSize;
        default: // center
          return (dimension - blockSize + labelOpts.padding) / 2;
      }
    };

    // Horizontal
    const isHorizontal = me.isHorizontal();
    if (isHorizontal) {
      cursor = {
        x: me.left + alignmentOffset(legendWidth, lineWidths[0]),
        y: me.top + labelOpts.padding,
        line: 0
      };
    } else {
      cursor = {
        x: me.left + labelOpts.padding,
        y: me.top + alignmentOffset(legendHeight, columnHeights[0]),
        line: 0
      };
    }

    const itemHeight = maxHeight;
    helpers.each(me.legendItems, (legendItem, i) => {
      let textWidth;
      let boxTopOffset;

      if (helpers.isArray(legendItem.text)) {
        textWidth = legendItem.text.map(textLine => {
          return ctx.measureText(textLine).width;
        }).reduce((acc, v) => {
          return v > acc ? v : acc;
        }, 0);
        boxTopOffset = fontSize / 2 * (legendItem.text.length - 1);
      } else {
        textWidth = ctx.measureText(legendItem.text).width;
        boxTopOffset = 0;
      }

      const width = boxWidth + (fontSize / 2) + textWidth;
      let x = cursor.x;
      const topOffset = Math.trunc((maxHeight - hitboxes[i].height) / 2);
      let y = cursor.y + topOffset;

      // Use (me.left + me.minSize.width) and (me.top + me.minSize.height)
      // instead of me.right and me.bottom because me.width and me.height
      // may have been changed since me.minSize was calculated
      if (isHorizontal) {
        if (i > 0 && x + width + labelOpts.padding > me.left + me.minSize.width) {
          y = cursor.y += itemHeight;
          cursor.line++;
          x = cursor.x = me.left + alignmentOffset(legendWidth, lineWidths[cursor.line]);
        }
      } else if (i > 0 && y + itemHeight > me.top + me.minSize.height) {
        x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
        cursor.line++;
        y = cursor.y = me.top + alignmentOffset(legendHeight, columnHeights[cursor.line]);
      }

      drawLegendBox(x, y + boxTopOffset, legendItem);

      hitboxes[i].left = x;
      hitboxes[i].top = y;

      // Fill the actual label
      fillText(x, y, legendItem, textWidth);

      if (isHorizontal) {
        cursor.x += width + labelOpts.padding;
      } else {
        cursor.y += itemHeight;
      }
    });
  }
}

export function monkeyPatchChartJsLegend() {
  const plugins = Chart.plugins.getAll();
  const legend = plugins.filter(p => p.id === 'legend')[0];
  legend._element.prototype.fit = fit;
  legend._element.prototype.draw = draw;
}
