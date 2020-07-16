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

export function monkeyPatchChartJsLegend() {
  if (typeof Chart === 'undefined') {
    console.log('Chart not defined (guessing this is a universal build, and I don\'t know why this happens -- Aviad)');
    return;
  }
  const plugins = Chart.plugins.getAll();
  const legend = plugins.filter(p => p.id === 'legend')[0];
  legend._element.prototype.fit = fit;
  legend._element.prototype.draw = draw;

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
          var width, height;

          if (helpers.isArray(legendItem.text)) {
            width = getMaxLineWidth(legendItem.text);
            height = fontSize * legendItem.text.length + labelOpts.padding;
          } else {
            width = ctx.measureText(legendItem.text).width;
            height = fontSize + labelOpts.padding;
          }
          width += getBoxWidth(labelOpts, fontSize) + (fontSize / 2);

          if (lineWidths[lineWidths.length - 1] + width + 2 * labelOpts.padding > minSize.width) {
            lineHeights.push(currentLineHeight);
            currentLineHeight = 0;
            lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
            lineIndex++;
          }

          legendItem.lineOrColumnIndex = lineIndex;

          if (height > currentLineHeight) {
            currentLineHeight = height;
          }

          // Store the hitbox width and height here. Final position will be updated in `draw`
          hitboxes[i] = {
            left: 0,
            top: 0,
            width: width,
            height: height,
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
    var me = this;
    var opts = me.options;
    var labelOpts = opts.labels;
    var globalDefaults = defaults.global;
    var defaultColor = globalDefaults.defaultColor;
    var lineDefault = globalDefaults.elements.line;
    var legendHeight = me.height;
    var columnHeights = me.columnHeights;
    var columnWidths = me.columnWidths;
    var legendWidth = me.width;
    var lineWidths = me.lineWidths;
    var lineHeights = me.lineHeights;

    if (opts.display) {
      var ctx = me.ctx;
      var fontColor = valueOrDefault(labelOpts.fontColor, globalDefaults.defaultFontColor);
      var labelFont = helpers.options._parseFont(labelOpts);
      var fontSize = labelFont.size;
      var cursor;

      // Canvas setup
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = fontColor; // for strikethrough effect
      ctx.fillStyle = fontColor; // render in correct colour
      ctx.font = labelFont.string;

      var boxWidth = getBoxWidth(labelOpts, fontSize);
      var hitboxes = me.legendHitBoxes;

      // current position
      var drawLegendBox = function (x, y, legendItem) {
        if (isNaN(boxWidth) || boxWidth <= 0) {
          return;
        }

        // Set the ctx for the box
        ctx.save();

        var lineWidth = valueOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
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
          var radius = boxWidth * Math.SQRT2 / 2;
          var centerX = x + boxWidth / 2;
          var centerY = y + fontSize / 2;

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

      var drawStrikeThrough = function (x, y, w) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.stroke();
      };

      var drawCrossOver = function (x, y, w, h) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y + h);
        ctx.moveTo(x, y + h);
        ctx.lineTo(x + w, y);
        ctx.stroke();
      };

      var fillText = function (x, y, legendItem, textWidth) {
        var halfFontSize = fontSize / 2;
        var xLeft = boxWidth + halfFontSize + x;
        var yMiddle = y + halfFontSize;

        if (helpers.isArray(legendItem.text)) {
          helpers.each(legendItem.text, function (textLine, index) {
            var lineOffset = index * fontSize;
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

      var alignmentOffset = function (dimension, blockSize) {
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
      var isHorizontal = me.isHorizontal();
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

      helpers.each(me.legendItems, function (legendItem, i) {
        var textWidth, height, boxTopOffset;

        if (legendItem.lineOrColumnIndex > cursor.line) {
          if (isHorizontal) {
            cursor.y += lineHeights[cursor.line];
            cursor.line = legendItem.lineOrColumnIndex;
            cursor.x = me.left + alignmentOffset(legendWidth, lineWidths[cursor.line]);
          } else {
            cursor.x += columnWidths[cursor.line] + labelOpts.padding;
            cursor.line = legendItem.lineOrColumnIndex;
            cursor.y = me.top + alignmentOffset(legendHeight, columnHeights[cursor.line]);
          }
        }

        if (helpers.isArray(legendItem.text)) {
          textWidth = legendItem.text.map(function (textLine) {
            return ctx.measureText(textLine).width;
          }).reduce(function (acc, v) {
            return v > acc ? v : acc;
          }, 0);
          boxTopOffset = fontSize / 2 * (legendItem.text.length - 1);
          height = fontSize * legendItem.text.length;
        } else {
          textWidth = ctx.measureText(legendItem.text).width;
          boxTopOffset = 0;
          height = fontSize;
        }

        var width = boxWidth + (fontSize / 2) + textWidth;
        var x = cursor.x;
        var y = cursor.y;

        var topOffset = isHorizontal ? Math.trunc((lineHeights[cursor.line] - hitboxes[i].height) / 2) : 0;

        drawLegendBox(x, y + boxTopOffset + topOffset, legendItem);

        hitboxes[i].left = x;
        hitboxes[i].top = y;

        // Fill the actual label
        fillText(x, y + topOffset, legendItem, textWidth);

        if (isHorizontal) {
          cursor.x += width + labelOpts.padding;
        } else {
          cursor.y += height + labelOpts.padding;
        }
      });
    }
  }
}
