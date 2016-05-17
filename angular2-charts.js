webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23);


/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var charts_1 = __webpack_require__(44);
	__export(__webpack_require__(44));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    directives: [
	        charts_1.CHART_DIRECTIVES
	    ]
	};


/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(6);
	var BaseChartComponent = (function () {
	    function BaseChartComponent(element) {
	        this.labels = [];
	        this.options = { responsive: true };
	        this.chartClick = new core_1.EventEmitter();
	        this.chartHover = new core_1.EventEmitter();
	        this.initFlag = false;
	        this.element = element;
	    }
	    BaseChartComponent.prototype.ngOnInit = function () {
	        this.ctx = this.element.nativeElement.children[0].getContext('2d');
	        this.cvs = this.element.nativeElement.children[0];
	        this.parent = this.element.nativeElement;
	        this.initFlag = true;
	        if (this.data || this.datasets) {
	            this.refresh();
	        }
	    };
	    BaseChartComponent.prototype.ngOnChanges = function () {
	        if (this.initFlag) {
	            this.refresh();
	        }
	    };
	    BaseChartComponent.prototype.ngOnDestroy = function () {
	        if (this.chart) {
	            this.chart.destroy();
	            this.chart = void 0;
	        }
	    };
	    BaseChartComponent.prototype.getChartBuilder = function (ctx) {
	        var _this = this;
	        var datasets = void 0;
	        if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
	            if (Array.isArray(this.data[0])) {
	                datasets = this.data.map(function (data, index) {
	                    return { data: data, label: _this.labels[index] || "Label " + index };
	                });
	            }
	            else {
	                datasets = [{ data: this.data, label: "Label 0" }];
	            }
	        }
	        if (this.datasets && this.datasets.length ||
	            (datasets && datasets.length)) {
	            datasets = (this.datasets || datasets)
	                .map(function (elm, index) {
	                var newElm = Object.assign({}, elm);
	                if (_this.colors && _this.colors.length) {
	                    Object.assign(newElm, _this.colors[index]);
	                }
	                else {
	                    Object.assign(newElm, getColors(_this.chartType, index, newElm.data.length));
	                }
	                return newElm;
	            });
	        }
	        if (!datasets) {
	            throw new Error("ng-charts configuration error, \n      data or datasets field are required to render char " + this.chartType);
	        }
	        var options = Object.assign({}, this.options);
	        options.hover = options.hover || {};
	        if (!options.hover.onHover) {
	            options.hover.onHover = function (active) {
	                if (active && !active.length) {
	                    return;
	                }
	                _this.chartHover.emit({ active: active });
	            };
	        }
	        if (!options.onClick) {
	            options.onClick = function (event, active) {
	                _this.chartClick.emit({ event: event, active: active });
	            };
	        }
	        var opts = {
	            type: this.chartType,
	            data: {
	                labels: this.labels,
	                datasets: datasets
	            },
	            options: options
	        };
	        if (typeof Chart === 'undefined') {
	            throw new Error('ng2-charts configuration issue: Embedding Chart.js lib is mandatory');
	        }
	        return new Chart(ctx, opts);
	    };
	    BaseChartComponent.prototype.refresh = function () {
	        var _this = this;
	        if (this.options && this.options.responsive && this.parent.clientHeight === 0) {
	            return setTimeout(function () { return _this.refresh(); }, 50);
	        }
	        this.ngOnDestroy();
	        this.chart = this.getChartBuilder(this.ctx);
	    };
	    BaseChartComponent.defaultColors = [
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
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], BaseChartComponent.prototype, "data", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], BaseChartComponent.prototype, "datasets", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], BaseChartComponent.prototype, "labels", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], BaseChartComponent.prototype, "options", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], BaseChartComponent.prototype, "chartType", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], BaseChartComponent.prototype, "colors", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], BaseChartComponent.prototype, "legend", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], BaseChartComponent.prototype, "chartClick", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], BaseChartComponent.prototype, "chartHover", void 0);
	    BaseChartComponent = __decorate([
	        core_1.Component({
	            selector: 'base-chart',
	            template: "<canvas style=\"width: 100%; height: 100%;\"></canvas>",
	            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, common_1.NgClass]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], BaseChartComponent);
	    return BaseChartComponent;
	}());
	exports.BaseChartComponent = BaseChartComponent;
	function rgba(colour, alpha) {
	    return 'rgba(' + colour.concat(alpha).join(',') + ')';
	}
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
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
	function formatBarColor(colors) {
	    return {
	        backgroundColor: rgba(colors, 0.6),
	        borderColor: rgba(colors, 1),
	        hoverBackgroundColor: rgba(colors, 0.8),
	        hoverBorderColor: rgba(colors, 1)
	    };
	}
	function formatPieColors(colors) {
	    return {
	        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
	        borderColor: colors.map(function () { return '#fff'; }),
	        pointBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
	        pointBorderColor: colors.map(function () { return '#fff'; }),
	        pointHoverBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
	        pointHoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
	    };
	}
	function formatPolarAreaColors(colors) {
	    return {
	        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
	        borderColor: colors.map(function (color) { return rgba(color, 1); }),
	        hoverBackgroundColor: colors.map(function (color) { return rgba(color, 0.8); }),
	        hoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
	    };
	}
	function getRandomColor() {
	    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
	}
	function generateColor(index) {
	    return BaseChartComponent.defaultColors[index] || getRandomColor();
	}
	function generateColors(count) {
	    var colorsArr = new Array(count);
	    for (var i = 0; i < count; i++) {
	        colorsArr[i] = BaseChartComponent.defaultColors[i] || getRandomColor();
	    }
	    return colorsArr;
	}
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
	    if (chartType === 'bar') {
	        return formatBarColor(generateColor(index));
	    }
	    return generateColor(index);
	}
	exports.CHART_DIRECTIVES = [BaseChartComponent];


/***/ }

});
//# sourceMappingURL=angular2-charts.js.map