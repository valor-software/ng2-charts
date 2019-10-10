(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/chartjs-chart-financial/chartjs-chart-financial.js":
/*!*****************************************************************!*\
  !*** ./dist/chartjs-chart-financial/chartjs-chart-financial.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * @license
 * chartjs-chart-financial
 * http://chartjs.org/
 * Version: 0.1.0
 *
 * Copyright 2019 Chart.js Contributors
 * Released under the MIT license
 * https://github.com/chartjs/chartjs-chart-financial/blob/master/LICENSE.md
 */
(function (global, factory) {
 true ? factory(__webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js")) :
undefined;
}(this, function (Chart) { 'use strict';

Chart = Chart && Chart.hasOwnProperty('default') ? Chart['default'] : Chart;

var helpers = Chart.helpers;

var defaultConfig = {
	position: 'left',
	ticks: {
		callback: Chart.Ticks.formatters.linear
	}
};

var FinancialLinearScale = Chart.scaleService.getScaleConstructor('linear').extend({

	determineDataLimits: function() {
		var me = this;
		var chart = me.chart;
		var data = chart.data;
		var datasets = data.datasets;
		var isHorizontal = me.isHorizontal();

		function IDMatches(meta) {
			return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
		}

		// First Calculate the range
		me.min = null;
		me.max = null;

		// Regular charts use x, y values
		// For the financial chart we have rawValue.h (hi) and rawValue.l (low) for each point
		helpers.each(datasets, function(dataset, datasetIndex) {
			var meta = chart.getDatasetMeta(datasetIndex);
			if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
				helpers.each(dataset.data, function(rawValue) {
					var high = rawValue.h;
					var low = rawValue.l;

					if (me.min === null) {
						me.min = low;
					} else if (low < me.min) {
						me.min = low;
					}

					if (me.max === null) {
						me.max = high;
					} else if (high > me.max) {
						me.max = high;
					}
				});
			}
		});

		// Add whitespace around bars. Axis shouldn't go exactly from min to max
		var space = (me.max - me.min) * 0.05;
		me.min -= space;
		me.max += space;

		// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
		this.handleTickRangeOptions();
	}
});

Chart.scaleService.registerScaleType('financialLinear', FinancialLinearScale, defaultConfig);

var helpers$1 = Chart.helpers;

Chart.defaults.financial = {
	label: '',

	hover: {
		mode: 'label'
	},

	scales: {
		xAxes: [{
			type: 'time',
			distribution: 'series',
			categoryPercentage: 0.8,
			barPercentage: 0.9,
			ticks: {
				source: 'data'
			}
		}],
		yAxes: [{
			type: 'financialLinear'
		}]
	},

	tooltips: {
		intersect: false,
		mode: 'index',
		callbacks: {
			label: function(tooltipItem, data) {
				var o = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].o;
				var h = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].h;
				var l = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].l;
				var c = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].c;

				var dataset = data.datasets[tooltipItem.datasetIndex];
				var precision = helpers$1.valueOrDefault(dataset.precision, 2);
				precision = Math.max(0, Math.min(100, precision));
				o = o.toFixed(precision);
				h = h.toFixed(precision);
				l = l.toFixed(precision);
				c = c.toFixed(precision);

				return ' O: ' + o + '    H: ' + h + '    L: ' + l + '    C: ' + c;
			}
		}
	}
};

/**
 * This class is based off controller.bar.js from the upstream Chart.js library
 */
var FinancialController = Chart.controllers.bar.extend({

	dataElementType: Chart.elements.Financial,

	/**
	 * @private
	 */
	_updateElementGeometry: function(element, index, reset) {
		var me = this;
		var model = element._model;
		var vscale = me._getValueScale();
		var base = vscale.getBasePixel();
		var horizontal = vscale.isHorizontal();
		var ruler = me._ruler || me.getRuler();
		var vpixels = me.calculateBarValuePixels(me.index, index);
		var ipixels = me.calculateBarIndexPixels(me.index, index, ruler);
		var chart = me.chart;
		var datasets = chart.data.datasets;
		var indexData = datasets[me.index].data[index];

		model.horizontal = horizontal;
		model.base = reset ? base : vpixels.base;
		model.x = horizontal ? reset ? base : vpixels.head : ipixels.center;
		model.y = horizontal ? ipixels.center : reset ? base : vpixels.head;
		model.height = horizontal ? ipixels.size : undefined;
		model.width = horizontal ? undefined : ipixels.size;
		model.candleOpen = vscale.getPixelForValue(Number(indexData.o));
		model.candleHigh = vscale.getPixelForValue(Number(indexData.h));
		model.candleLow = vscale.getPixelForValue(Number(indexData.l));
		model.candleClose = vscale.getPixelForValue(Number(indexData.c));
	},

	draw: function() {
		var ctx = this.chart.chart.ctx;
		var elements = this.getMeta().data;
		var dataset = this.getDataset();
		var ilen = elements.length;
		var i = 0;
		var d;

		Chart.canvasHelpers.clipArea(ctx, this.chart.chartArea);

		for (; i < ilen; ++i) {
			d = dataset.data[i].o;
			if (d !== null && d !== undefined && !isNaN(d)) {
				elements[i].draw();
			}
		}

		Chart.canvasHelpers.unclipArea(ctx);
	},
});

var helpers$2 = Chart.helpers;
var globalOpts = Chart.defaults.global;

globalOpts.elements.financial = {
	color: {
		up: 'rgba(80, 160, 115, 1)',
		down: 'rgba(215, 85, 65, 1)',
		unchanged: 'rgba(90, 90, 90, 1)',
	}
};

function isVertical(bar) {
	return bar._view.width !== undefined;
}

/**
 * Helper function to get the bounds of the candle
 * @private
 * @param bar {Chart.Element.financial} the bar
 * @return {Bounds} bounds of the bar
 */
function getBarBounds(candle) {
	var vm = candle._view;
	var x1, x2, y1, y2;

	var halfWidth = vm.width / 2;
	x1 = vm.x - halfWidth;
	x2 = vm.x + halfWidth;
	y1 = vm.candleHigh;
	y2 = vm.candleLow;

	return {
		left: x1,
		top: y1,
		right: x2,
		bottom: y2
	};
}

var FinancialElement = Chart.Element.extend({

	height: function() {
		var vm = this._view;
		return vm.base - vm.y;
	},
	inRange: function(mouseX, mouseY) {
		var inRange = false;

		if (this._view) {
			var bounds = getBarBounds(this);
			inRange = mouseX >= bounds.left && mouseX <= bounds.right && mouseY >= bounds.top && mouseY <= bounds.bottom;
		}

		return inRange;
	},
	inLabelRange: function(mouseX, mouseY) {
		var me = this;
		if (!me._view) {
			return false;
		}

		var inRange = false;
		var bounds = getBarBounds(me);

		if (isVertical(me)) {
			inRange = mouseX >= bounds.left && mouseX <= bounds.right;
		} else {
			inRange = mouseY >= bounds.top && mouseY <= bounds.bottom;
		}

		return inRange;
	},
	inXRange: function(mouseX) {
		var bounds = getBarBounds(this);
		return mouseX >= bounds.left && mouseX <= bounds.right;
	},
	inYRange: function(mouseY) {
		var bounds = getBarBounds(this);
		return mouseY >= bounds.top && mouseY <= bounds.bottom;
	},
	getCenterPoint: function() {
		var vm = this._view;
		return {
			x: vm.x,
			y: (vm.candleHigh + vm.candleLow) / 2
		};
	},
	getArea: function() {
		var vm = this._view;
		return vm.width * Math.abs(vm.y - vm.base);
	},
	tooltipPosition: function() {
		var vm = this._view;
		return {
			x: vm.x,
			y: (vm.candleOpen + vm.candleClose) / 2
		};
	},
	hasValue: function() {
		var model = this._model;
		return helpers$2.isNumber(model.x) &&
			helpers$2.isNumber(model.candleOpen) &&
			helpers$2.isNumber(model.candleHigh) &&
			helpers$2.isNumber(model.candleLow) &&
			helpers$2.isNumber(model.candleClose);
	}
});

var helpers$3 = Chart.helpers;
var globalOpts$1 = Chart.defaults.global;

globalOpts$1.elements.candlestick = helpers$3.merge({}, [globalOpts$1.elements.financial, {
	borderColor: globalOpts$1.elements.financial.color.unchanged,
	borderWidth: 1,
}]);

var CandlestickElement = FinancialElement.extend({
	draw: function() {
		var ctx = this._chart.ctx;
		var vm = this._view;

		var x = vm.x;
		var o = vm.candleOpen;
		var h = vm.candleHigh;
		var l = vm.candleLow;
		var c = vm.candleClose;

		var borderColors = vm.borderColor;
		if (typeof borderColors === 'string') {
			borderColors = {
				up: borderColors,
				down: borderColors,
				unchanged: borderColors
			};
		}

		var borderColor;
		if (c < o) {
			borderColor = helpers$3.getValueOrDefault(borderColors ? borderColors.up : undefined, globalOpts$1.elements.candlestick.borderColor);
			ctx.fillStyle = helpers$3.getValueOrDefault(vm.color ? vm.color.up : undefined, globalOpts$1.elements.candlestick.color.up);
		} else if (c > o) {
			borderColor = helpers$3.getValueOrDefault(borderColors ? borderColors.down : undefined, globalOpts$1.elements.candlestick.borderColor);
			ctx.fillStyle = helpers$3.getValueOrDefault(vm.color ? vm.color.down : undefined, globalOpts$1.elements.candlestick.color.down);
		} else {
			borderColor = helpers$3.getValueOrDefault(borderColors ? borderColors.unchanged : undefined, globalOpts$1.elements.candlestick.borderColor);
			ctx.fillStyle = helpers$3.getValueOrDefault(vm.color ? vm.color.unchanged : undefined, globalOpts$1.elements.candlestick.color.unchanged);
		}

		ctx.lineWidth = helpers$3.getValueOrDefault(vm.borderWidth, globalOpts$1.elements.candlestick.borderWidth);
		ctx.strokeStyle = helpers$3.getValueOrDefault(borderColor, globalOpts$1.elements.candlestick.borderColor);

		ctx.beginPath();
		ctx.moveTo(x, h);
		ctx.lineTo(x, Math.min(o, c));
		ctx.moveTo(x, l);
		ctx.lineTo(x, Math.max(o, c));
		ctx.stroke();
		ctx.fillRect(x - vm.width / 2, c, vm.width, o - c);
		ctx.strokeRect(x - vm.width / 2, c, vm.width, o - c);
		ctx.closePath();
	},
});

Chart.defaults.candlestick = Chart.helpers.merge({}, Chart.defaults.financial);

var CandlestickController = Chart.controllers.candlestick = FinancialController.extend({
	dataElementType: CandlestickElement,

	updateElement: function(element, index, reset) {
		var me = this;
		var meta = me.getMeta();
		var dataset = me.getDataset();

		element._xScale = me.getScaleForId(meta.xAxisID);
		element._yScale = me.getScaleForId(meta.yAxisID);
		element._datasetIndex = me.index;
		element._index = index;

		element._model = {
			datasetLabel: dataset.label || '',
			// label: '', // to get label value please use dataset.data[index].label

			// Appearance
			color: dataset.color,
			borderColor: dataset.borderColor,
			borderWidth: dataset.borderWidth,
		};

		me._updateElementGeometry(element, index, reset);

		element.pivot();
	},

});

var helpers$4 = Chart.helpers;
var globalOpts$2 = Chart.defaults.global;

globalOpts$2.elements.ohlc = helpers$4.merge({}, [globalOpts$2.elements.financial, {
	lineWidth: 2,
	armLength: null,
	armLengthRatio: 0.8,
}]);

var OhlcElement = FinancialElement.extend({
	draw: function() {
		var ctx = this._chart.ctx;
		var vm = this._view;

		var x = vm.x;
		var o = vm.candleOpen;
		var h = vm.candleHigh;
		var l = vm.candleLow;
		var c = vm.candleClose;
		var armLength = helpers$4.getValueOrDefault(vm.armLength, globalOpts$2.elements.ohlc.armLength);
		var armLengthRatio = helpers$4.getValueOrDefault(vm.armLengthRatio, globalOpts$2.elements.ohlc.armLengthRatio);
		if (armLength === null) {
			// The width of an ohlc is affected by barPercentage and categoryPercentage
			// This behavior is caused by extending controller.financial, which extends controller.bar
			// barPercentage and categoryPercentage are now set to 1.0 (see controller.ohlc)
			// and armLengthRatio is multipled by 0.5,
			// so that when armLengthRatio=1.0, the arms from neighbour ohcl touch,
			// and when armLengthRatio=0.0, ohcl are just vertical lines.
			armLength = vm.width * armLengthRatio * 0.5;
		}

		if (c < o) {
			ctx.strokeStyle = helpers$4.getValueOrDefault(vm.color ? vm.color.up : undefined, globalOpts$2.elements.ohlc.color.up);
		} else if (c > o) {
			ctx.strokeStyle = helpers$4.getValueOrDefault(vm.color ? vm.color.down : undefined, globalOpts$2.elements.ohlc.color.down);
		} else {
			ctx.strokeStyle = helpers$4.getValueOrDefault(vm.color ? vm.color.unchanged : undefined, globalOpts$2.elements.ohlc.color.unchanged);
		}
		ctx.lineWidth = helpers$4.getValueOrDefault(vm.lineWidth, globalOpts$2.elements.ohlc.lineWidth);

		ctx.beginPath();
		ctx.moveTo(x, h);
		ctx.lineTo(x, l);
		ctx.moveTo(x - armLength, o);
		ctx.lineTo(x, o);
		ctx.moveTo(x + armLength, c);
		ctx.lineTo(x, c);
		ctx.stroke();
	},
});

Chart.defaults.ohlc = Chart.helpers.merge({}, Chart.defaults.financial);
Chart.defaults.ohlc.scales.xAxes[0].barPercentage = 1.0;
Chart.defaults.ohlc.scales.xAxes[0].categoryPercentage = 1.0;

var OhlcController = Chart.controllers.ohlc = FinancialController.extend({

	dataElementType: OhlcElement,

	updateElement: function(element, index, reset) {
		var me = this;
		var meta = me.getMeta();
		var dataset = me.getDataset();
		element._xScale = me.getScaleForId(meta.xAxisID);
		element._yScale = me.getScaleForId(meta.yAxisID);
		element._datasetIndex = me.index;
		element._index = index;
		element._model = {
			datasetLabel: dataset.label || '',
			lineWidth: dataset.lineWidth,
			armLength: dataset.armLength,
			armLengthRatio: dataset.armLengthRatio,
			color: dataset.color,
		};
		me._updateElementGeometry(element, index, reset);
		element.pivot();
	},

});

}));


/***/ }),

/***/ "./dist/ng2-charts/fesm5/ng2-charts.js":
/*!*********************************************!*\
  !*** ./dist/ng2-charts/fesm5/ng2-charts.js ***!
  \*********************************************/
/*! exports provided: BaseChartDirective, ChartsModule, ThemeService, defaultColors, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseChartDirective", function() { return BaseChartDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartsModule", function() { return ChartsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeService", function() { return ThemeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultColors", function() { return defaultColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monkeyPatchChartJsLegend", function() { return monkeyPatchChartJsLegend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monkeyPatchChartJsTooltip", function() { return monkeyPatchChartJsTooltip; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);






/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var defaultColors = [
    [255, 99, 132],
    [54, 162, 235],
    [255, 206, 86],
    [231, 233, 237],
    [75, 192, 192],
    [151, 187, 205],
    [220, 220, 220],
    [247, 70, 74],
    [70, 191, 189],
    [253, 180, 92],
    [148, 159, 177],
    [77, 83, 96]
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Generate colors by chart type
 * @param {?} chartType
 * @param {?} index
 * @param {?} count
 * @return {?}
 */
function getColors(chartType, index, count) {
    if (chartType === 'pie' || chartType === 'doughnut') {
        return formatPieColors(generateColors(count));
    }
    if (chartType === 'polarArea') {
        return formatPolarAreaColors(generateColors(count));
    }
    if (chartType === 'line' || chartType === 'radar') {
        return formatLineColor(generateColor(index));
    }
    if (chartType === 'bar' || chartType === 'horizontalBar') {
        return formatBarColor(generateColor(index));
    }
    if (chartType === 'bubble') {
        return formatPieColors(generateColors(count));
    }
    if (chartType === 'scatter') {
        return formatPieColors(generateColors(count));
    }
    throw new Error("getColors - Unsupported chart type " + chartType);
}
/**
 * @param {?} colour
 * @param {?} alpha
 * @return {?}
 */
function rgba(colour, alpha) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
}
/**
 * @param {?} min
 * @param {?} max
 * @return {?}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatLineColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.4),
        borderColor: rgba(colors, 1),
        pointBackgroundColor: rgba(colors, 1),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: rgba(colors, 0.8)
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatBarColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.6),
        borderColor: rgba(colors, 1),
        hoverBackgroundColor: rgba(colors, 0.8),
        hoverBorderColor: rgba(colors, 1)
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatPieColors(colors) {
    return {
        backgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 0.6); })),
        borderColor: colors.map((/**
         * @return {?}
         */
        function () { return '#fff'; })),
        pointBackgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 1); })),
        pointBorderColor: colors.map((/**
         * @return {?}
         */
        function () { return '#fff'; })),
        pointHoverBackgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 1); })),
        pointHoverBorderColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 1); }))
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatPolarAreaColors(colors) {
    return {
        backgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 0.6); })),
        borderColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 1); })),
        hoverBackgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 0.8); })),
        hoverBorderColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 1); }))
    };
}
/**
 * @return {?}
 */
function getRandomColor() {
    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}
/**
 * Generate colors for line|bar charts
 * @param {?} index
 * @return {?}
 */
function generateColor(index) {
    return defaultColors[index] || getRandomColor();
}
/**
 * Generate colors for pie|doughnut charts
 * @param {?} count
 * @return {?}
 */
function generateColors(count) {
    /** @type {?} */
    var colorsArr = new Array(count);
    for (var i = 0; i < count; i++) {
        colorsArr[i] = defaultColors[i] || getRandomColor();
    }
    return colorsArr;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ThemeService = /** @class */ (function () {
    function ThemeService() {
        this.pColorschemesOptions = {};
        this.colorschemesOptions = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]({});
    }
    /**
     * @param {?} options
     * @return {?}
     */
    ThemeService.prototype.setColorschemesOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.pColorschemesOptions = options;
        this.colorschemesOptions.next(options);
    };
    /**
     * @return {?}
     */
    ThemeService.prototype.getColorschemesOptions = /**
     * @return {?}
     */
    function () {
        return this.pColorschemesOptions;
    };
    ThemeService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ThemeService.ctorParameters = function () { return []; };
    /** @nocollapse */ ThemeService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ factory: function ThemeService_Factory() { return new ThemeService(); }, token: ThemeService, providedIn: "root" });
    return ThemeService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var UpdateType = {
    Default: 0,
    Update: 1,
    Refresh: 2,
};
UpdateType[UpdateType.Default] = 'Default';
UpdateType[UpdateType.Update] = 'Update';
UpdateType[UpdateType.Refresh] = 'Refresh';
var BaseChartDirective = /** @class */ (function () {
    function BaseChartDirective(element, themeService) {
        this.element = element;
        this.themeService = themeService;
        this.options = {};
        this.chartClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chartHover = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.old = {
            dataExists: false,
            dataLength: 0,
            datasetsExists: false,
            datasetsLength: 0,
            datasetsDataObjects: [],
            datasetsDataLengths: [],
            colorsExists: false,
            colors: [],
            labelsExist: false,
            labels: [],
            legendExists: false,
            legend: {},
        };
        this.subs = [];
    }
    /**
     * Register a plugin.
     */
    /**
     * Register a plugin.
     * @param {?} plugin
     * @return {?}
     */
    BaseChartDirective.registerPlugin = /**
     * Register a plugin.
     * @param {?} plugin
     * @return {?}
     */
    function (plugin) {
        chart_js__WEBPACK_IMPORTED_MODULE_2__["Chart"].plugins.register(plugin);
    };
    /**
     * @param {?} plugin
     * @return {?}
     */
    BaseChartDirective.unregisterPlugin = /**
     * @param {?} plugin
     * @return {?}
     */
    function (plugin) {
        chart_js__WEBPACK_IMPORTED_MODULE_2__["Chart"].plugins.unregister(plugin);
    };
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ctx = this.element.nativeElement.getContext('2d');
        this.refresh();
        this.subs.push(this.themeService.colorschemesOptions.subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return _this.themeChanged(r); })));
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    BaseChartDirective.prototype.themeChanged = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.refresh();
    };
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.chart) {
            return;
        }
        /** @type {?} */
        var updateRequired = UpdateType.Default;
        /** @type {?} */
        var wantUpdate = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            updateRequired = x > updateRequired ? x : updateRequired;
        });
        if (!!this.data !== this.old.dataExists) {
            this.propagateDataToDatasets(this.data);
            this.old.dataExists = !!this.data;
            wantUpdate(UpdateType.Update);
        }
        if (this.data && this.data.length !== this.old.dataLength) {
            this.old.dataLength = this.data && this.data.length || 0;
            wantUpdate(UpdateType.Update);
        }
        if (!!this.datasets !== this.old.datasetsExists) {
            this.old.datasetsExists = !!this.datasets;
            wantUpdate(UpdateType.Update);
        }
        if (this.datasets && this.datasets.length !== this.old.datasetsLength) {
            this.old.datasetsLength = this.datasets && this.datasets.length || 0;
            wantUpdate(UpdateType.Update);
        }
        if (this.datasets && this.datasets.filter((/**
         * @param {?} x
         * @param {?} i
         * @return {?}
         */
        function (x, i) { return x.data !== _this.old.datasetsDataObjects[i]; })).length) {
            this.old.datasetsDataObjects = this.datasets.map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.data; }));
            wantUpdate(UpdateType.Update);
        }
        if (this.datasets && this.datasets.filter((/**
         * @param {?} x
         * @param {?} i
         * @return {?}
         */
        function (x, i) { return x.data.length !== _this.old.datasetsDataLengths[i]; })).length) {
            this.old.datasetsDataLengths = this.datasets.map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.data.length; }));
            wantUpdate(UpdateType.Update);
        }
        if (!!this.colors !== this.old.colorsExists) {
            this.old.colorsExists = !!this.colors;
            this.updateColors();
            wantUpdate(UpdateType.Update);
        }
        // This smells of inefficiency, might need to revisit this
        if (this.colors && this.colors.filter((/**
         * @param {?} x
         * @param {?} i
         * @return {?}
         */
        function (x, i) { return !_this.colorsEqual(x, _this.old.colors[i]); })).length) {
            this.old.colors = this.colors.map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return _this.copyColor(x); }));
            this.updateColors();
            wantUpdate(UpdateType.Update);
        }
        if (!!this.labels !== this.old.labelsExist) {
            this.old.labelsExist = !!this.labels;
            wantUpdate(UpdateType.Update);
        }
        if (this.labels && this.labels.filter((/**
         * @param {?} x
         * @param {?} i
         * @return {?}
         */
        function (x, i) { return !_this.labelsEqual(x, _this.old.labels[i]); })).length) {
            this.old.labels = this.labels.map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return _this.copyLabel(x); }));
            wantUpdate(UpdateType.Update);
        }
        if (!!this.options.legend !== this.old.legendExists) {
            this.old.legendExists = !!this.options.legend;
            wantUpdate(UpdateType.Refresh);
        }
        if (this.options.legend && this.options.legend.position !== this.old.legend.position) {
            this.old.legend.position = this.options.legend.position;
            wantUpdate(UpdateType.Refresh);
        }
        switch ((/** @type {?} */ (updateRequired))) {
            case UpdateType.Default:
                break;
            case UpdateType.Update:
                this.update();
                break;
            case UpdateType.Refresh:
                this.refresh();
                break;
        }
    };
    /**
     * @param {?} a
     * @return {?}
     */
    BaseChartDirective.prototype.copyLabel = /**
     * @param {?} a
     * @return {?}
     */
    function (a) {
        if (Array.isArray(a)) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__spread"])(a);
        }
        return a;
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    BaseChartDirective.prototype.labelsEqual = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        return Array.isArray(a) === Array.isArray(b)
            && (Array.isArray(a) || a === b)
            && (!Array.isArray(a) || a.length === b.length)
            && (!Array.isArray(a) || a.filter((/**
             * @param {?} x
             * @param {?} i
             * @return {?}
             */
            function (x, i) { return x !== b[i]; })).length === 0);
    };
    /**
     * @param {?} a
     * @return {?}
     */
    BaseChartDirective.prototype.copyColor = /**
     * @param {?} a
     * @return {?}
     */
    function (a) {
        /** @type {?} */
        var rc = {
            backgroundColor: a.backgroundColor,
            borderWidth: a.borderWidth,
            borderColor: a.borderColor,
            borderCapStyle: a.borderCapStyle,
            borderDash: a.borderDash,
            borderDashOffset: a.borderDashOffset,
            borderJoinStyle: a.borderJoinStyle,
            pointBorderColor: a.pointBorderColor,
            pointBackgroundColor: a.pointBackgroundColor,
            pointBorderWidth: a.pointBorderWidth,
            pointRadius: a.pointRadius,
            pointHoverRadius: a.pointHoverRadius,
            pointHitRadius: a.pointHitRadius,
            pointHoverBackgroundColor: a.pointHoverBackgroundColor,
            pointHoverBorderColor: a.pointHoverBorderColor,
            pointHoverBorderWidth: a.pointHoverBorderWidth,
            pointStyle: a.pointStyle,
            hoverBackgroundColor: a.hoverBackgroundColor,
            hoverBorderColor: a.hoverBorderColor,
            hoverBorderWidth: a.hoverBorderWidth,
        };
        return rc;
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    BaseChartDirective.prototype.colorsEqual = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (!a !== !b) {
            return false;
        }
        return !a || a.backgroundColor === b.backgroundColor
            && (a.borderWidth === b.borderWidth)
            && (a.borderColor === b.borderColor)
            && (a.borderCapStyle === b.borderCapStyle)
            && (a.borderDash === b.borderDash)
            && (a.borderDashOffset === b.borderDashOffset)
            && (a.borderJoinStyle === b.borderJoinStyle)
            && (a.pointBorderColor === b.pointBorderColor)
            && (a.pointBackgroundColor === b.pointBackgroundColor)
            && (a.pointBorderWidth === b.pointBorderWidth)
            && (a.pointRadius === b.pointRadius)
            && (a.pointHoverRadius === b.pointHoverRadius)
            && (a.pointHitRadius === b.pointHitRadius)
            && (a.pointHoverBackgroundColor === b.pointHoverBackgroundColor)
            && (a.pointHoverBorderColor === b.pointHoverBorderColor)
            && (a.pointHoverBorderWidth === b.pointHoverBorderWidth)
            && (a.pointStyle === b.pointStyle)
            && (a.hoverBackgroundColor === b.hoverBackgroundColor)
            && (a.hoverBorderColor === b.hoverBorderColor)
            && (a.hoverBorderWidth === b.hoverBorderWidth);
    };
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.updateColors = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.datasets.forEach((/**
         * @param {?} elm
         * @param {?} index
         * @return {?}
         */
        function (elm, index) {
            if (_this.colors && _this.colors[index]) {
                Object.assign(elm, _this.colors[index]);
            }
            else {
                Object.assign(elm, getColors(_this.chartType, index, elm.data.length), Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, elm));
            }
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    BaseChartDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var updateRequired = UpdateType.Default;
        /** @type {?} */
        var wantUpdate = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            updateRequired = x > updateRequired ? x : updateRequired;
        });
        // Check if the changes are in the data or datasets or labels or legend
        if (changes.hasOwnProperty('data') && changes.data.currentValue) {
            this.propagateDataToDatasets(changes.data.currentValue);
            wantUpdate(UpdateType.Update);
        }
        if (changes.hasOwnProperty('datasets') && changes.datasets.currentValue) {
            this.propagateDatasetsToData(changes.datasets.currentValue);
            wantUpdate(UpdateType.Update);
        }
        if (changes.hasOwnProperty('labels')) {
            if (this.chart) {
                this.chart.data.labels = changes.labels.currentValue;
            }
            wantUpdate(UpdateType.Update);
        }
        if (changes.hasOwnProperty('legend')) {
            if (this.chart) {
                this.chart.config.options.legend.display = changes.legend.currentValue;
                this.chart.generateLegend();
            }
            wantUpdate(UpdateType.Update);
        }
        if (changes.hasOwnProperty('options')) {
            wantUpdate(UpdateType.Refresh);
        }
        switch ((/** @type {?} */ (updateRequired))) {
            case UpdateType.Update:
                this.update();
                break;
            case UpdateType.Refresh:
            case UpdateType.Default:
                this.refresh();
                break;
        }
    };
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
        this.subs.forEach((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.unsubscribe(); }));
    };
    /**
     * @param {?=} duration
     * @param {?=} lazy
     * @return {?}
     */
    BaseChartDirective.prototype.update = /**
     * @param {?=} duration
     * @param {?=} lazy
     * @return {?}
     */
    function (duration, lazy) {
        if (this.chart) {
            return this.chart.update(duration, lazy);
        }
    };
    /**
     * @param {?} index
     * @param {?} hidden
     * @return {?}
     */
    BaseChartDirective.prototype.hideDataset = /**
     * @param {?} index
     * @param {?} hidden
     * @return {?}
     */
    function (index, hidden) {
        this.chart.getDatasetMeta(index).hidden = hidden;
        this.chart.update();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    BaseChartDirective.prototype.isDatasetHidden = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.chart.getDatasetMeta(index).hidden;
    };
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.toBase64Image = /**
     * @return {?}
     */
    function () {
        return this.chart.toBase64Image();
    };
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.getChartConfiguration = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var datasets = this.getDatasets();
        /** @type {?} */
        var options = Object.assign({}, this.options);
        if (this.legend === false) {
            options.legend = { display: false };
        }
        // hook for onHover and onClick events
        options.hover = options.hover || {};
        if (!options.hover.onHover) {
            options.hover.onHover = (/**
             * @param {?} event
             * @param {?} active
             * @return {?}
             */
            function (event, active) {
                if (active && !active.length) {
                    return;
                }
                _this.chartHover.emit({ event: event, active: active });
            });
        }
        if (!options.onClick) {
            options.onClick = (/**
             * @param {?=} event
             * @param {?=} active
             * @return {?}
             */
            function (event, active) {
                _this.chartClick.emit({ event: event, active: active });
            });
        }
        /** @type {?} */
        var mergedOptions = this.smartMerge(options, this.themeService.getColorschemesOptions());
        /** @type {?} */
        var chartConfig = {
            type: this.chartType,
            data: {
                labels: this.labels || [],
                datasets: datasets
            },
            plugins: this.plugins,
            options: mergedOptions,
        };
        return chartConfig;
    };
    /**
     * @param {?} ctx
     * @return {?}
     */
    BaseChartDirective.prototype.getChartBuilder = /**
     * @param {?} ctx
     * @return {?}
     */
    function (ctx /*, data:any[], options:any*/) {
        /** @type {?} */
        var chartConfig = this.getChartConfiguration();
        return new chart_js__WEBPACK_IMPORTED_MODULE_2__["Chart"](ctx, chartConfig);
    };
    /**
     * @param {?} options
     * @param {?} overrides
     * @param {?=} level
     * @return {?}
     */
    BaseChartDirective.prototype.smartMerge = /**
     * @param {?} options
     * @param {?} overrides
     * @param {?=} level
     * @return {?}
     */
    function (options, overrides, level) {
        var _this = this;
        if (level === void 0) { level = 0; }
        if (level === 0) {
            options = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"])(options);
        }
        /** @type {?} */
        var keysToUpdate = Object.keys(overrides);
        keysToUpdate.forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (Array.isArray(overrides[key])) {
                /** @type {?} */
                var arrayElements = options[key];
                if (arrayElements) {
                    arrayElements.forEach((/**
                     * @param {?} r
                     * @return {?}
                     */
                    function (r) {
                        _this.smartMerge(r, overrides[key][0], level + 1);
                    }));
                }
            }
            else if (typeof (overrides[key]) === 'object') {
                if (!(key in options)) {
                    options[key] = {};
                }
                _this.smartMerge(options[key], overrides[key], level + 1);
            }
            else {
                options[key] = overrides[key];
            }
        }));
        if (level === 0) {
            return options;
        }
    };
    /**
     * @private
     * @param {?} label
     * @return {?}
     */
    BaseChartDirective.prototype.isMultiLineLabel = /**
     * @private
     * @param {?} label
     * @return {?}
     */
    function (label) {
        return Array.isArray(label);
    };
    /**
     * @private
     * @param {?} label
     * @return {?}
     */
    BaseChartDirective.prototype.joinLabel = /**
     * @private
     * @param {?} label
     * @return {?}
     */
    function (label) {
        if (!label) {
            return null;
        }
        if (this.isMultiLineLabel(label)) {
            return label.join(' ');
        }
        else {
            return label;
        }
    };
    /**
     * @private
     * @param {?} datasets
     * @return {?}
     */
    BaseChartDirective.prototype.propagateDatasetsToData = /**
     * @private
     * @param {?} datasets
     * @return {?}
     */
    function (datasets) {
        this.data = this.datasets.map((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return r.data; }));
        if (this.chart) {
            this.chart.data.datasets = datasets;
        }
        this.updateColors();
    };
    /**
     * @private
     * @param {?} newDataValues
     * @return {?}
     */
    BaseChartDirective.prototype.propagateDataToDatasets = /**
     * @private
     * @param {?} newDataValues
     * @return {?}
     */
    function (newDataValues) {
        var _this = this;
        if (this.isMultiDataSet(newDataValues)) {
            if (this.datasets && newDataValues.length === this.datasets.length) {
                this.datasets.forEach((/**
                 * @param {?} dataset
                 * @param {?} i
                 * @return {?}
                 */
                function (dataset, i) {
                    dataset.data = newDataValues[i];
                }));
            }
            else {
                this.datasets = newDataValues.map((/**
                 * @param {?} data
                 * @param {?} index
                 * @return {?}
                 */
                function (data, index) {
                    return { data: data, label: _this.joinLabel(_this.labels[index]) || "Label " + index };
                }));
                if (this.chart) {
                    this.chart.data.datasets = this.datasets;
                }
            }
        }
        else {
            if (!this.datasets) {
                this.datasets = [{ data: newDataValues }];
                if (this.chart) {
                    this.chart.data.datasets = this.datasets;
                }
            }
            else {
                this.datasets[0].data = newDataValues;
                this.datasets.splice(1); // Remove all elements but the first
            }
        }
        this.updateColors();
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    BaseChartDirective.prototype.isMultiDataSet = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return Array.isArray(data[0]);
    };
    /**
     * @private
     * @return {?}
     */
    BaseChartDirective.prototype.getDatasets = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.datasets && !this.data) {
            throw new Error("ng-charts configuration error, data or datasets field are required to render chart " + this.chartType);
        }
        // If `datasets` is defined, use it over the `data` property.
        if (this.datasets) {
            this.propagateDatasetsToData(this.datasets);
            return this.datasets;
        }
        if (this.data) {
            this.propagateDataToDatasets(this.data);
            return this.datasets;
        }
    };
    /**
     * @private
     * @return {?}
     */
    BaseChartDirective.prototype.refresh = /**
     * @private
     * @return {?}
     */
    function () {
        // if (this.options && this.options.responsive) {
        //   setTimeout(() => this.refresh(), 50);
        // }
        // todo: remove this line, it is producing flickering
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
        if (this.ctx) {
            this.chart = this.getChartBuilder(this.ctx /*, data, this.options*/);
        }
    };
    BaseChartDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'canvas[baseChart]',
                    exportAs: 'base-chart'
                },] }
    ];
    /** @nocollapse */
    BaseChartDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: ThemeService }
    ]; };
    BaseChartDirective.propDecorators = {
        data: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        datasets: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        labels: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        options: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        chartType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        colors: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        legend: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        plugins: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        chartClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        chartHover: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
    };
    return BaseChartDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ChartsModule = /** @class */ (function () {
    function ChartsModule() {
    }
    ChartsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [
                        BaseChartDirective
                    ],
                    imports: [],
                    exports: [
                        BaseChartDirective
                    ]
                },] }
    ];
    return ChartsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:variable-name
// tslint:disable:no-var-keyword
// tslint:disable:prefer-const
// tslint:disable:only-arrow-functions
// tslint:disable:one-variable-per-declaration
// tslint:disable:object-literal-shorthand
// tslint:disable:space-before-function-paren
/**
 * @return {?}
 */
function monkeyPatchChartJsLegend() {
    if (typeof Chart === 'undefined') {
        console.log('Chart not defined (guessing this is a universal build, and I don\'t know why this happens -- Aviad)');
        return;
    }
    /** @type {?} */
    var plugins = Chart.plugins.getAll();
    /** @type {?} */
    var legend = plugins.filter((/**
     * @param {?} p
     * @return {?}
     */
    function (p) { return p.id === 'legend'; }))[0];
    legend._element.prototype.fit = fit;
    legend._element.prototype.draw = draw;
    /** @type {?} */
    var helpers = Chart.helpers;
    /** @type {?} */
    var defaults = Chart.defaults;
    /** @type {?} */
    var valueOrDefault = helpers.valueOrDefault;
    /**
     * @param {?} labelOpts
     * @param {?} fontSize
     * @return {?}
     */
    function getBoxWidth(labelOpts, fontSize) {
        return labelOpts.usePointStyle && labelOpts.boxWidth > fontSize ?
            fontSize :
            labelOpts.boxWidth;
    }
    /**
     * @return {?}
     */
    function fit() {
        /** @type {?} */
        var me = this;
        /** @type {?} */
        var opts = me.options;
        /** @type {?} */
        var labelOpts = opts.labels;
        /** @type {?} */
        var display = opts.display;
        /** @type {?} */
        var ctx = me.ctx;
        /** @type {?} */
        var labelFont = helpers.options._parseFont(labelOpts);
        /** @type {?} */
        var fontSize = labelFont.size;
        // Reset hit boxes
        /** @type {?} */
        var hitboxes = me.legendHitBoxes = [];
        /** @type {?} */
        var minSize = me.minSize;
        /** @type {?} */
        var isHorizontal = me.isHorizontal();
        if (isHorizontal) {
            minSize.width = me.maxWidth; // fill all the width
            minSize.height = display ? 10 : 0;
        }
        else {
            minSize.width = display ? 10 : 0;
            minSize.height = me.maxHeight; // fill all the height
        }
        /** @type {?} */
        var getMaxLineWidth = (/**
         * @param {?} textLines
         * @return {?}
         */
        function (textLines) {
            return textLines.map((/**
             * @param {?} textLine
             * @return {?}
             */
            function (textLine) {
                return ctx.measureText(textLine).width;
            })).reduce((/**
             * @param {?} acc
             * @param {?} v
             * @return {?}
             */
            function (acc, v) {
                return v > acc ? v : acc;
            }), 0);
        });
        // Increase sizes here
        if (display) {
            ctx.font = labelFont.string;
            if (isHorizontal) {
                // Labels
                // Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
                /** @type {?} */
                var lineWidths = me.lineWidths = [0];
                /** @type {?} */
                var lineHeights = me.lineHeights = [];
                /** @type {?} */
                var currentLineHeight = 0;
                /** @type {?} */
                var lineIndex = 0;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                helpers.each(me.legendItems, (/**
                 * @param {?} legendItem
                 * @param {?} i
                 * @return {?}
                 */
                function (legendItem, i) {
                    /** @type {?} */
                    var width;
                    /** @type {?} */
                    var height;
                    if (helpers.isArray(legendItem.text)) {
                        width = getMaxLineWidth(legendItem.text);
                        height = fontSize * legendItem.text.length + labelOpts.padding;
                    }
                    else {
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
                }));
                lineHeights.push(currentLineHeight);
                minSize.height += lineHeights.reduce((/**
                 * @param {?} acc
                 * @param {?} v
                 * @return {?}
                 */
                function (acc, v) {
                    return acc + v;
                }), 0);
            }
            else {
                /** @type {?} */
                var vPadding = labelOpts.padding;
                /** @type {?} */
                var columnWidths = me.columnWidths = [];
                /** @type {?} */
                var columnHeights = me.columnHeights = [];
                /** @type {?} */
                var totalWidth = labelOpts.padding;
                /** @type {?} */
                var currentColWidth = 0;
                /** @type {?} */
                var currentColHeight = 0;
                /** @type {?} */
                var columnIndex = 0;
                helpers.each(me.legendItems, (/**
                 * @param {?} legendItem
                 * @param {?} i
                 * @return {?}
                 */
                function (legendItem, i) {
                    /** @type {?} */
                    var itemWidth;
                    /** @type {?} */
                    var height;
                    if (helpers.isArray(legendItem.text)) {
                        itemWidth = getMaxLineWidth(legendItem.text);
                        height = fontSize * legendItem.text.length;
                    }
                    else {
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
                }));
                totalWidth += currentColWidth;
                columnWidths.push(currentColWidth);
                columnHeights.push(currentColHeight);
                minSize.width += totalWidth;
            }
        }
        me.width = minSize.width;
        me.height = minSize.height;
    }
    /**
     * @return {?}
     */
    function draw() {
        /** @type {?} */
        var me = this;
        /** @type {?} */
        var opts = me.options;
        /** @type {?} */
        var labelOpts = opts.labels;
        /** @type {?} */
        var globalDefaults = defaults.global;
        /** @type {?} */
        var defaultColor = globalDefaults.defaultColor;
        /** @type {?} */
        var lineDefault = globalDefaults.elements.line;
        /** @type {?} */
        var legendHeight = me.height;
        /** @type {?} */
        var columnHeights = me.columnHeights;
        /** @type {?} */
        var columnWidths = me.columnWidths;
        /** @type {?} */
        var legendWidth = me.width;
        /** @type {?} */
        var lineWidths = me.lineWidths;
        /** @type {?} */
        var lineHeights = me.lineHeights;
        if (opts.display) {
            /** @type {?} */
            var ctx = me.ctx;
            /** @type {?} */
            var fontColor = valueOrDefault(labelOpts.fontColor, globalDefaults.defaultFontColor);
            /** @type {?} */
            var labelFont = helpers.options._parseFont(labelOpts);
            /** @type {?} */
            var fontSize = labelFont.size;
            /** @type {?} */
            var cursor;
            // Canvas setup
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = fontColor; // for strikethrough effect
            ctx.fillStyle = fontColor; // render in correct colour
            ctx.font = labelFont.string;
            /** @type {?} */
            var boxWidth = getBoxWidth(labelOpts, fontSize);
            /** @type {?} */
            var hitboxes = me.legendHitBoxes;
            // current position
            /** @type {?} */
            var drawLegendBox = (/**
             * @param {?} x
             * @param {?} y
             * @param {?} legendItem
             * @return {?}
             */
            function (x, y, legendItem) {
                if (isNaN(boxWidth) || boxWidth <= 0) {
                    return;
                }
                // Set the ctx for the box
                ctx.save();
                /** @type {?} */
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
                    /** @type {?} */
                    var radius = boxWidth * Math.SQRT2 / 2;
                    /** @type {?} */
                    var centerX = x + boxWidth / 2;
                    /** @type {?} */
                    var centerY = y + fontSize / 2;
                    // Draw pointStyle as legend symbol
                    helpers.canvas.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY);
                }
                else {
                    // Draw box as legend symbol
                    if (lineWidth !== 0) {
                        ctx.strokeRect(x, y, boxWidth, fontSize);
                    }
                    ctx.fillRect(x, y, boxWidth, fontSize);
                }
                ctx.restore();
            });
            /** @type {?} */
            var drawStrikeThrough = (/**
             * @param {?} x
             * @param {?} y
             * @param {?} w
             * @return {?}
             */
            function (x, y, w) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(x, y);
                ctx.lineTo(x + w, y);
                ctx.stroke();
            });
            /** @type {?} */
            var drawCrossOver = (/**
             * @param {?} x
             * @param {?} y
             * @param {?} w
             * @param {?} h
             * @return {?}
             */
            function (x, y, w, h) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(x, y);
                ctx.lineTo(x + w, y + h);
                ctx.moveTo(x, y + h);
                ctx.lineTo(x + w, y);
                ctx.stroke();
            });
            /** @type {?} */
            var fillText = (/**
             * @param {?} x
             * @param {?} y
             * @param {?} legendItem
             * @param {?} textWidth
             * @return {?}
             */
            function (x, y, legendItem, textWidth) {
                /** @type {?} */
                var halfFontSize = fontSize / 2;
                /** @type {?} */
                var xLeft = boxWidth + halfFontSize + x;
                /** @type {?} */
                var yMiddle = y + halfFontSize;
                if (helpers.isArray(legendItem.text)) {
                    helpers.each(legendItem.text, (/**
                     * @param {?} textLine
                     * @param {?} index
                     * @return {?}
                     */
                    function (textLine, index) {
                        /** @type {?} */
                        var lineOffset = index * fontSize;
                        ctx.fillText(textLine, xLeft, yMiddle + lineOffset);
                    }));
                }
                else {
                    ctx.fillText(legendItem.text, xLeft, yMiddle);
                }
                if (legendItem.hidden) {
                    if (helpers.isArray(legendItem.text)) {
                        drawCrossOver(xLeft, yMiddle, textWidth, (legendItem.text.length - 1) * (fontSize - 1));
                    }
                    else {
                        drawStrikeThrough(xLeft, yMiddle, textWidth);
                    }
                }
            });
            /** @type {?} */
            var alignmentOffset = (/**
             * @param {?} dimension
             * @param {?} blockSize
             * @return {?}
             */
            function (dimension, blockSize) {
                switch (opts.align) {
                    case 'start':
                        return labelOpts.padding;
                    case 'end':
                        return dimension - blockSize;
                    default: // center
                        return (dimension - blockSize + labelOpts.padding) / 2;
                }
            });
            // Horizontal
            /** @type {?} */
            var isHorizontal = me.isHorizontal();
            if (isHorizontal) {
                cursor = {
                    x: me.left + alignmentOffset(legendWidth, lineWidths[0]),
                    y: me.top + labelOpts.padding,
                    line: 0
                };
            }
            else {
                cursor = {
                    x: me.left + labelOpts.padding,
                    y: me.top + alignmentOffset(legendHeight, columnHeights[0]),
                    line: 0
                };
            }
            helpers.each(me.legendItems, (/**
             * @param {?} legendItem
             * @param {?} i
             * @return {?}
             */
            function (legendItem, i) {
                /** @type {?} */
                var textWidth;
                /** @type {?} */
                var height;
                /** @type {?} */
                var boxTopOffset;
                if (legendItem.lineOrColumnIndex > cursor.line) {
                    if (isHorizontal) {
                        cursor.y += lineHeights[cursor.line];
                        cursor.line = legendItem.lineOrColumnIndex;
                        cursor.x = me.left + alignmentOffset(legendWidth, lineWidths[cursor.line]);
                    }
                    else {
                        cursor.x += columnWidths[cursor.line] + labelOpts.padding;
                        cursor.line = legendItem.lineOrColumnIndex;
                        cursor.y = me.top + alignmentOffset(legendHeight, columnHeights[cursor.line]);
                    }
                }
                if (helpers.isArray(legendItem.text)) {
                    textWidth = legendItem.text.map((/**
                     * @param {?} textLine
                     * @return {?}
                     */
                    function (textLine) {
                        return ctx.measureText(textLine).width;
                    })).reduce((/**
                     * @param {?} acc
                     * @param {?} v
                     * @return {?}
                     */
                    function (acc, v) {
                        return v > acc ? v : acc;
                    }), 0);
                    boxTopOffset = fontSize / 2 * (legendItem.text.length - 1);
                    height = fontSize * legendItem.text.length;
                }
                else {
                    textWidth = ctx.measureText(legendItem.text).width;
                    boxTopOffset = 0;
                    height = fontSize;
                }
                /** @type {?} */
                var width = boxWidth + (fontSize / 2) + textWidth;
                /** @type {?} */
                var x = cursor.x;
                /** @type {?} */
                var y = cursor.y;
                /** @type {?} */
                var topOffset = isHorizontal ? Math.trunc((lineHeights[cursor.line] - hitboxes[i].height) / 2) : 0;
                drawLegendBox(x, y + boxTopOffset + topOffset, legendItem);
                hitboxes[i].left = x;
                hitboxes[i].top = y;
                // Fill the actual label
                fillText(x, y + topOffset, legendItem, textWidth);
                if (isHorizontal) {
                    cursor.x += width + labelOpts.padding;
                }
                else {
                    cursor.y += height + labelOpts.padding;
                }
            }));
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:variable-name
// tslint:disable:no-var-keyword
// tslint:disable:prefer-const
// tslint:disable:only-arrow-functions
// tslint:disable:one-variable-per-declaration
// tslint:disable:object-literal-shorthand
// tslint:disable:space-before-function-paren
/**
 * @return {?}
 */
function monkeyPatchChartJsTooltip() {
    if (typeof Chart === 'undefined') {
        console.log('Chart not defined (guessing this is a universal build, and I don\'t know why this happens -- Aviad)');
        return;
    }
    Chart.Tooltip.prototype.drawBody = drawBody;
    /** @type {?} */
    var helpers = Chart.helpers;
    /**
     * @param {?} vm
     * @param {?} align
     * @return {?}
     */
    function getAlignedX(vm, align) {
        return align === 'center'
            ? vm.x + vm.width / 2
            : align === 'right'
                ? vm.x + vm.width - vm.xPadding
                : vm.x + vm.xPadding;
    }
    /**
     * @param {?} pt
     * @param {?} vm
     * @param {?} ctx
     * @return {?}
     */
    function drawBody(pt, vm, ctx) {
        /** @type {?} */
        var bodyFontSize = vm.bodyFontSize;
        /** @type {?} */
        var bodySpacing = vm.bodySpacing;
        /** @type {?} */
        var bodyAlign = vm._bodyAlign;
        /** @type {?} */
        var body = vm.body;
        /** @type {?} */
        var drawColorBoxes = vm.displayColors;
        /** @type {?} */
        var labelColors = vm.labelColors;
        /** @type {?} */
        var xLinePadding = 0;
        /** @type {?} */
        var colorX = drawColorBoxes ? getAlignedX(vm, 'left') : 0;
        /** @type {?} */
        var textColor;
        ctx.textAlign = bodyAlign;
        ctx.textBaseline = 'top';
        ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
        pt.x = getAlignedX(vm, bodyAlign);
        // Before Body
        /** @type {?} */
        var fillLineOfText = (/**
         * @param {?} line
         * @return {?}
         */
        function (line) {
            ctx.fillText(line, pt.x + xLinePadding, pt.y);
            pt.y += bodyFontSize + bodySpacing;
        });
        // Before body lines
        ctx.fillStyle = vm.bodyFontColor;
        helpers.each(vm.beforeBody, fillLineOfText);
        xLinePadding = drawColorBoxes && bodyAlign !== 'right'
            ? bodyAlign === 'center' ? (bodyFontSize / 2 + 1) : (bodyFontSize + 2)
            : 0;
        // Draw body lines now
        helpers.each(body, (/**
         * @param {?} bodyItem
         * @param {?} i
         * @return {?}
         */
        function (bodyItem, i) {
            textColor = vm.labelTextColors[i];
            ctx.fillStyle = textColor;
            helpers.each(bodyItem.before, fillLineOfText);
            // Draw Legend-like boxes if needed
            if (drawColorBoxes) {
                // Fill a white rect so that colours merge nicely if the opacity is < 1
                ctx.fillStyle = vm.legendColorBackground;
                ctx.fillRect(colorX, pt.y, bodyFontSize, bodyFontSize);
                // Border
                ctx.lineWidth = 1;
                ctx.strokeStyle = labelColors[i].borderColor;
                ctx.strokeRect(colorX, pt.y, bodyFontSize, bodyFontSize);
                // Inner square
                ctx.fillStyle = labelColors[i].backgroundColor;
                ctx.fillRect(colorX + 1, pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);
                ctx.fillStyle = textColor;
            }
            helpers.each(bodyItem.lines, fillLineOfText);
            helpers.each(bodyItem.after, fillLineOfText);
        }));
        // Reset back to 0 for after body
        xLinePadding = 0;
        // After body lines
        helpers.each(vm.afterBody, fillLineOfText);
        pt.y -= bodySpacing; // Remove last body spacing
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ng2-charts.js.map


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [ngClass]=\"selectedTheme\">\n  <mat-toolbar color=\"primary\">\n    <div class=\"toolbar\">\n      ng2-charts\n      <button mat-button (click)=\"selectedTheme='ng2-charts-demo-dark-theme'\">Dark Theme</button>\n      <button mat-button (click)=\"selectedTheme='ng2-charts-demo-light-theme'\">Light Theme</button>\n    </div>\n  </mat-toolbar>\n  <main class=\"bd-pageheader\">\n    <div class=\"container\">\n      <img alt=\"\" src=\"http://www.chartjs.org/img/chartjs-logo.svg\"\n           style=\"background: top center no-repeat;background-size: contain;\">\n      <h1>ng2-charts</h1>\n      <p>Angular2 directives for <a href=\"http://www.chartjs.org/\" style=\"color:white\">Chart.js</a></p>\n      <a mat-button mat-raised-button color=\"primary\" href=\"https://github.com/valor-software/ng2-charts\">View on GitHub</a>\n      <div class=\"badges\">\n        <div class=\"badge\"><iframe frameborder=\"0\" height=\"20px\" scrolling=\"0\"\n            src=\"https://ghbtns.com/github-btn.html?user=valor-software&amp;repo=ng2-charts&amp;type=star&amp;count=true\"\n            width=\"170px\"></iframe></div>\n        <div class=\"badge\"><iframe frameborder=\"0\" height=\"20px\" scrolling=\"0\"\n            src=\"https://ghbtns.com/github-btn.html?user=valor-software&amp;repo=ng2-charts&amp;type=fork&amp;count=true\"\n            width=\"170px\"></iframe></div>\n      </div>\n      <a target=\"_blank\" href=\"https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWQ5M2Y4OWM0OGJjNmZiOGYyNjFlZTdlOGI1YjcxYWQ2ODhiOTY4NzhiODgwMTIzNDczODIyNWNmM2RlYWRhNTg\">\n        <img src=\"https://a.slack-edge.com/66f9/img/icons/ios-256.png\" width=\"25\" height=\"25\" alt=\"slack of ng2-charts\">\n      </a>\n      <a target=\"_blank\" href=\"https://stackoverflow.com/questions/tagged/ng2-charts\">\n        <img src=\"https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.svg\" width=\"25\" height=\"25\" alt=\"ng2-charts on stackoverflow\">\n      </a>\n      <a target=\"_blank\" href=\"https://github.com/valor-software/ng2-charts\">\n        <img src=\"https://github.githubassets.com/favicon.ico\" width=\"25\" height=\"25\" alt=\"ng2-charts on github\">\n      </a>\n    </div>\n  </main>\n  <div class=\"section\">\n    <mat-tab-group #tabGroup (selectedIndexChange)=\"updateRoute($event)\">\n      <mat-tab #tab label=\"General Info\">\n        <div class=\"section\">\n          <h2>Installation</h2>\n          <markdown ngPreserveWhitespaces>\n            ### Installation\n\n            1. Install ***ng2-charts*** using npm\n\n            ```bash\n            npm install --save ng2-charts\n            ```\n            2. Install ***Chart.js*** library\n\n            ```bash\n            npm install --save chart.js\n            ```\n\n          </markdown>\n\n          <h2>API</h2>\n          <markdown ngPreserveWhitespaces>\n            ### Usage\n\n            ```typescript\n                import {{ '{' }} ChartsModule } from 'ng2-charts';\n\n                // In your App's module:\n                imports: [\n                  ChartsModule\n                ]\n            ```\nё\n            ### Chart types\n            There are one directive for all chart types: `baseChart`, and there are 8 types of charts: [`line`](/ng2-charts/#/LineChart), [`bar`](/ng2-charts/#/BarChart), [`radar`](/ng2-charts/#/RadarChart), [`pie`](/ng2-charts/#/PieChart), [`polarArea`](/ng2-charts/#/PolarAreaChart), [`doughnut`](/ng2-charts/#/DoughnutChart), [`bubble`](/ng2-charts/#/BubbleChart) and [`scatter`](/ng2-charts/#/ScatterChart).\n\n            ### Properties\n\n            **Note**: For more information about possible options please refer to original [chart.js](http://www.chartjs.org/docs) documentation\n\n            - `data` (`SingleOrMultiDataSet`) -  set of points of the chart, it should be `MultiDataSet` only for `line`, `bar`, `radar` and `doughnut`, otherwise `SingleDataSet`\n            - `datasets` (`{{ '{' }}data: SingleDataSet, label: string}[]`) - `data` see about, the `label` for the dataset which appears in the legend and tooltips\n            - `labels` (`Label[]`) - x axis labels. It's necessary for charts: `line`, `bar` and `radar`. And just labels (on hover) for charts: `polarArea`, `pie` and `doughnut`. `Label` is either a single `string`, or it may be a `string[]` representing a multi-line label where each array element is on a new line.\n            - `chartType` (`ChartType`) - indicates the type of charts, it can be: `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`\n            - `options` (`ChartOptions`) - chart options (as from [Chart.js documentation](http://www.chartjs.org/docs/))\n            - `colors` (`Color[]`) - data colors, will use default and|or random colors if not specified (see below)\n            - `legend`: (`boolean = false`) - if true show legend below the chart, otherwise not be shown\n\n            ### Events\n\n            - `chartClick`: fires when click on a chart has occurred, returns information regarding active points and labels\n            - `chartHover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels\n\n\n            ### Colors\n\n            There are a set several default colors. Colors can be replaced using the `colors` attribute. If there is more data than colors, colors are generated randomly.\n\n            ### Dynamic Theming\n\n              The `ChartsModule` provides a service called `ThemeService` which allows clients to set a structure specifying colors override settings. This service may be called when the dynamic theme changes, with colors which fit the theme. The structure is interpreted as an override, with special functionality when dealing with arrays. Example:\n\n              ```typescript\n              type Theme = 'light-theme' | 'dark-theme';\n\n              private _selectedTheme: Theme = 'light-theme';\n              public get selectedTheme() {{ '{' }}\n                return this._selectedTheme;\n              }\n              public set selectedTheme(value) {{ '{' }}\n                this._selectedTheme = value;\n                let overrides: ChartOptions;\n                if (this.selectedTheme === 'dark-theme') {{ '{' }}\n                  overrides = {{ '{' }}\n                    legend: {{ '{' }}\n                      labels: {{ '{' }} fontColor: 'white' }\n                    },\n                    scales: {{ '{' }}\n                      xAxes: [{{ '{' }}\n                        ticks: {{ '{' }} fontColor: 'white' },\n                        gridLines: {{ '{' }} color: 'rgba(255,255,255,0.1)' }\n                      }],\n                      yAxes: [{{ '{' }}\n                        ticks: {{ '{' }} fontColor: 'white' },\n                        gridLines: {{ '{' }} color: 'rgba(255,255,255,0.1)' }\n                      }]\n                    }\n                  };\n                } else {{ '{' }}\n                  overrides = {{ '{' }}};\n                }\n                this.themeService.setColorschemesOptions(overrides);\n              }\n\n              constructor(private themeService: ThemeService) {{ '{' }} }\n\n              setCurrentTheme(theme: Theme) {{ '{' }}\n                this.selectedTheme = theme;\n              }\n              ```\n\n              The `overrides` object has the same type as the chart options object `ChartOptions`, and wherever a simple field is encountered it replaces the matching field in the `options` object. When an array is encountered (as in the `xAxes` and `yAxes` fields above), the single object inside the array is used as a template to override all array elements in the matching field in the `options` object. So in the case above, every axis will have its ticks and gridline colors changed.\n\n              ## Schematics\n\n              There are schematics that may be used to generate chart components using Angular CLI. The components are defined in package `ng2-charts-schematics`.\n\n              ### Installation of Schematics Package\n\n              ```bash\n              npm install --save-dev ng2-charts-schematics\n              ```\n\n              ### Example of Generating a Line Chart using Angular CLI\n\n              ```bash\n              ng generate ng2-charts-schematics:line my-line-chart\n              ```\n\n              This calls angular's component schematics and then modifies the result, so all the options for the component schematic are also usable here. This schematics will also add the `ChartsModule` as an imported module in the main app module (or another module as specified in the `--module` command switch).\n              </markdown>\n            </div>\n\n      </mat-tab>\n      <mat-tab #tab label=\"Line Chart\"><app-chart-host chartType=\"line\"><app-line-chart #main></app-line-chart></app-chart-host></mat-tab>\n      <mat-tab #tab label=\"Bar Chart\"><app-chart-host chartType=\"bar\"><app-bar-chart #main></app-bar-chart></app-chart-host></mat-tab>\n      <mat-tab #tab label=\"Doughnut Chart\"><app-chart-host chartType=\"doughnut\"><app-doughnut-chart #main></app-doughnut-chart></app-chart-host></mat-tab>\n      <mat-tab #tab label=\"Radar Chart\"><app-chart-host chartType=\"radar\"><app-radar-chart #main></app-radar-chart></app-chart-host></mat-tab>\n      <mat-tab #tab label=\"Pie Chart\"><app-chart-host chartType=\"pie\"><app-pie-chart #main></app-pie-chart></app-chart-host></mat-tab>\n      <mat-tab #tab label=\"Polar Area Chart\"><app-chart-host chartType=\"polar-area\"><app-polar-area-chart #main></app-polar-area-chart></app-chart-host></mat-tab>\n      <mat-tab #tab label=\"Bubble Chart\"><app-chart-host chartType=\"bubble\"><app-bubble-chart #main></app-bubble-chart></app-chart-host></mat-tab>\n      <mat-tab #tab label=\"Scatter Chart\"><app-chart-host chartType=\"scatter\"><app-scatter-chart #main></app-scatter-chart></app-chart-host></mat-tab>\n      <mat-tab #tab label=\"Dynamic Chart\"><app-chart-host chartType=\"dynamic\"><app-dynamic-chart #main></app-dynamic-chart></app-chart-host></mat-tab>\n      <mat-tab #tab label=\"Financial Chart\"><app-chart-host chartType=\"financial\"><app-financial-chart #main></app-financial-chart></app-chart-host></mat-tab>    </mat-tab-group>\n  </div>\n  <footer class=\"footer\">\n    <div class=\"container\">\n      <p class=\"text-muted text-center\"><a href=\"https://github.com/valor-software/ng2-charts/graphs/contributors\">Contributors to ng2-charts</a></p>\n    </div>\n  </footer>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/bar-chart/bar-chart.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/bar-chart/bar-chart.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div>\n    <div style=\"display: block\">\n      <canvas baseChart\n        [datasets]=\"barChartData\"\n        [labels]=\"barChartLabels\"\n        [options]=\"barChartOptions\"\n        [plugins]=\"barChartPlugins\"\n        [legend]=\"barChartLegend\"\n        [chartType]=\"barChartType\">\n      </canvas>\n    </div>\n    <button mat-button mat-raised-button color=\"primary\" (click)=\"randomize()\">Update</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/bar-chart/bar-chart.component.ts":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/bar-chart/bar-chart.component.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "import { Component, OnInit } from '@angular/core';\nimport { ChartOptions, ChartType, ChartDataSets } from 'chart.js';\nimport * as pluginDataLabels from 'chartjs-plugin-datalabels';\nimport { Label } from 'ng2-charts';\n\n@Component({\n  selector: 'app-bar-chart',\n  templateUrl: './bar-chart.component.html',\n  styleUrls: ['./bar-chart.component.scss'],\n})\nexport class BarChartComponent implements OnInit {\n  public barChartOptions: ChartOptions = {\n    responsive: true,\n    // We use these empty structures as placeholders for dynamic theming.\n    scales: { xAxes: [{}], yAxes: [{}] },\n    plugins: {\n      datalabels: {\n        anchor: 'end',\n        align: 'end',\n      }\n    }\n  };\n  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];\n  public barChartType: ChartType = 'bar';\n  public barChartLegend = true;\n  public barChartPlugins = [pluginDataLabels];\n\n  public barChartData: ChartDataSets[] = [\n    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },\n    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }\n  ];\n\n  constructor() { }\n\n  ngOnInit() {\n  }\n\n  // events\n  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public randomize(): void {\n    // Only Change 3 values\n    const data = [\n      Math.round(Math.random() * 100),\n      59,\n      80,\n      (Math.random() * 100),\n      56,\n      (Math.random() * 100),\n      40];\n    this.barChartData[0].data = data;\n  }\n}\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/bubble-chart/bubble-chart.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/bubble-chart/bubble-chart.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div>\n    <div style=\"display: block\">\n      <canvas baseChart\n        [datasets]=\"bubbleChartData\"\n        [options]=\"bubbleChartOptions\"\n        [colors]=\"bubbleChartColors\"\n        [legend]=\"bubbleChartLegend\"\n        [chartType]=\"bubbleChartType\">\n      </canvas>\n    </div>\n    <button mat-button mat-raised-button color=\"primary\" (click)=\"randomize()\">Update</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/bubble-chart/bubble-chart.component.ts":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/bubble-chart/bubble-chart.component.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "import { Component, OnInit } from '@angular/core';\nimport { ChartOptions, ChartType, ChartDataSets } from 'chart.js';\nimport { Color } from 'ng2-charts';\n\n@Component({\n  selector: 'app-bubble-chart',\n  templateUrl: './bubble-chart.component.html',\n  styleUrls: ['./bubble-chart.component.scss']\n})\nexport class BubbleChartComponent implements OnInit {\n  public bubbleChartOptions: ChartOptions = {\n    responsive: true,\n    scales: {\n      xAxes: [\n        {\n          ticks: {\n            min: 0,\n            max: 30,\n          }\n        }\n      ],\n      yAxes: [\n        {\n          ticks: {\n            min: 0,\n            max: 30,\n          }\n        }\n      ]\n    }\n  };\n  public bubbleChartType: ChartType = 'bubble';\n  public bubbleChartLegend = true;\n\n  public bubbleChartData: ChartDataSets[] = [\n    {\n      data: [\n        { x: 10, y: 10, r: 10 },\n        { x: 15, y: 5, r: 15 },\n        { x: 26, y: 12, r: 23 },\n        { x: 7, y: 8, r: 8 },\n      ],\n      label: 'Series A',\n      backgroundColor: 'green',\n      borderColor: 'blue',\n      hoverBackgroundColor: 'purple',\n      hoverBorderColor: 'red',\n    },\n  ];\n\n  public bubbleChartColors: Color[] = [\n    {\n      backgroundColor: [\n        'red',\n        'green',\n        'blue',\n        'purple',\n        'yellow',\n        'brown',\n        'magenta',\n        'cyan',\n        'orange',\n        'pink'\n      ]\n    }\n  ];\n\n  constructor() { }\n\n  ngOnInit() {\n  }\n\n  // events\n  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  private rand(max: number) {\n    return Math.trunc(Math.random() * max);\n  }\n\n  private randomPoint(maxCoordinate: number) {\n    const x = this.rand(maxCoordinate);\n    const y = this.rand(maxCoordinate);\n    const r = this.rand(30) + 5;\n    return { x, y, r };\n  }\n\n  public randomize(): void {\n    const numberOfPoints = this.rand(5) + 5;\n    const data = Array.apply(null, { length: numberOfPoints }).map(r => this.randomPoint(30));\n    this.bubbleChartData[0].data = data;\n  }\n}\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/chart-host/chart-host.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/chart-host/chart-host.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section style=\"padding-top: 50px;\">\n  <div>\n    <div>\n      <h4>{{heading}}</h4>\n    </div>\n  </div>\n  <div>\n    <ng-content></ng-content>\n  </div>\n  <div>\n    <div>\n      <mat-tab-group>\n        <mat-tab label=\"Markup\">\n          <div class=\"card card-block panel panel-default panel-body\">\n            <pre><code [highlight]=\"html\"></code></pre>\n          </div>\n        </mat-tab>\n        <mat-tab label=\"TypeScript\">\n          <div class=\"card card-block panel panel-default panel-body\">\n            <pre><code [highlight]=\"ts\"></code></pre>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/doughnut-chart/doughnut-chart.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/doughnut-chart/doughnut-chart.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div>\n    <div style=\"display: block\">\n      <canvas baseChart\n        [data]=\"doughnutChartData\"\n        [labels]=\"doughnutChartLabels\"\n        [chartType]=\"doughnutChartType\">\n      </canvas>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/doughnut-chart/doughnut-chart.component.ts":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/doughnut-chart/doughnut-chart.component.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "import { Component, OnInit } from '@angular/core';\nimport { ChartType } from 'chart.js';\nimport { MultiDataSet, Label } from 'ng2-charts';\n\n@Component({\n  selector: 'app-doughnut-chart',\n  templateUrl: './doughnut-chart.component.html',\n  styleUrls: ['./doughnut-chart.component.scss']\n})\nexport class DoughnutChartComponent implements OnInit {\n  // Doughnut\n  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];\n  public doughnutChartData: MultiDataSet = [\n    [350, 450, 100],\n    [50, 150, 120],\n    [250, 130, 70],\n  ];\n  public doughnutChartType: ChartType = 'doughnut';\n\n  constructor() { }\n\n  ngOnInit() {\n  }\n\n  // events\n  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n}\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/dynamic-chart/dynamic-chart.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/dynamic-chart/dynamic-chart.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div>\n    <div>\n      <div style=\"display: block\">\n        <canvas baseChart [datasets]=\"barChartData\" [labels]=\"barChartLabels\" [options]=\"barChartOptions\"\n          [legend]=\"barChartLegend\" [chartType]=\"barChartType\" (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n      </div>\n      <button mat-button mat-raised-button color=\"primary\" (click)=\"randomize()\">Update</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/dynamic-chart/dynamic-chart.component.ts":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/dynamic-chart/dynamic-chart.component.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "import { Component, OnInit } from '@angular/core';\nimport { ChartOptions, ChartType, ChartDataSets } from 'chart.js';\nimport { Label } from 'ng2-charts';\n\n@Component({\n  selector: 'app-dynamic-chart',\n  templateUrl: './dynamic-chart.component.html',\n  styleUrls: ['./dynamic-chart.component.scss']\n})\nexport class DynamicChartComponent implements OnInit {\n  public barChartOptions: ChartOptions = {\n    responsive: true,\n    // We use these empty structures as placeholders for dynamic theming.\n    scales: { xAxes: [{}], yAxes: [{}] },\n  };\n  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];\n  public barChartType: ChartType = 'bar';\n  public barChartLegend = true;\n\n  public barChartData: ChartDataSets[] = [\n    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },\n    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }\n  ];\n\n  constructor() { }\n\n  ngOnInit() {\n  }\n\n  // events\n  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public randomize(): void {\n    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';\n  }\n}\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/financial-chart/financial-chart.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/financial-chart/financial-chart.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <markdown ngPreserveWhitespaces>\n\n    This chart demonstrates how custom chart types can be plugged into `ng2-charts`. Check out the Typescript source\n    code below.\n\n    This custom chart type depends on a package called [`chartjs-chart-financial`](https://github.com/chartjs/chartjs-chart-financial)\n    which is not yet on [npmjs.com](https://npmjs.com). It is included in the demo app as a git submodule directly from the github site of the package.\n\n    This also demonstrates using a different date/time adapter than [`moment`](https://www.npmjs.com/package/moment).\n    This demo uses [`luxon`](https://www.npmjs.com/package/luxon) instead, plugged into the `chart.js` module using\n    the [`chartjs-adapter-luxon`](https://www.npmjs.com/package/chartjs-adapter-luxon) package.\n\n    Developers who wish to run this locally must first clone the demo app, then run some npm commands:\n\n    ```bash\n    git clone git@github.com:valor-software/ng2-charts.git\n    npm install\n    npm run install:financial\n    npm run build:financial\n    npm run build:lib\n    ```\n\n    Then you may run `npm start` to run the demo app locally on http://localhost:4200\n  </markdown>\n</div>\n<div class=\"chart\">\n  <canvas baseChart [datasets]=\"financialChartData\" [options]=\"financialChartOptions\"\n    [colors]=\"financialChartColors\" [legend]=\"financialChartLegend\" [chartType]=\"financialChartType\"\n    [plugins]=\"financialChartPlugins\">\n  </canvas>\n</div>\n<div>\n  <button mat-button mat-raised-button color=\"primary\" (click)=\"update()\">Toggle Chart Type</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/financial-chart/financial-chart.component.ts":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/financial-chart/financial-chart.component.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "import { Component, OnInit, ViewChild } from '@angular/core';\nimport 'dist/chartjs-chart-financial/chartjs-chart-financial';\nimport * as luxon from 'luxon';\nimport 'chartjs-adapter-luxon';\nimport { ChartOptions } from 'chart.js';\nimport { Color, BaseChartDirective } from 'ng2-charts';\n\n@Component({\n  selector: 'app-financial-chart',\n  templateUrl: './financial-chart.component.html',\n  styleUrls: ['./financial-chart.component.css']\n})\nexport class FinancialChartComponent implements OnInit {\n  barCount = 60;\n  initialDateStr = '01 Apr 2017 00:00 Z';\n\n  public financialChartData = [\n    {\n      label: 'CHRT - Chart.js Corporation',\n      data: this.getRandomData(this.initialDateStr, this.barCount)\n    },\n  ];\n  public financialChartOptions: ChartOptions = {\n    responsive: true,\n    maintainAspectRatio: false,\n  };\n  public financialChartColors: Color[] = [\n    {\n      borderColor: 'black',\n      backgroundColor: 'rgba(255,0,0,0.3)',\n    },\n  ];\n  public financialChartLegend = true;\n  public financialChartType = 'candlestick';\n  public financialChartPlugins = [];\n\n  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;\n\n  constructor() { }\n\n  ngOnInit() {\n  }\n\n  randomNumber(min: number, max: number) {\n    return Math.random() * (max - min) + min;\n  }\n\n  randomBar(date: luxon.DateTime, lastClose: number) {\n    const open = this.randomNumber(lastClose * 0.95, lastClose * 1.05);\n    const close = this.randomNumber(open * 0.95, open * 1.05);\n    const high = this.randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);\n    const low = this.randomNumber(Math.min(open, close) * 0.9, Math.min(open, close));\n    return {\n      t: date.valueOf(),\n      o: open,\n      h: high,\n      l: low,\n      c: close\n    };\n  }\n\n  getRandomData(dateStr: string, count: number) {\n    let date = luxon.DateTime.fromRFC2822(dateStr);\n    const data = [this.randomBar(date, 30)];\n    while (data.length < count) {\n      date = date.plus({ days: 1 });\n      if (date.weekday <= 5) {\n        data.push(this.randomBar(date, data[data.length - 1].c));\n      }\n    }\n    return data;\n  }\n\n  update() {\n    // candlestick vs ohlc\n    this.financialChartType = this.financialChartType === 'candlestick' ? 'ohlc' : 'candlestick';\n  }\n}\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/line-chart/line-chart.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/line-chart/line-chart.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"flex\">\n  <div class=\"flex-item\">\n    <div style=\"display: block;\">\n    <canvas baseChart width=\"400\" height=\"400\"\n                [datasets]=\"lineChartData\"\n                [labels]=\"lineChartLabels\"\n                [options]=\"lineChartOptions\"\n                [colors]=\"lineChartColors\"\n                [legend]=\"lineChartLegend\"\n                [chartType]=\"lineChartType\"\n                [plugins]=\"lineChartPlugins\"\n                (chartHover)=\"chartHovered($event)\"\n                (chartClick)=\"chartClicked($event)\"></canvas>\n    </div>\n  </div>\n  <div class=\"flex-item\">\n    <table class=\"table table-responsive table-condensed\">\n      <tr>\n        <th *ngFor=\"let label of lineChartLabels\">{{label}}</th>\n      </tr>\n      <tr *ngFor=\"let d of lineChartData; let i=index\" [class]=\"'line-'+i\">\n        <td *ngFor=\"let label of lineChartLabels; let j=index\">{{d && d.data[j]}}</td>\n      </tr>\n    </table>\n    <button mat-button mat-raised-button color=\"primary\" (click)=\"randomize()\">Randomize</button>\n    <button mat-button mat-raised-button color=\"primary\" (click)=\"pushOne()\">Push</button>\n    <button mat-button mat-raised-button color=\"primary\" (click)=\"changeColor()\">Recolor</button>\n    <button mat-button mat-raised-button color=\"primary\" (click)=\"hideOne()\">Toggle Series B</button>\n    <button mat-button mat-raised-button color=\"primary\" (click)=\"changeLabel()\">Change Label</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/line-chart/line-chart.component.ts":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/line-chart/line-chart.component.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "import { Component, OnInit, ViewChild } from '@angular/core';\nimport { ChartDataSets, ChartOptions } from 'chart.js';\nimport { Color, BaseChartDirective, Label } from 'ng2-charts';\nimport * as pluginAnnotations from 'chartjs-plugin-annotation';\n\n@Component({\n  selector: 'app-line-chart',\n  templateUrl: './line-chart.component.html',\n  styleUrls: ['./line-chart.component.scss']\n})\nexport class LineChartComponent implements OnInit {\n  public lineChartData: ChartDataSets[] = [\n    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },\n    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },\n    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }\n  ];\n  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];\n  public lineChartOptions: (ChartOptions & { annotation: any }) = {\n    responsive: true,\n    scales: {\n      // We use this empty structure as a placeholder for dynamic theming.\n      xAxes: [{}],\n      yAxes: [\n        {\n          id: 'y-axis-0',\n          position: 'left',\n        },\n        {\n          id: 'y-axis-1',\n          position: 'right',\n          gridLines: {\n            color: 'rgba(255,0,0,0.3)',\n          },\n          ticks: {\n            fontColor: 'red',\n          }\n        }\n      ]\n    },\n    annotation: {\n      annotations: [\n        {\n          type: 'line',\n          mode: 'vertical',\n          scaleID: 'x-axis-0',\n          value: 'March',\n          borderColor: 'orange',\n          borderWidth: 2,\n          label: {\n            enabled: true,\n            fontColor: 'orange',\n            content: 'LineAnno'\n          }\n        },\n      ],\n    },\n  };\n  public lineChartColors: Color[] = [\n    { // grey\n      backgroundColor: 'rgba(148,159,177,0.2)',\n      borderColor: 'rgba(148,159,177,1)',\n      pointBackgroundColor: 'rgba(148,159,177,1)',\n      pointBorderColor: '#fff',\n      pointHoverBackgroundColor: '#fff',\n      pointHoverBorderColor: 'rgba(148,159,177,0.8)'\n    },\n    { // dark grey\n      backgroundColor: 'rgba(77,83,96,0.2)',\n      borderColor: 'rgba(77,83,96,1)',\n      pointBackgroundColor: 'rgba(77,83,96,1)',\n      pointBorderColor: '#fff',\n      pointHoverBackgroundColor: '#fff',\n      pointHoverBorderColor: 'rgba(77,83,96,1)'\n    },\n    { // red\n      backgroundColor: 'rgba(255,0,0,0.3)',\n      borderColor: 'red',\n      pointBackgroundColor: 'rgba(148,159,177,1)',\n      pointBorderColor: '#fff',\n      pointHoverBackgroundColor: '#fff',\n      pointHoverBorderColor: 'rgba(148,159,177,0.8)'\n    }\n  ];\n  public lineChartLegend = true;\n  public lineChartType = 'line';\n  public lineChartPlugins = [pluginAnnotations];\n\n  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;\n\n  constructor() { }\n\n  ngOnInit() {\n  }\n\n  public randomize(): void {\n    for (let i = 0; i < this.lineChartData.length; i++) {\n      for (let j = 0; j < this.lineChartData[i].data.length; j++) {\n        this.lineChartData[i].data[j] = this.generateNumber(i);\n      }\n    }\n    this.chart.update();\n  }\n\n  private generateNumber(i: number) {\n    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);\n  }\n\n  // events\n  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public hideOne() {\n    const isHidden = this.chart.isDatasetHidden(1);\n    this.chart.hideDataset(1, !isHidden);\n  }\n\n  public pushOne() {\n    this.lineChartData.forEach((x, i) => {\n      const num = this.generateNumber(i);\n      const data: number[] = x.data as number[];\n      data.push(num);\n    });\n    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);\n  }\n\n  public changeColor() {\n    this.lineChartColors[2].borderColor = 'green';\n    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;\n  }\n\n  public changeLabel() {\n    this.lineChartLabels[2] = ['1st Line', '2nd Line'];\n    // this.chart.update();\n  }\n}\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pie-chart/pie-chart.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pie-chart/pie-chart.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div>\n    <div class=\"chart\">\n      <canvas baseChart\n        [data]=\"pieChartData\"\n        [labels]=\"pieChartLabels\"\n        [chartType]=\"pieChartType\"\n        [options]=\"pieChartOptions\"\n        [plugins]=\"pieChartPlugins\"\n        [colors]=\"pieChartColors\"\n        [legend]=\"pieChartLegend\">\n      </canvas>\n    </div>\n  </div>\n</div>\n<div>\n  <button mat-button mat-raised-button color=\"primary\" (click)=\"pieChartLegend=!pieChartLegend\">Toggle Legend</button>\n  <button mat-button mat-raised-button color=\"primary\" (click)=\"changeLabels()\">Change Labels</button>\n  <button mat-button mat-raised-button color=\"primary\" (click)=\"addSlice()\">Add Slice</button>\n  <button mat-button mat-raised-button color=\"primary\" (click)=\"removeSlice()\">Remove Slice</button>\n  <button mat-button mat-raised-button color=\"primary\" (click)=\"changeLegendPosition()\">Change Legend Position</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pie-chart/pie-chart.component.ts":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pie-chart/pie-chart.component.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "import { Component, OnInit } from '@angular/core';\nimport { ChartType, ChartOptions } from 'chart.js';\nimport { Label } from 'ng2-charts';\nimport * as pluginDataLabels from 'chartjs-plugin-datalabels';\n\n@Component({\n  selector: 'app-pie-chart',\n  templateUrl: './pie-chart.component.html',\n  styleUrls: ['./pie-chart.component.scss']\n})\nexport class PieChartComponent implements OnInit {\n  // Pie\n  public pieChartOptions: ChartOptions = {\n    responsive: true,\n    legend: {\n      position: 'top',\n    },\n    plugins: {\n      datalabels: {\n        formatter: (value, ctx) => {\n          const label = ctx.chart.data.labels[ctx.dataIndex];\n          return label;\n        },\n      },\n    }\n  };\n  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];\n  public pieChartData: number[] = [300, 500, 100];\n  public pieChartType: ChartType = 'pie';\n  public pieChartLegend = true;\n  public pieChartPlugins = [pluginDataLabels];\n  public pieChartColors = [\n    {\n      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],\n    },\n  ];\n\n  constructor() { }\n\n  ngOnInit() {\n  }\n\n  // events\n  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  changeLabels() {\n    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',\n      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',\n      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',\n      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',\n      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];\n    const randomWord = () => words[Math.trunc(Math.random() * words.length)];\n    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());\n  }\n\n  addSlice() {\n    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);\n    this.pieChartData.push(400);\n    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');\n  }\n\n  removeSlice() {\n    this.pieChartLabels.pop();\n    this.pieChartData.pop();\n    this.pieChartColors[0].backgroundColor.pop();\n  }\n\n  changeLegendPosition() {\n    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';\n  }\n}\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/polar-area-chart/polar-area-chart.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/polar-area-chart/polar-area-chart.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div>\n    <div style=\"display: block\">\n      <canvas baseChart\n        [data]=\"polarAreaChartData\"\n        [labels]=\"polarAreaChartLabels\"\n        [legend]=\"polarAreaLegend\"\n        [chartType]=\"polarAreaChartType\">\n      </canvas>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/polar-area-chart/polar-area-chart.component.ts":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/polar-area-chart/polar-area-chart.component.ts ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "import { Component, OnInit } from '@angular/core';\nimport { SingleDataSet, Label } from 'ng2-charts';\nimport { ChartType } from 'chart.js';\n\n@Component({\n  selector: 'app-polar-area-chart',\n  templateUrl: './polar-area-chart.component.html',\n  styleUrls: ['./polar-area-chart.component.scss']\n})\nexport class PolarAreaChartComponent implements OnInit {\n  // PolarArea\n  public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];\n  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];\n  public polarAreaLegend = true;\n\n  public polarAreaChartType: ChartType = 'polarArea';\n\n  constructor() { }\n\n  ngOnInit() {\n  }\n\n  // events\n  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n}\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/radar-chart/radar-chart.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/radar-chart/radar-chart.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div>\n    <div style=\"display: block\">\n      <canvas baseChart\n        [datasets]=\"radarChartData\"\n        [options]=\"radarChartOptions\"\n        [labels]=\"radarChartLabels\"\n        [chartType]=\"radarChartType\">\n      </canvas>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/radar-chart/radar-chart.component.ts":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/radar-chart/radar-chart.component.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "import { Component, OnInit } from '@angular/core';\nimport { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';\nimport { Label } from 'ng2-charts';\n\n@Component({\n  selector: 'app-radar-chart',\n  templateUrl: './radar-chart.component.html',\n  styleUrls: ['./radar-chart.component.scss']\n})\nexport class RadarChartComponent implements OnInit {\n  // Radar\n  public radarChartOptions: RadialChartOptions = {\n    responsive: true,\n  };\n  public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];\n\n  public radarChartData: ChartDataSets[] = [\n    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },\n    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }\n  ];\n  public radarChartType: ChartType = 'radar';\n\n  constructor() { }\n\n  ngOnInit() {\n  }\n\n  // events\n  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n}\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/scatter-chart/scatter-chart.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/scatter-chart/scatter-chart.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div>\n    <div style=\"display: block\">\n      <canvas baseChart\n        [datasets]=\"scatterChartData\"\n        [options]=\"scatterChartOptions\"\n        [labels]=\"scatterChartLabels\"\n        [chartType]=\"scatterChartType\">\n      </canvas>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/scatter-chart/scatter-chart.component.ts":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/scatter-chart/scatter-chart.component.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "import { Component, OnInit } from '@angular/core';\nimport { ChartDataSets, ChartType, ChartOptions } from 'chart.js';\nimport { Label } from 'ng2-charts';\n\n@Component({\n  selector: 'app-scatter-chart',\n  templateUrl: './scatter-chart.component.html',\n  styleUrls: ['./scatter-chart.component.scss']\n})\nexport class ScatterChartComponent implements OnInit {\n  // scatter\n  public scatterChartOptions: ChartOptions = {\n    responsive: true,\n  };\n  public scatterChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];\n\n  public scatterChartData: ChartDataSets[] = [\n    {\n      data: [\n        { x: 1, y: 1 },\n        { x: 2, y: 3 },\n        { x: 3, y: -2 },\n        { x: 4, y: 4 },\n        { x: 5, y: -3 },\n      ],\n      label: 'Series A',\n      pointRadius: 10,\n    },\n  ];\n  public scatterChartType: ChartType = 'scatter';\n\n  constructor() { }\n\n  ngOnInit() {\n  }\n\n  // events\n  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n\n  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {\n    console.log(event, active);\n  }\n}\n"

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-toolbar {\n  position: fixed;\n  top: 0;\n  z-index: 9999;\n}\nmat-toolbar .toolbar {\n  width: 1170px;\n  margin: auto;\n}\n.badges .badge {\n  display: inline-block;\n  width: 100px;\n}\nfooter .text-center {\n  text-align: center;\n}\nfooter p {\n  margin-bottom: 10px;\n}\n.container {\n  width: 1170px;\n  margin: auto;\n}\n.container p {\n  margin-top: 0;\n}\n.container h1 {\n  margin-bottom: 0;\n  font-size: 60;\n  font-weight: 500;\n}\n.outer-container {\n  width: calc(100% - 100px);\n  margin: auto;\n}\n.section {\n  width: 1170px;\n  margin: auto;\n}\napp-chart-host {\n  width: 100%;\n}\n.bd-pageheader {\n  margin-top: 51px;\n}\n.bd-pageheader,\n.bs-docs-masthead {\n  padding: 30px 0;\n  color: #cdbfe3;\n  text-align: center;\n  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);\n  background-color: #6f5499;\n  background-image: linear-gradient(to bottom, #563d7c 0, #6f5499 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#563d7c\", endColorstr=\"#6F5499\", GradientType=0);\n  background-repeat: repeat-x;\n}\n.bd-pageheader {\n  margin-bottom: 40px;\n  font-size: 20px;\n}\n.bd-pageheader h1 {\n  margin-top: 0;\n  color: #fff;\n}\n.bd-pageheader p {\n  margin-bottom: 0;\n  font-weight: 300;\n  line-height: 1.4;\n}\n.bd-pageheader .btn {\n  margin: 10px 0;\n}\n@media (min-width: 992px) {\n  .bd-pageheader h1,\n.bd-pageheader p {\n    margin-right: 380px;\n  }\n}\n@media (min-width: 768px) {\n  .bd-pageheader {\n    font-size: 24px;\n    text-align: left;\n  }\n\n  .bd-pageheader h1 {\n    font-size: 60px;\n    line-height: 1;\n  }\n}\n@media (max-width: 640px) {\n  .container {\n    width: 570px;\n  }\n\n  .section {\n    width: 570px;\n  }\n}\n@media (max-width: 360px) {\n  .container {\n    width: 320px;\n  }\n\n  .section {\n    width: 320px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3ZzL1dlYnN0b3JtUHJvamVjdHMvbmcyLWNoYXJ0cy9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxhQUFBO0FDQ0Y7QURBRTtFQUNFLGFBQUE7RUFDQSxZQUFBO0FDRUo7QURHRTtFQUNFLHFCQUFBO0VBQ0EsWUFBQTtBQ0FKO0FES0U7RUFDRSxrQkFBQTtBQ0ZKO0FESUU7RUFDRSxtQkFBQTtBQ0ZKO0FETUE7RUFDRSxhQUFBO0VBQ0EsWUFBQTtBQ0hGO0FESUU7RUFDRSxhQUFBO0FDRko7QURJRTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FDRko7QURNQTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtBQ0hGO0FETUE7RUFDRSxhQUFBO0VBQ0EsWUFBQTtBQ0hGO0FETUE7RUFDRSxXQUFBO0FDSEY7QURNQTtFQUNFLGdCQUFBO0FDSEY7QURNQTs7RUFHRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsdUNBQUE7RUFDQSx5QkFBQTtFQUlBLHFFQUFBO0VBQ0Esa0hBQUE7RUFDQSwyQkFBQTtBQ0pGO0FET0E7RUFDRSxtQkFBQTtFQUNBLGVBQUE7QUNKRjtBRE9BO0VBQ0UsYUFBQTtFQUNBLFdBQUE7QUNKRjtBRE9BO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FDSkY7QURPQTtFQUNFLGNBQUE7QUNKRjtBRE9BO0VBQ0U7O0lBRUUsbUJBQUE7RUNKRjtBQUNGO0FET0E7RUFDRTtJQUNFLGVBQUE7SUFDQSxnQkFBQTtFQ0xGOztFRE9BO0lBQ0UsZUFBQTtJQUNBLGNBQUE7RUNKRjtBQUNGO0FET0E7RUFDRTtJQUNFLFlBQUE7RUNMRjs7RURPQTtJQUNFLFlBQUE7RUNKRjtBQUNGO0FET0E7RUFDRTtJQUNFLFlBQUE7RUNMRjs7RURPQTtJQUNFLFlBQUE7RUNKRjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LXRvb2xiYXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgei1pbmRleDogOTk5OTtcbiAgLnRvb2xiYXIge1xuICAgIHdpZHRoOiAxMTcwcHg7XG4gICAgbWFyZ2luOiBhdXRvO1xuICB9XG59XG5cbi5iYWRnZXMge1xuICAuYmFkZ2Uge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogMTAwcHg7XG4gIH1cbn1cblxuZm9vdGVyIHtcbiAgLnRleHQtY2VudGVyIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgcCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgfVxufVxuXG4uY29udGFpbmVyIHtcbiAgd2lkdGg6IDExNzBweDtcbiAgbWFyZ2luOiBhdXRvO1xuICBwIHtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG4gIGgxIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIGZvbnQtc2l6ZTogNjA7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxufVxuXG4ub3V0ZXItY29udGFpbmVyIHtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDEwMHB4KTtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG4uc2VjdGlvbiB7XG4gIHdpZHRoOiAxMTcwcHg7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuYXBwLWNoYXJ0LWhvc3Qge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmJkLXBhZ2VoZWFkZXIge1xuICBtYXJnaW4tdG9wOiA1MXB4O1xufVxuXG4uYmQtcGFnZWhlYWRlcixcbi5icy1kb2NzLW1hc3RoZWFkIHtcbiAgLy8gcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAzMHB4IDA7XG4gIGNvbG9yOiAjY2RiZmUzO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtc2hhZG93OiAwIDFweCAwIHJnYmEoMCwgMCwgMCwgLjEpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmY1NDk5O1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIGxlZnQgYm90dG9tLCBmcm9tKCM1NjNkN2MpLCB0bygjNmY1NDk5KSk7XG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgIzU2M2Q3YyAwLCAjNmY1NDk5IDEwMCUpO1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAjNTYzZDdjIDAsICM2ZjU0OTkgMTAwJSk7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICM1NjNkN2MgMCwgIzZmNTQ5OSAxMDAlKTtcbiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvcnN0cj0nIzU2M2Q3YycsIGVuZENvbG9yc3RyPScjNkY1NDk5JywgR3JhZGllbnRUeXBlPTApO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG59XG5cbi5iZC1wYWdlaGVhZGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuXG4uYmQtcGFnZWhlYWRlciBoMSB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIGNvbG9yOiAjZmZmO1xufVxuXG4uYmQtcGFnZWhlYWRlciBwIHtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcbn1cblxuLmJkLXBhZ2VoZWFkZXIgLmJ0biB7XG4gIG1hcmdpbjogMTBweCAwO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcbiAgLmJkLXBhZ2VoZWFkZXIgaDEsXG4gIC5iZC1wYWdlaGVhZGVyIHAge1xuICAgIG1hcmdpbi1yaWdodDogMzgwcHg7XG4gIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5iZC1wYWdlaGVhZGVyIHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgfVxuICAuYmQtcGFnZWhlYWRlciBoMSB7XG4gICAgZm9udC1zaXplOiA2MHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxO1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA2NDBweCkge1xuICAuY29udGFpbmVyIHtcbiAgICB3aWR0aDogNTcwcHg7XG4gIH1cbiAgLnNlY3Rpb24ge1xuICAgIHdpZHRoOiA1NzBweDtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMzYwcHgpIHtcbiAgLmNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDMyMHB4O1xuICB9XG4gIC5zZWN0aW9uIHtcbiAgICB3aWR0aDogMzIwcHg7XG4gIH1cbn1cbiIsIm1hdC10b29sYmFyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIHotaW5kZXg6IDk5OTk7XG59XG5tYXQtdG9vbGJhciAudG9vbGJhciB7XG4gIHdpZHRoOiAxMTcwcHg7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuLmJhZGdlcyAuYmFkZ2Uge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiAxMDBweDtcbn1cblxuZm9vdGVyIC50ZXh0LWNlbnRlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmZvb3RlciBwIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMTcwcHg7XG4gIG1hcmdpbjogYXV0bztcbn1cbi5jb250YWluZXIgcCB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG4uY29udGFpbmVyIGgxIHtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgZm9udC1zaXplOiA2MDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLm91dGVyLWNvbnRhaW5lciB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxMDBweCk7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuLnNlY3Rpb24ge1xuICB3aWR0aDogMTE3MHB4O1xuICBtYXJnaW46IGF1dG87XG59XG5cbmFwcC1jaGFydC1ob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5iZC1wYWdlaGVhZGVyIHtcbiAgbWFyZ2luLXRvcDogNTFweDtcbn1cblxuLmJkLXBhZ2VoZWFkZXIsXG4uYnMtZG9jcy1tYXN0aGVhZCB7XG4gIHBhZGRpbmc6IDMwcHggMDtcbiAgY29sb3I6ICNjZGJmZTM7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdGV4dC1zaGFkb3c6IDAgMXB4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmY1NDk5O1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIGxlZnQgYm90dG9tLCBmcm9tKCM1NjNkN2MpLCB0bygjNmY1NDk5KSk7XG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgIzU2M2Q3YyAwLCAjNmY1NDk5IDEwMCUpO1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAjNTYzZDdjIDAsICM2ZjU0OTkgMTAwJSk7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICM1NjNkN2MgMCwgIzZmNTQ5OSAxMDAlKTtcbiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvcnN0cj1cIiM1NjNkN2NcIiwgZW5kQ29sb3JzdHI9XCIjNkY1NDk5XCIsIEdyYWRpZW50VHlwZT0wKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xufVxuXG4uYmQtcGFnZWhlYWRlciB7XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmJkLXBhZ2VoZWFkZXIgaDEge1xuICBtYXJnaW4tdG9wOiAwO1xuICBjb2xvcjogI2ZmZjtcbn1cblxuLmJkLXBhZ2VoZWFkZXIgcCB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG59XG5cbi5iZC1wYWdlaGVhZGVyIC5idG4ge1xuICBtYXJnaW46IDEwcHggMDtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5iZC1wYWdlaGVhZGVyIGgxLFxuLmJkLXBhZ2VoZWFkZXIgcCB7XG4gICAgbWFyZ2luLXJpZ2h0OiAzODBweDtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5iZC1wYWdlaGVhZGVyIHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgfVxuXG4gIC5iZC1wYWdlaGVhZGVyIGgxIHtcbiAgICBmb250LXNpemU6IDYwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDE7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA2NDBweCkge1xuICAuY29udGFpbmVyIHtcbiAgICB3aWR0aDogNTcwcHg7XG4gIH1cblxuICAuc2VjdGlvbiB7XG4gICAgd2lkdGg6IDU3MHB4O1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogMzYwcHgpIHtcbiAgLmNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDMyMHB4O1xuICB9XG5cbiAgLnNlY3Rpb24ge1xuICAgIHdpZHRoOiAzMjBweDtcbiAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-charts */ "./dist/ng2-charts/fesm5/ng2-charts.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");







var AppComponent = /** @class */ (function () {
    function AppComponent(document, renderer, themeService, router, route) {
        this.document = document;
        this.renderer = renderer;
        this.themeService = themeService;
        this.router = router;
        this.route = route;
        this._selectedTheme = 'lala';
        this.subs = [];
        this.selectedTheme = 'ng2-charts-demo-light-theme';
    }
    Object.defineProperty(AppComponent.prototype, "selectedTheme", {
        get: function () {
            return this._selectedTheme;
        },
        set: function (value) {
            this.renderer.removeClass(this.document.body, this._selectedTheme);
            this._selectedTheme = value;
            this.renderer.addClass(this.document.body, value);
            var overrides;
            if (this.selectedTheme === 'ng2-charts-demo-light-theme') {
                overrides = {};
            }
            else {
                overrides = {
                    legend: {
                        labels: {
                            fontColor: 'white',
                        }
                    },
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    fontColor: 'white',
                                },
                                gridLines: {
                                    color: 'rgba(255,255,255,0.1)'
                                }
                            }
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    fontColor: 'white',
                                },
                                gridLines: {
                                    color: 'rgba(255,255,255,0.1)'
                                }
                            }
                        ]
                    },
                    plugins: {
                        datalabels: {
                            color: 'white',
                        }
                    }
                };
            }
            this.themeService.setColorschemesOptions(overrides);
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.route.fragment
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])(Boolean))
            .subscribe(function (tabUrl) {
            if (_this.tabElements) {
                var index = _this.tabLabels.indexOf(tabUrl.slice(1));
                if (index !== -1) {
                    _this.tabGroup.selectedIndex = index;
                }
            }
        }));
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.tabLabels = this.tabElements.map(function (r) { return r.nativeElement.getAttribute('label').replace(/ /g, ''); });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (x) { return x.unsubscribe(); });
    };
    AppComponent.prototype.updateRoute = function (index) {
        var label = this.tabLabels[index];
        this.router.navigate([], { fragment: "/" + label });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('tabGroup', { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material_tabs__WEBPACK_IMPORTED_MODULE_5__["MatTabGroup"])
    ], AppComponent.prototype, "tabGroup", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChildren"])('tab', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"])
    ], AppComponent.prototype, "tabElements", void 0);
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Document,
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"],
            ng2_charts__WEBPACK_IMPORTED_MODULE_3__["ThemeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: hljsLanguages, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hljsLanguages", function() { return hljsLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-charts */ "./dist/ng2-charts/fesm5/ng2-charts.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./material/material.module */ "./src/app/material/material.module.ts");
/* harmony import */ var ngx_markdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-markdown */ "./node_modules/ngx-markdown/fesm5/ngx-markdown.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./line-chart/line-chart.component */ "./src/app/line-chart/line-chart.component.ts");
/* harmony import */ var _bar_chart_bar_chart_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bar-chart/bar-chart.component */ "./src/app/bar-chart/bar-chart.component.ts");
/* harmony import */ var _doughnut_chart_doughnut_chart_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./doughnut-chart/doughnut-chart.component */ "./src/app/doughnut-chart/doughnut-chart.component.ts");
/* harmony import */ var _radar_chart_radar_chart_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./radar-chart/radar-chart.component */ "./src/app/radar-chart/radar-chart.component.ts");
/* harmony import */ var _pie_chart_pie_chart_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pie-chart/pie-chart.component */ "./src/app/pie-chart/pie-chart.component.ts");
/* harmony import */ var _polar_area_chart_polar_area_chart_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./polar-area-chart/polar-area-chart.component */ "./src/app/polar-area-chart/polar-area-chart.component.ts");
/* harmony import */ var _dynamic_chart_dynamic_chart_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./dynamic-chart/dynamic-chart.component */ "./src/app/dynamic-chart/dynamic-chart.component.ts");
/* harmony import */ var _chart_host_chart_host_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./chart-host/chart-host.component */ "./src/app/chart-host/chart-host.component.ts");
/* harmony import */ var ngx_highlightjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-highlightjs */ "./node_modules/ngx-highlightjs/fesm5/ngx-highlightjs.js");
/* harmony import */ var highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! highlight.js/lib/languages/typescript */ "./node_modules/highlight.js/lib/languages/typescript.js");
/* harmony import */ var highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! highlight.js/lib/languages/xml */ "./node_modules/highlight.js/lib/languages/xml.js");
/* harmony import */ var highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _bubble_chart_bubble_chart_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./bubble-chart/bubble-chart.component */ "./src/app/bubble-chart/bubble-chart.component.ts");
/* harmony import */ var chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! chartjs-plugin-datalabels */ "./node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js");
/* harmony import */ var chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _scatter_chart_scatter_chart_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./scatter-chart/scatter-chart.component */ "./src/app/scatter-chart/scatter-chart.component.ts");
/* harmony import */ var _financial_chart_financial_chart_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./financial-chart/financial-chart.component */ "./src/app/financial-chart/financial-chart.component.ts");

























var routes = [];
function hljsLanguages() {
    return [
        { name: 'typescript', func: highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_19___default.a },
        // { name: 'html', func: html },
        // {name: 'scss', func: scss},
        { name: 'xml', func: highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_20___default.a }
    ];
}
var AppModule = /** @class */ (function () {
    function AppModule() {
        ng2_charts__WEBPACK_IMPORTED_MODULE_3__["BaseChartDirective"].unregisterPlugin(chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_22__);
        Object(ng2_charts__WEBPACK_IMPORTED_MODULE_3__["monkeyPatchChartJsLegend"])();
        Object(ng2_charts__WEBPACK_IMPORTED_MODULE_3__["monkeyPatchChartJsTooltip"])();
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_10__["LineChartComponent"],
                _bar_chart_bar_chart_component__WEBPACK_IMPORTED_MODULE_11__["BarChartComponent"],
                _doughnut_chart_doughnut_chart_component__WEBPACK_IMPORTED_MODULE_12__["DoughnutChartComponent"],
                _radar_chart_radar_chart_component__WEBPACK_IMPORTED_MODULE_13__["RadarChartComponent"],
                _pie_chart_pie_chart_component__WEBPACK_IMPORTED_MODULE_14__["PieChartComponent"],
                _polar_area_chart_polar_area_chart_component__WEBPACK_IMPORTED_MODULE_15__["PolarAreaChartComponent"],
                _dynamic_chart_dynamic_chart_component__WEBPACK_IMPORTED_MODULE_16__["DynamicChartComponent"],
                _chart_host_chart_host_component__WEBPACK_IMPORTED_MODULE_17__["ChartHostComponent"],
                _bubble_chart_bubble_chart_component__WEBPACK_IMPORTED_MODULE_21__["BubbleChartComponent"],
                _scatter_chart_scatter_chart_component__WEBPACK_IMPORTED_MODULE_23__["ScatterChartComponent"],
                _financial_chart_financial_chart_component__WEBPACK_IMPORTED_MODULE_24__["FinancialChartComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot(routes),
                ng2_charts__WEBPACK_IMPORTED_MODULE_3__["ChartsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _material_material_module__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"],
                ngx_markdown__WEBPACK_IMPORTED_MODULE_8__["MarkdownModule"].forRoot({ loader: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClient"] }),
                ngx_highlightjs__WEBPACK_IMPORTED_MODULE_18__["HighlightModule"].forRoot({
                    languages: hljsLanguages,
                })
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/bar-chart/bar-chart.component.scss":
/*!****************************************************!*\
  !*** ./src/app/bar-chart/bar-chart.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Jhci1jaGFydC9iYXItY2hhcnQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/bar-chart/bar-chart.component.ts":
/*!**************************************************!*\
  !*** ./src/app/bar-chart/bar-chart.component.ts ***!
  \**************************************************/
/*! exports provided: BarChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarChartComponent", function() { return BarChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chartjs-plugin-datalabels */ "./node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js");
/* harmony import */ var chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2__);



var BarChartComponent = /** @class */ (function () {
    function BarChartComponent() {
        this.barChartOptions = {
            responsive: true,
            // We use these empty structures as placeholders for dynamic theming.
            scales: { xAxes: [{}], yAxes: [{}] },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                }
            }
        };
        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartPlugins = [chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2__];
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
    }
    BarChartComponent.prototype.ngOnInit = function () {
    };
    // events
    BarChartComponent.prototype.chartClicked = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    BarChartComponent.prototype.chartHovered = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    BarChartComponent.prototype.randomize = function () {
        // Only Change 3 values
        var data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40
        ];
        this.barChartData[0].data = data;
    };
    BarChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-bar-chart',
            template: __webpack_require__(/*! raw-loader!./bar-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/bar-chart/bar-chart.component.html"),
            styles: [__webpack_require__(/*! ./bar-chart.component.scss */ "./src/app/bar-chart/bar-chart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], BarChartComponent);
    return BarChartComponent;
}());



/***/ }),

/***/ "./src/app/bubble-chart/bubble-chart.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/bubble-chart/bubble-chart.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2J1YmJsZS1jaGFydC9idWJibGUtY2hhcnQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/bubble-chart/bubble-chart.component.ts":
/*!********************************************************!*\
  !*** ./src/app/bubble-chart/bubble-chart.component.ts ***!
  \********************************************************/
/*! exports provided: BubbleChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BubbleChartComponent", function() { return BubbleChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var BubbleChartComponent = /** @class */ (function () {
    function BubbleChartComponent() {
        this.bubbleChartOptions = {
            responsive: true,
            scales: {
                xAxes: [
                    {
                        ticks: {
                            min: 0,
                            max: 30,
                        }
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max: 30,
                        }
                    }
                ]
            }
        };
        this.bubbleChartType = 'bubble';
        this.bubbleChartLegend = true;
        this.bubbleChartData = [
            {
                data: [
                    { x: 10, y: 10, r: 10 },
                    { x: 15, y: 5, r: 15 },
                    { x: 26, y: 12, r: 23 },
                    { x: 7, y: 8, r: 8 },
                ],
                label: 'Series A',
                backgroundColor: 'green',
                borderColor: 'blue',
                hoverBackgroundColor: 'purple',
                hoverBorderColor: 'red',
            },
        ];
        this.bubbleChartColors = [
            {
                backgroundColor: [
                    'red',
                    'green',
                    'blue',
                    'purple',
                    'yellow',
                    'brown',
                    'magenta',
                    'cyan',
                    'orange',
                    'pink'
                ]
            }
        ];
    }
    BubbleChartComponent.prototype.ngOnInit = function () {
    };
    // events
    BubbleChartComponent.prototype.chartClicked = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    BubbleChartComponent.prototype.chartHovered = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    BubbleChartComponent.prototype.rand = function (max) {
        return Math.trunc(Math.random() * max);
    };
    BubbleChartComponent.prototype.randomPoint = function (maxCoordinate) {
        var x = this.rand(maxCoordinate);
        var y = this.rand(maxCoordinate);
        var r = this.rand(30) + 5;
        return { x: x, y: y, r: r };
    };
    BubbleChartComponent.prototype.randomize = function () {
        var _this = this;
        var numberOfPoints = this.rand(5) + 5;
        var data = Array.apply(null, { length: numberOfPoints }).map(function (r) { return _this.randomPoint(30); });
        this.bubbleChartData[0].data = data;
    };
    BubbleChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-bubble-chart',
            template: __webpack_require__(/*! raw-loader!./bubble-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/bubble-chart/bubble-chart.component.html"),
            styles: [__webpack_require__(/*! ./bubble-chart.component.scss */ "./src/app/bubble-chart/bubble-chart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], BubbleChartComponent);
    return BubbleChartComponent;
}());



/***/ }),

/***/ "./src/app/chart-host/chart-host.component.scss":
/*!******************************************************!*\
  !*** ./src/app/chart-host/chart-host.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoYXJ0LWhvc3QvY2hhcnQtaG9zdC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/chart-host/chart-host.component.ts":
/*!****************************************************!*\
  !*** ./src/app/chart-host/chart-host.component.ts ***!
  \****************************************************/
/*! exports provided: chartTypes, ChartHostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chartTypes", function() { return chartTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartHostComponent", function() { return ChartHostComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var chartTypes = {
    bar: {
        heading: 'Bar Chart',
        ts: __webpack_require__(/*! !raw-loader!../bar-chart/bar-chart.component.ts */ "./node_modules/raw-loader/index.js!./src/app/bar-chart/bar-chart.component.ts"),
        html: __webpack_require__(/*! !raw-loader!../bar-chart/bar-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/bar-chart/bar-chart.component.html"),
    },
    doughnut: {
        heading: 'Doughnut Chart',
        ts: __webpack_require__(/*! !raw-loader!../doughnut-chart/doughnut-chart.component.ts */ "./node_modules/raw-loader/index.js!./src/app/doughnut-chart/doughnut-chart.component.ts"),
        html: __webpack_require__(/*! !raw-loader!../doughnut-chart/doughnut-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/doughnut-chart/doughnut-chart.component.html"),
    },
    dynamic: {
        heading: 'Dynamic Chart',
        ts: __webpack_require__(/*! !raw-loader!../dynamic-chart/dynamic-chart.component.ts */ "./node_modules/raw-loader/index.js!./src/app/dynamic-chart/dynamic-chart.component.ts"),
        html: __webpack_require__(/*! !raw-loader!../dynamic-chart/dynamic-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/dynamic-chart/dynamic-chart.component.html"),
    },
    line: {
        heading: 'Line Chart',
        ts: __webpack_require__(/*! !raw-loader!../line-chart/line-chart.component.ts */ "./node_modules/raw-loader/index.js!./src/app/line-chart/line-chart.component.ts"),
        html: __webpack_require__(/*! !raw-loader!../line-chart/line-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/line-chart/line-chart.component.html"),
    },
    pie: {
        heading: 'Pie Chart',
        ts: __webpack_require__(/*! !raw-loader!../pie-chart/pie-chart.component.ts */ "./node_modules/raw-loader/index.js!./src/app/pie-chart/pie-chart.component.ts"),
        html: __webpack_require__(/*! !raw-loader!../pie-chart/pie-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/pie-chart/pie-chart.component.html"),
    },
    'polar-area': {
        heading: 'Polar Area Chart',
        ts: __webpack_require__(/*! !raw-loader!../polar-area-chart/polar-area-chart.component.ts */ "./node_modules/raw-loader/index.js!./src/app/polar-area-chart/polar-area-chart.component.ts"),
        html: __webpack_require__(/*! !raw-loader!../polar-area-chart/polar-area-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/polar-area-chart/polar-area-chart.component.html"),
    },
    bubble: {
        heading: 'Bubble Chart',
        ts: __webpack_require__(/*! !raw-loader!../bubble-chart/bubble-chart.component.ts */ "./node_modules/raw-loader/index.js!./src/app/bubble-chart/bubble-chart.component.ts"),
        html: __webpack_require__(/*! !raw-loader!../bubble-chart/bubble-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/bubble-chart/bubble-chart.component.html"),
    },
    radar: {
        heading: 'Radar Chart',
        ts: __webpack_require__(/*! !raw-loader!../radar-chart/radar-chart.component.ts */ "./node_modules/raw-loader/index.js!./src/app/radar-chart/radar-chart.component.ts"),
        html: __webpack_require__(/*! !raw-loader!../radar-chart/radar-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/radar-chart/radar-chart.component.html"),
    },
    scatter: {
        heading: 'Scatter Chart',
        ts: __webpack_require__(/*! !raw-loader!../scatter-chart/scatter-chart.component.ts */ "./node_modules/raw-loader/index.js!./src/app/scatter-chart/scatter-chart.component.ts"),
        html: __webpack_require__(/*! !raw-loader!../scatter-chart/scatter-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/scatter-chart/scatter-chart.component.html"),
    },
    financial: {
        heading: 'Financial Chart',
        ts: __webpack_require__(/*! !raw-loader!../financial-chart/financial-chart.component.ts */ "./node_modules/raw-loader/index.js!./src/app/financial-chart/financial-chart.component.ts"),
        html: __webpack_require__(/*! !raw-loader!../financial-chart/financial-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/financial-chart/financial-chart.component.html"),
    },
};
var ChartHostComponent = /** @class */ (function () {
    function ChartHostComponent() {
    }
    ChartHostComponent.prototype.ngOnInit = function () { };
    ChartHostComponent.prototype.ngAfterContentInit = function () {
        var compName = this.chartType;
        if (chartTypes[compName]) {
            this.heading = chartTypes[compName].heading;
            this.html = chartTypes[compName].html;
            this.ts = chartTypes[compName].ts;
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ChartHostComponent.prototype, "chartType", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"])('main', { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ChartHostComponent.prototype, "content", void 0);
    ChartHostComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-chart-host',
            template: __webpack_require__(/*! raw-loader!./chart-host.component.html */ "./node_modules/raw-loader/index.js!./src/app/chart-host/chart-host.component.html"),
            styles: [__webpack_require__(/*! ./chart-host.component.scss */ "./src/app/chart-host/chart-host.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ChartHostComponent);
    return ChartHostComponent;
}());



/***/ }),

/***/ "./src/app/doughnut-chart/doughnut-chart.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/doughnut-chart/doughnut-chart.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RvdWdobnV0LWNoYXJ0L2RvdWdobnV0LWNoYXJ0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/doughnut-chart/doughnut-chart.component.ts":
/*!************************************************************!*\
  !*** ./src/app/doughnut-chart/doughnut-chart.component.ts ***!
  \************************************************************/
/*! exports provided: DoughnutChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoughnutChartComponent", function() { return DoughnutChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DoughnutChartComponent = /** @class */ (function () {
    function DoughnutChartComponent() {
        // Doughnut
        this.doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
        this.doughnutChartData = [
            [350, 450, 100],
            [50, 150, 120],
            [250, 130, 70],
        ];
        this.doughnutChartType = 'doughnut';
    }
    DoughnutChartComponent.prototype.ngOnInit = function () {
    };
    // events
    DoughnutChartComponent.prototype.chartClicked = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    DoughnutChartComponent.prototype.chartHovered = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    DoughnutChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-doughnut-chart',
            template: __webpack_require__(/*! raw-loader!./doughnut-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/doughnut-chart/doughnut-chart.component.html"),
            styles: [__webpack_require__(/*! ./doughnut-chart.component.scss */ "./src/app/doughnut-chart/doughnut-chart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DoughnutChartComponent);
    return DoughnutChartComponent;
}());



/***/ }),

/***/ "./src/app/dynamic-chart/dynamic-chart.component.scss":
/*!************************************************************!*\
  !*** ./src/app/dynamic-chart/dynamic-chart.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2R5bmFtaWMtY2hhcnQvZHluYW1pYy1jaGFydC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/dynamic-chart/dynamic-chart.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/dynamic-chart/dynamic-chart.component.ts ***!
  \**********************************************************/
/*! exports provided: DynamicChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicChartComponent", function() { return DynamicChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DynamicChartComponent = /** @class */ (function () {
    function DynamicChartComponent() {
        this.barChartOptions = {
            responsive: true,
            // We use these empty structures as placeholders for dynamic theming.
            scales: { xAxes: [{}], yAxes: [{}] },
        };
        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
    }
    DynamicChartComponent.prototype.ngOnInit = function () {
    };
    // events
    DynamicChartComponent.prototype.chartClicked = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    DynamicChartComponent.prototype.chartHovered = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    DynamicChartComponent.prototype.randomize = function () {
        this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    };
    DynamicChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dynamic-chart',
            template: __webpack_require__(/*! raw-loader!./dynamic-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/dynamic-chart/dynamic-chart.component.html"),
            styles: [__webpack_require__(/*! ./dynamic-chart.component.scss */ "./src/app/dynamic-chart/dynamic-chart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DynamicChartComponent);
    return DynamicChartComponent;
}());



/***/ }),

/***/ "./src/app/financial-chart/financial-chart.component.css":
/*!***************************************************************!*\
  !*** ./src/app/financial-chart/financial-chart.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".chart {\n  display: block;\n  width: 1300px;\n  height: 600px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZmluYW5jaWFsLWNoYXJ0L2ZpbmFuY2lhbC1jaGFydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYztFQUNkLGFBQWE7RUFDYixhQUFhO0FBQ2YiLCJmaWxlIjoic3JjL2FwcC9maW5hbmNpYWwtY2hhcnQvZmluYW5jaWFsLWNoYXJ0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2hhcnQge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEzMDBweDtcbiAgaGVpZ2h0OiA2MDBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/financial-chart/financial-chart.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/financial-chart/financial-chart.component.ts ***!
  \**************************************************************/
/*! exports provided: FinancialChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FinancialChartComponent", function() { return FinancialChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var dist_chartjs_chart_financial_chartjs_chart_financial__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dist/chartjs-chart-financial/chartjs-chart-financial */ "./dist/chartjs-chart-financial/chartjs-chart-financial.js");
/* harmony import */ var dist_chartjs_chart_financial_chartjs_chart_financial__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dist_chartjs_chart_financial_chartjs_chart_financial__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! luxon */ "./node_modules/luxon/build/cjs-browser/luxon.js");
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var chartjs_adapter_luxon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chartjs-adapter-luxon */ "./node_modules/chartjs-adapter-luxon/dist/chartjs-adapter-luxon.js");
/* harmony import */ var chartjs_adapter_luxon__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chartjs_adapter_luxon__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-charts */ "./dist/ng2-charts/fesm5/ng2-charts.js");






var FinancialChartComponent = /** @class */ (function () {
    function FinancialChartComponent() {
        this.barCount = 60;
        this.initialDateStr = '01 Apr 2017 00:00 Z';
        this.financialChartData = [
            {
                label: 'CHRT - Chart.js Corporation',
                data: this.getRandomData(this.initialDateStr, this.barCount)
            },
        ];
        this.financialChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };
        this.financialChartColors = [
            {
                borderColor: 'black',
                backgroundColor: 'rgba(255,0,0,0.3)',
            },
        ];
        this.financialChartLegend = true;
        this.financialChartType = 'candlestick';
        this.financialChartPlugins = [];
    }
    FinancialChartComponent.prototype.ngOnInit = function () {
    };
    FinancialChartComponent.prototype.randomNumber = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    FinancialChartComponent.prototype.randomBar = function (date, lastClose) {
        var open = this.randomNumber(lastClose * 0.95, lastClose * 1.05);
        var close = this.randomNumber(open * 0.95, open * 1.05);
        var high = this.randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
        var low = this.randomNumber(Math.min(open, close) * 0.9, Math.min(open, close));
        return {
            t: date.valueOf(),
            o: open,
            h: high,
            l: low,
            c: close
        };
    };
    FinancialChartComponent.prototype.getRandomData = function (dateStr, count) {
        var date = luxon__WEBPACK_IMPORTED_MODULE_3__["DateTime"].fromRFC2822(dateStr);
        var data = [this.randomBar(date, 30)];
        while (data.length < count) {
            date = date.plus({ days: 1 });
            if (date.weekday <= 5) {
                data.push(this.randomBar(date, data[data.length - 1].c));
            }
        }
        return data;
    };
    FinancialChartComponent.prototype.update = function () {
        // candlestick vs ohlc
        this.financialChartType = this.financialChartType === 'candlestick' ? 'ohlc' : 'candlestick';
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(ng2_charts__WEBPACK_IMPORTED_MODULE_5__["BaseChartDirective"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_5__["BaseChartDirective"])
    ], FinancialChartComponent.prototype, "chart", void 0);
    FinancialChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-financial-chart',
            template: __webpack_require__(/*! raw-loader!./financial-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/financial-chart/financial-chart.component.html"),
            styles: [__webpack_require__(/*! ./financial-chart.component.css */ "./src/app/financial-chart/financial-chart.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FinancialChartComponent);
    return FinancialChartComponent;
}());



/***/ }),

/***/ "./src/app/line-chart/line-chart.component.scss":
/*!******************************************************!*\
  !*** ./src/app/line-chart/line-chart.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex;\n}\n\n.flex-item {\n  flex-basis: 50%;\n}\n\ntr.line-2 {\n  color: red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3ZzL1dlYnN0b3JtUHJvamVjdHMvbmcyLWNoYXJ0cy9zcmMvYXBwL2xpbmUtY2hhcnQvbGluZS1jaGFydC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvbGluZS1jaGFydC9saW5lLWNoYXJ0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtBQ0NGOztBREVBO0VBQ0UsVUFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvbGluZS1jaGFydC9saW5lLWNoYXJ0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZsZXgge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uZmxleC1pdGVtIHtcbiAgZmxleC1iYXNpczogNTAlO1xufVxuXG50ci5saW5lLTIge1xuICBjb2xvcjogcmVkO1xufVxuIiwiLmZsZXgge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uZmxleC1pdGVtIHtcbiAgZmxleC1iYXNpczogNTAlO1xufVxuXG50ci5saW5lLTIge1xuICBjb2xvcjogcmVkO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/line-chart/line-chart.component.ts":
/*!****************************************************!*\
  !*** ./src/app/line-chart/line-chart.component.ts ***!
  \****************************************************/
/*! exports provided: LineChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChartComponent", function() { return LineChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-charts */ "./dist/ng2-charts/fesm5/ng2-charts.js");
/* harmony import */ var chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chartjs-plugin-annotation */ "./node_modules/chartjs-plugin-annotation/src/index.js");
/* harmony import */ var chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_3__);




var LineChartComponent = /** @class */ (function () {
    function LineChartComponent() {
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
            { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartOptions = {
            responsive: true,
            scales: {
                // We use this empty structure as a placeholder for dynamic theming.
                xAxes: [{}],
                yAxes: [
                    {
                        id: 'y-axis-0',
                        position: 'left',
                    },
                    {
                        id: 'y-axis-1',
                        position: 'right',
                        gridLines: {
                            color: 'rgba(255,0,0,0.3)',
                        },
                        ticks: {
                            fontColor: 'red',
                        }
                    }
                ]
            },
            annotation: {
                annotations: [
                    {
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x-axis-0',
                        value: 'March',
                        borderColor: 'orange',
                        borderWidth: 2,
                        label: {
                            enabled: true,
                            fontColor: 'orange',
                            content: 'LineAnno'
                        }
                    },
                ],
            },
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(255,0,0,0.3)',
                borderColor: 'red',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.lineChartPlugins = [chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_3__];
    }
    LineChartComponent.prototype.ngOnInit = function () {
    };
    LineChartComponent.prototype.randomize = function () {
        for (var i = 0; i < this.lineChartData.length; i++) {
            for (var j = 0; j < this.lineChartData[i].data.length; j++) {
                this.lineChartData[i].data[j] = this.generateNumber(i);
            }
        }
        this.chart.update();
    };
    LineChartComponent.prototype.generateNumber = function (i) {
        return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
    };
    // events
    LineChartComponent.prototype.chartClicked = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    LineChartComponent.prototype.chartHovered = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    LineChartComponent.prototype.hideOne = function () {
        var isHidden = this.chart.isDatasetHidden(1);
        this.chart.hideDataset(1, !isHidden);
    };
    LineChartComponent.prototype.pushOne = function () {
        var _this = this;
        this.lineChartData.forEach(function (x, i) {
            var num = _this.generateNumber(i);
            var data = x.data;
            data.push(num);
        });
        this.lineChartLabels.push("Label " + this.lineChartLabels.length);
    };
    LineChartComponent.prototype.changeColor = function () {
        this.lineChartColors[2].borderColor = 'green';
        this.lineChartColors[2].backgroundColor = "rgba(0, 255, 0, 0.3)";
    };
    LineChartComponent.prototype.changeLabel = function () {
        this.lineChartLabels[2] = ['1st Line', '2nd Line'];
        // this.chart.update();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(ng2_charts__WEBPACK_IMPORTED_MODULE_2__["BaseChartDirective"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_2__["BaseChartDirective"])
    ], LineChartComponent.prototype, "chart", void 0);
    LineChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-line-chart',
            template: __webpack_require__(/*! raw-loader!./line-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/line-chart/line-chart.component.html"),
            styles: [__webpack_require__(/*! ./line-chart.component.scss */ "./src/app/line-chart/line-chart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LineChartComponent);
    return LineChartComponent;
}());



/***/ }),

/***/ "./src/app/material/material.module.ts":
/*!*********************************************!*\
  !*** ./src/app/material/material.module.ts ***!
  \*********************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");









var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__["MatTabsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_5__["MatGridListModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableModule"],
            ],
            exports: [
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__["MatTabsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_5__["MatGridListModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableModule"],
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/pie-chart/pie-chart.component.scss":
/*!****************************************************!*\
  !*** ./src/app/pie-chart/pie-chart.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".chart {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3ZzL1dlYnN0b3JtUHJvamVjdHMvbmcyLWNoYXJ0cy9zcmMvYXBwL3BpZS1jaGFydC9waWUtY2hhcnQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BpZS1jaGFydC9waWUtY2hhcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9waWUtY2hhcnQvcGllLWNoYXJ0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNoYXJ0IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4iLCIuY2hhcnQge1xuICBkaXNwbGF5OiBibG9jaztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pie-chart/pie-chart.component.ts":
/*!**************************************************!*\
  !*** ./src/app/pie-chart/pie-chart.component.ts ***!
  \**************************************************/
/*! exports provided: PieChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieChartComponent", function() { return PieChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chartjs-plugin-datalabels */ "./node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js");
/* harmony import */ var chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2__);



var PieChartComponent = /** @class */ (function () {
    function PieChartComponent() {
        // Pie
        this.pieChartOptions = {
            responsive: true,
            legend: {
                position: 'top',
            },
            plugins: {
                datalabels: {
                    formatter: function (value, ctx) {
                        var label = ctx.chart.data.labels[ctx.dataIndex];
                        return label;
                    },
                },
            }
        };
        this.pieChartLabels = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
        this.pieChartData = [300, 500, 100];
        this.pieChartType = 'pie';
        this.pieChartLegend = true;
        this.pieChartPlugins = [chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_2__];
        this.pieChartColors = [
            {
                backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
            },
        ];
    }
    PieChartComponent.prototype.ngOnInit = function () {
    };
    // events
    PieChartComponent.prototype.chartClicked = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    PieChartComponent.prototype.chartHovered = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    PieChartComponent.prototype.changeLabels = function () {
        var words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
            'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
            'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
            'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
            'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
        var randomWord = function () { return words[Math.trunc(Math.random() * words.length)]; };
        this.pieChartLabels = Array.apply(null, { length: 3 }).map(function (_) { return randomWord(); });
    };
    PieChartComponent.prototype.addSlice = function () {
        this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
        this.pieChartData.push(400);
        this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
    };
    PieChartComponent.prototype.removeSlice = function () {
        this.pieChartLabels.pop();
        this.pieChartData.pop();
        this.pieChartColors[0].backgroundColor.pop();
    };
    PieChartComponent.prototype.changeLegendPosition = function () {
        this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
    };
    PieChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-pie-chart',
            template: __webpack_require__(/*! raw-loader!./pie-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/pie-chart/pie-chart.component.html"),
            styles: [__webpack_require__(/*! ./pie-chart.component.scss */ "./src/app/pie-chart/pie-chart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PieChartComponent);
    return PieChartComponent;
}());



/***/ }),

/***/ "./src/app/polar-area-chart/polar-area-chart.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/polar-area-chart/polar-area-chart.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvbGFyLWFyZWEtY2hhcnQvcG9sYXItYXJlYS1jaGFydC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/polar-area-chart/polar-area-chart.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/polar-area-chart/polar-area-chart.component.ts ***!
  \****************************************************************/
/*! exports provided: PolarAreaChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolarAreaChartComponent", function() { return PolarAreaChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PolarAreaChartComponent = /** @class */ (function () {
    function PolarAreaChartComponent() {
        // PolarArea
        this.polarAreaChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        this.polarAreaChartData = [300, 500, 100, 40, 120];
        this.polarAreaLegend = true;
        this.polarAreaChartType = 'polarArea';
    }
    PolarAreaChartComponent.prototype.ngOnInit = function () {
    };
    // events
    PolarAreaChartComponent.prototype.chartClicked = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    PolarAreaChartComponent.prototype.chartHovered = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    PolarAreaChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-polar-area-chart',
            template: __webpack_require__(/*! raw-loader!./polar-area-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/polar-area-chart/polar-area-chart.component.html"),
            styles: [__webpack_require__(/*! ./polar-area-chart.component.scss */ "./src/app/polar-area-chart/polar-area-chart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PolarAreaChartComponent);
    return PolarAreaChartComponent;
}());



/***/ }),

/***/ "./src/app/radar-chart/radar-chart.component.scss":
/*!********************************************************!*\
  !*** ./src/app/radar-chart/radar-chart.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JhZGFyLWNoYXJ0L3JhZGFyLWNoYXJ0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/radar-chart/radar-chart.component.ts":
/*!******************************************************!*\
  !*** ./src/app/radar-chart/radar-chart.component.ts ***!
  \******************************************************/
/*! exports provided: RadarChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadarChartComponent", function() { return RadarChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var RadarChartComponent = /** @class */ (function () {
    function RadarChartComponent() {
        // Radar
        this.radarChartOptions = {
            responsive: true,
        };
        this.radarChartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
        this.radarChartData = [
            { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
        ];
        this.radarChartType = 'radar';
    }
    RadarChartComponent.prototype.ngOnInit = function () {
    };
    // events
    RadarChartComponent.prototype.chartClicked = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    RadarChartComponent.prototype.chartHovered = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    RadarChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-radar-chart',
            template: __webpack_require__(/*! raw-loader!./radar-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/radar-chart/radar-chart.component.html"),
            styles: [__webpack_require__(/*! ./radar-chart.component.scss */ "./src/app/radar-chart/radar-chart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], RadarChartComponent);
    return RadarChartComponent;
}());



/***/ }),

/***/ "./src/app/scatter-chart/scatter-chart.component.scss":
/*!************************************************************!*\
  !*** ./src/app/scatter-chart/scatter-chart.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NjYXR0ZXItY2hhcnQvc2NhdHRlci1jaGFydC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/scatter-chart/scatter-chart.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/scatter-chart/scatter-chart.component.ts ***!
  \**********************************************************/
/*! exports provided: ScatterChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScatterChartComponent", function() { return ScatterChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ScatterChartComponent = /** @class */ (function () {
    function ScatterChartComponent() {
        // scatter
        this.scatterChartOptions = {
            responsive: true,
        };
        this.scatterChartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
        this.scatterChartData = [
            {
                data: [
                    { x: 1, y: 1 },
                    { x: 2, y: 3 },
                    { x: 3, y: -2 },
                    { x: 4, y: 4 },
                    { x: 5, y: -3 },
                ],
                label: 'Series A',
                pointRadius: 10,
            },
        ];
        this.scatterChartType = 'scatter';
    }
    ScatterChartComponent.prototype.ngOnInit = function () {
    };
    // events
    ScatterChartComponent.prototype.chartClicked = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    ScatterChartComponent.prototype.chartHovered = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    ScatterChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-scatter-chart',
            template: __webpack_require__(/*! raw-loader!./scatter-chart.component.html */ "./node_modules/raw-loader/index.js!./src/app/scatter-chart/scatter-chart.component.html"),
            styles: [__webpack_require__(/*! ./scatter-chart.component.scss */ "./src/app/scatter-chart/scatter-chart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ScatterChartComponent);
    return ScatterChartComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    base: '',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/vs/WebstormProjects/ng2-charts/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map