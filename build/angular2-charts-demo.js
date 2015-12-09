webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var index_1 = __webpack_require__(21);
	var w = window;
	if (w && w.__theme === 'bs4') {
	    index_1.Ng2ChartsConfig.theme = index_1.Ng2ChartsTheme.BS4;
	}
	var charts_section_1 = __webpack_require__(392);
	var demo_header_1 = __webpack_require__(400);
	var gettingStarted = __webpack_require__(368);
	var Demo = (function () {
	    function Demo() {
	        this.isBs3 = index_1.Ng2ChartsConfig.theme === index_1.Ng2ChartsTheme.BS3;
	    }
	    Demo = __decorate([
	        angular2_1.Component({
	            selector: 'app'
	        }),
	        angular2_1.View({
	            template: "\n  <demo-header>Loading header</demo-header>\n\n  <main class=\"bd-pageheader\">\n    <div class=\"container\">\n      <h1>ng2-charts</h1>\n      <p>Native Angular2 directives for Charts</p>\n      <a class=\"btn btn-primary\" href=\"https://github.com/valor-software/ng2-charts\">View on GitHub</a>\n      <div class=\"row\">\n        <!--<div class=\"col-lg-1\"><iframe src=\"https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-bootstrap&type=star&count=true\" frameborder=\"0\" scrolling=\"0\" width=\"170px\" height=\"20px\"></iframe></div>\n        <div class=\"col-lg-1\"><iframe src=\"https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-bootstrap&type=fork&count=true\" frameborder=\"0\" scrolling=\"0\" width=\"170px\" height=\"20px\"></iframe></div>-->\n      </div>\n    </div>\n  </main>\n\n  <div class=\"container\">\n    <div class=\"col-md-12 card card-block panel panel-default\">\n      <selection>\n          <h1>ng2-charts available with:\n          <a class=\"btn btn-default btn-secondary btn-lg\" [ng-class]=\"{active: isBs3}\" href=\"./\">Bootstrap 3</a>\n          <a class=\"btn btn-default btn-secondary btn-lg\" [ng-class]=\"{active: !isBs3}\" href=\"./index-bs4.html\">Bootstrap 4</a>\n          </h1>\n      </selection>\n    </div>\n    <br>\n    <section id=\"getting-started\">" + gettingStarted + "</section>\n\n    <charts-section class=\"col-md-12\"></charts-section>\n  </div>\n\n  </div>\n  <footer class=\"footer\">\n    <div class=\"container\">\n      <p class=\"text-muted text-center\"><a href=\"https://github.com/valor-software/ng2-charts\">ng2-charts</a> is maintained by <a href=\"https://github.com/valor-software\">valor-software</a>.</p>\n    </div>\n  </footer>\n  ",
	            directives: [
	                angular2_1.NgClass,
	                demo_header_1.DemoHeader,
	                charts_section_1.ChartsSection
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Demo);
	    return Demo;
	})();
	exports.Demo = Demo;
	angular2_1.bootstrap(Demo);


/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(125));
	__export(__webpack_require__(126));


/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var dropdown_service_1 = __webpack_require__(208);
	var Dropdown = (function () {
	    function Dropdown(el) {
	        this.el = el;
	        this.onToggle = new angular2_1.EventEmitter();
	    }
	    Dropdown.prototype.onInit = function () {
	        this.autoClose = this.autoClose || dropdown_service_1.ALWAYS;
	        this.keyboardNav = typeof this.keyboardNav !== 'undefined';
	        this.dropdownAppendToBody = typeof this.dropdownAppendToBody !== 'undefined';
	        if (this.isOpen) {
	        }
	    };
	    Dropdown.prototype.onDestroy = function () {
	        if (this.dropdownAppendToBody && this.menuEl) {
	            this.menuEl.nativeElement.remove();
	        }
	    };
	    Object.defineProperty(Dropdown.prototype, "dropDownMenu", {
	        set: function (dropdownMenu) {
	            this.menuEl = dropdownMenu.el;
	            if (dropdownMenu.templateUrl) {
	                this.dropdownMenuTemplateUrl = dropdownMenu.templateUrl;
	            }
	            if (this.dropdownAppendToBody) {
	                window.document.body.appendChild(this.menuEl.nativeElement);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Dropdown.prototype, "dropDownToggle", {
	        set: function (dropdownToggle) {
	            this.toggleEl = dropdownToggle.el;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Dropdown.prototype.toggle = function (open) {
	        return this.isOpen = arguments.length ? !!open : !this.isOpen;
	    };
	    Object.defineProperty(Dropdown.prototype, "isOpen", {
	        get: function () {
	            return this._isOpen;
	        },
	        set: function (value) {
	            this._isOpen = !!value;
	            if (this.dropdownAppendToBody && this.menuEl) {
	            }
	            if (this.isOpen) {
	                if (this.dropdownMenuTemplateUrl) {
	                }
	                this.focusToggleElement();
	                dropdown_service_1.dropdownService.open(this);
	            }
	            else {
	                if (this.dropdownMenuTemplateUrl) {
	                }
	                dropdown_service_1.dropdownService.close(this);
	                this.selectedOption = null;
	            }
	            this.onToggle.next(this.isOpen);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Dropdown.prototype.focusDropdownEntry = function (keyCode) {
	        var hostEl = this.menuEl ?
	            this.menuEl.nativeElement :
	            this.el.nativeElement.getElementsByTagName('ul')[0];
	        if (!hostEl) {
	            return;
	        }
	        var elems = hostEl.getElementsByTagName('a');
	        if (!elems || !elems.length) {
	            return;
	        }
	        switch (keyCode) {
	            case (40):
	                if (typeof this.selectedOption !== 'number') {
	                    this.selectedOption = 0;
	                    break;
	                }
	                if (this.selectedOption === elems.length - 1) {
	                    break;
	                }
	                this.selectedOption++;
	                break;
	            case (38):
	                if (typeof this.selectedOption !== 'number') {
	                    return;
	                }
	                if (this.selectedOption === 0) {
	                    break;
	                }
	                this.selectedOption--;
	                break;
	        }
	        elems[this.selectedOption].focus();
	    };
	    Dropdown.prototype.focusToggleElement = function () {
	        if (this.toggleEl) {
	            this.toggleEl.nativeElement.focus();
	        }
	    };
	    Dropdown = __decorate([
	        angular2_1.Directive({
	            selector: '[dropdown]',
	            properties: ['isOpen', 'autoClose', 'keyboardNav', 'dropdownAppendToBody'],
	            events: ['onToggle'],
	            host: {
	                '[class.dropdown]': 'true',
	                '[class.open]': 'isOpen'
	            }
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef])
	    ], Dropdown);
	    return Dropdown;
	})();
	exports.Dropdown = Dropdown;


/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var Charts = (function () {
	    function Charts(element) {
	    }
	    Charts = __decorate([
	        angular2_1.Component({
	            selector: 'chart, canvas[chart]'
	        }),
	        angular2_1.View({
	            template: "\n  <canvas></canvas>\n  ",
	            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.NgClass]
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef])
	    ], Charts);
	    return Charts;
	})();
	exports.Charts = Charts;
	var BaseChart = (function () {
	    function BaseChart(element) {
	        this.element = element;
	        this._data = [];
	        this.labels = [];
	        this.options = { responsive: true };
	        this.series = [];
	        this.colours = [];
	        this.initFlag = false;
	        this.chartClick = new angular2_1.EventEmitter();
	        this.chartHover = new angular2_1.EventEmitter();
	        this.defaultsColours = [
	            {
	                fillColor: 'rgba(151,187,205,0.2)',
	                strokeColor: 'rgba(151,187,205,1)',
	                pointColor: 'rgba(151,187,205,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(151,187,205,0.8)',
	                color: 'rgba(151,187,205,1)',
	                highlight: 'rgba(151,187,205,0.8)'
	            }, {
	                fillColor: 'rgba(220,220,220,0.2)',
	                strokeColor: 'rgba(220,220,220,1)',
	                pointColor: 'rgba(220,220,220,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(220,220,220,0.8)',
	                color: 'rgba(220,220,220,1)',
	                highlight: 'rgba(220,220,220,0.8)'
	            }, {
	                fillColor: 'rgba(247,70,74,0.2)',
	                strokeColor: 'rgba(247,70,74,1)',
	                pointColor: 'rgba(247,70,74,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(247,70,74,0.8)',
	                color: 'rgba(247,70,74,1)',
	                highlight: 'rgba(247,70,74,0.8)'
	            }, {
	                fillColor: 'rgba(70,191,189,0.2)',
	                strokeColor: 'rgba(70,191,189,1)',
	                pointColor: 'rgba(70,191,189,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(70,191,189,0.8)',
	                color: 'rgba(70,191,189,1)',
	                highlight: 'rgba(70,191,189,0.8)'
	            }, {
	                fillColor: 'rgba(253,180,92,0.2)',
	                strokeColor: 'rgba(253,180,92,1)',
	                pointColor: 'rgba(253,180,92,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(253,180,92,0.8)',
	                color: 'rgba(253,180,92,1)',
	                highlight: 'rgba(253,180,92,0.8)'
	            }, {
	                fillColor: 'rgba(148,159,177,0.2)',
	                strokeColor: 'rgba(148,159,177,1)',
	                pointColor: 'rgba(148,159,177,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(148,159,177,0.8)',
	                color: 'rgba(148,159,177,1)',
	                highlight: 'rgba(148,159,177,0.8)'
	            }, {
	                fillColor: 'rgba(77,83,96,0.2)',
	                strokeColor: 'rgba(77,83,96,1)',
	                pointColor: 'rgba(77,83,96,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(77,83,96,0.8)',
	                color: 'rgba(77,83,96,1)',
	                highlight: 'rgba(77,83,96,0.8)'
	            }];
	    }
	    BaseChart.prototype.onInit = function () {
	        this.ctx = this.element.nativeElement.children[0].getContext('2d');
	        this.cvs = this.element.nativeElement.children[0];
	        this.parent = this.element.nativeElement;
	        this.refresh();
	        this.initFlag = true;
	    };
	    BaseChart.prototype.onDestroy = function () {
	        if (this.chart) {
	            this.chart.destroy();
	            this.chart = null;
	        }
	        if (this.legendTemplate) {
	            this.legendTemplate.destroy();
	            this.legendTemplate = null;
	        }
	    };
	    Object.defineProperty(BaseChart.prototype, "data", {
	        get: function () {
	            return this._data;
	        },
	        set: function (value) {
	            this._data = value;
	            if (this.initFlag && this._data && this._data.length > 0) {
	                this.refresh();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseChart.prototype, "chartType", {
	        get: function () {
	            return this._chartType;
	        },
	        set: function (value) {
	            this._chartType = value;
	            if (this.initFlag && this._chartType && this._chartType.length > 0) {
	                this.refresh();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BaseChart.prototype.setLegend = function () {
	        var list = this.parent.getElementsByTagName('ul');
	        if (list.length) {
	            list[0].remove();
	            this.parent.insertAdjacentHTML('beforeend', this.chart.generateLegend());
	        }
	        else {
	            this.parent.insertAdjacentHTML('beforeend', this.chart.generateLegend());
	        }
	    };
	    BaseChart.prototype.getColour = function (colour) {
	        return {
	            fillColor: this.rgba(colour, 0.2),
	            strokeColor: this.rgba(colour, 1),
	            pointColor: this.rgba(colour, 1),
	            pointStrokeColor: '#fff',
	            pointHighlightFill: '#fff',
	            pointHighlightStroke: this.rgba(colour, 0.8),
	            color: this.rgba(colour, 1),
	            highlight: this.rgba(colour, 0.8)
	        };
	    };
	    BaseChart.prototype.getRandomInt = function (min, max) {
	        return Math.floor(Math.random() * (max - min + 1)) + min;
	    };
	    BaseChart.prototype.rgba = function (colour, alpha) {
	        return 'rgba(' + colour.concat(alpha).join(',') + ')';
	    };
	    BaseChart.prototype.click = function (evt) {
	        var atEvent = this.chart.getPointsAtEvent || this.chart.getBarsAtEvent || this.chart.getSegmentsAtEvent;
	        var activePoints = atEvent.call(this.chart, evt);
	        if (activePoints.length > 0) {
	            var activeLabel = activePoints[0].label;
	            this.chartClick.next({ activePoints: activePoints, activeLabel: activeLabel });
	        }
	        else {
	            console.log('not point');
	        }
	    };
	    BaseChart.prototype.hover = function (evt) {
	        var atEvent = this.chart.getPointsAtEvent || this.chart.getBarsAtEvent || this.chart.getSegmentsAtEvent;
	        var activePoints = atEvent.call(this.chart, evt);
	        if (activePoints.length > 0) {
	            var activeLabel = activePoints[0].label;
	            var activePoint = activePoints[0].value;
	            this.chartClick.next({ activePoints: activePoints, activePoint: activePoint, activeLabel: activeLabel });
	        }
	        else {
	            console.log('not point');
	        }
	    };
	    BaseChart.prototype.getChartBuilder = function (ctx, data, options) {
	        return new Chart(ctx)[this.chartType](data, options);
	    };
	    BaseChart.prototype.getDataObject = function (label, value) {
	        if (this.chartType === 'Line'
	            || this.chartType === 'Bar'
	            || this.chartType === 'Radar') {
	            return {
	                label: label,
	                data: value
	            };
	        }
	        if (this.chartType === 'Pie'
	            || this.chartType === 'Doughnut'
	            || this.chartType === 'PolarArea') {
	            return {
	                label: label,
	                value: value
	            };
	        }
	        return null;
	    };
	    BaseChart.prototype.getChartData = function (labels, dataObject) {
	        if (this.chartType === 'Line'
	            || this.chartType === 'Bar'
	            || this.chartType === 'Radar') {
	            return {
	                labels: labels,
	                datasets: dataObject
	            };
	        }
	        if (this.chartType === 'Pie'
	            || this.chartType === 'Doughnut'
	            || this.chartType === 'PolarArea') {
	            return dataObject;
	        }
	    };
	    BaseChart.prototype.refresh = function () {
	        this.onDestroy();
	        var dataset = [];
	        for (var i = 0; i < this.data.length; i++) {
	            var colourDesc = [this.getRandomInt(0, 255), this.getRandomInt(0, 255), this.getRandomInt(0, 255)];
	            var colour = i < this.colours.length ? this.colours[i] : this.defaultsColours[i] || this.getColour(colourDesc);
	            var data_1 = Object.assign(colour, this.getDataObject(this.series[i] || this.labels[i], this.data[i]));
	            dataset.push(data_1);
	        }
	        var data = this.getChartData(this.labels, dataset);
	        this.chart = this.getChartBuilder(this.ctx, data, this.options);
	        if (this.legend) {
	            this.setLegend();
	        }
	    };
	    BaseChart = __decorate([
	        angular2_1.Component({
	            selector: 'base-chart',
	            properties: [
	                'data',
	                'labels',
	                'series',
	                'colours',
	                'chartType',
	                'legend',
	                'options'
	            ],
	            events: ['chartClick', 'chartHover']
	        }),
	        angular2_1.View({
	            template: "\n  <canvas style=\"width: 100%; height: 100%;\" (^click)=\"click($event)\" (mousemove)=\"hover($event)\"></canvas>\n  ",
	            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, angular2_1.NgClass]
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef])
	    ], BaseChart);
	    return BaseChart;
	})();
	exports.BaseChart = BaseChart;
	exports.charts = [Charts, BaseChart];


/***/ },

/***/ 126:
/***/ function(module, exports) {

	(function (Ng2ChartsTheme) {
	    Ng2ChartsTheme[Ng2ChartsTheme["BS3"] = 1] = "BS3";
	    Ng2ChartsTheme[Ng2ChartsTheme["BS4"] = 2] = "BS4";
	})(exports.Ng2ChartsTheme || (exports.Ng2ChartsTheme = {}));
	var Ng2ChartsTheme = exports.Ng2ChartsTheme;
	var Ng2ChartsConfig = (function () {
	    function Ng2ChartsConfig() {
	    }
	    Object.defineProperty(Ng2ChartsConfig, "theme", {
	        get: function () {
	            var w = window;
	            if (w && w.__theme === 'bs4') {
	                return Ng2ChartsTheme.BS4;
	            }
	            return (this._theme || Ng2ChartsTheme.BS3);
	        },
	        set: function (v) {
	            this._theme = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Ng2ChartsConfig;
	})();
	exports.Ng2ChartsConfig = Ng2ChartsConfig;


/***/ },

/***/ 127:
/***/ function(module, exports) {

	(function (Ng2BootstrapTheme) {
	    Ng2BootstrapTheme[Ng2BootstrapTheme["BS3"] = 1] = "BS3";
	    Ng2BootstrapTheme[Ng2BootstrapTheme["BS4"] = 2] = "BS4";
	})(exports.Ng2BootstrapTheme || (exports.Ng2BootstrapTheme = {}));
	var Ng2BootstrapTheme = exports.Ng2BootstrapTheme;
	var Ng2BootstrapConfig = (function () {
	    function Ng2BootstrapConfig() {
	    }
	    Object.defineProperty(Ng2BootstrapConfig, "theme", {
	        get: function () {
	            var w = window;
	            if (w && w.__theme === 'bs4') {
	                return Ng2BootstrapTheme.BS4;
	            }
	            return (this._theme || Ng2BootstrapTheme.BS3);
	        },
	        set: function (v) {
	            this._theme = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Ng2BootstrapConfig;
	})();
	exports.Ng2BootstrapConfig = Ng2BootstrapConfig;


/***/ },

/***/ 128:
/***/ function(module, exports) {

	var PositionService = (function () {
	    function PositionService() {
	    }
	    Object.defineProperty(PositionService.prototype, "window", {
	        get: function () {
	            return window;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PositionService.prototype, "document", {
	        get: function () {
	            return window.document;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PositionService.prototype.getStyle = function (nativeEl, cssProp) {
	        if (nativeEl.currentStyle) {
	            return nativeEl.currentStyle[cssProp];
	        }
	        if (this.window.getComputedStyle) {
	            return this.window.getComputedStyle(nativeEl)[cssProp];
	        }
	        return nativeEl.style[cssProp];
	    };
	    PositionService.prototype.isStaticPositioned = function (nativeEl) {
	        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
	    };
	    PositionService.prototype.parentOffsetEl = function (nativeEl) {
	        var offsetParent = nativeEl.offsetParent || this.document;
	        while (offsetParent && offsetParent !== this.document &&
	            this.isStaticPositioned(offsetParent)) {
	            offsetParent = offsetParent.offsetParent;
	        }
	        return offsetParent || this.document;
	    };
	    ;
	    PositionService.prototype.position = function (nativeEl) {
	        var elBCR = this.offset(nativeEl);
	        var offsetParentBCR = { top: 0, left: 0 };
	        var offsetParentEl = this.parentOffsetEl(nativeEl);
	        if (offsetParentEl !== this.document) {
	            offsetParentBCR = this.offset(offsetParentEl);
	            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
	            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
	        }
	        var boundingClientRect = nativeEl.getBoundingClientRect();
	        return {
	            width: boundingClientRect.width || nativeEl.offsetWidth,
	            height: boundingClientRect.height || nativeEl.offsetHeight,
	            top: elBCR.top - offsetParentBCR.top,
	            left: elBCR.left - offsetParentBCR.left
	        };
	    };
	    PositionService.prototype.offset = function (nativeEl) {
	        var boundingClientRect = nativeEl.getBoundingClientRect();
	        return {
	            width: boundingClientRect.width || nativeEl.offsetWidth,
	            height: boundingClientRect.height || nativeEl.offsetHeight,
	            top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop),
	            left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft)
	        };
	    };
	    PositionService.prototype.positionElements = function (hostEl, targetEl, positionStr, appendToBody) {
	        var positionStrParts = positionStr.split('-');
	        var pos0 = positionStrParts[0];
	        var pos1 = positionStrParts[1] || 'center';
	        var hostElPos = appendToBody ?
	            this.offset(hostEl) :
	            this.position(hostEl);
	        var targetElWidth = targetEl.offsetWidth;
	        var targetElHeight = targetEl.offsetHeight;
	        var shiftWidth = {
	            center: function () {
	                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
	            },
	            left: function () {
	                return hostElPos.left;
	            },
	            right: function () {
	                return hostElPos.left + hostElPos.width;
	            }
	        };
	        var shiftHeight = {
	            center: function () {
	                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
	            },
	            top: function () {
	                return hostElPos.top;
	            },
	            bottom: function () {
	                return hostElPos.top + hostElPos.height;
	            }
	        };
	        var targetElPos;
	        switch (pos0) {
	            case 'right':
	                targetElPos = {
	                    top: shiftHeight[pos1](),
	                    left: shiftWidth[pos0]()
	                };
	                break;
	            case 'left':
	                targetElPos = {
	                    top: shiftHeight[pos1](),
	                    left: hostElPos.left - targetElWidth
	                };
	                break;
	            case 'bottom':
	                targetElPos = {
	                    top: shiftHeight[pos0](),
	                    left: shiftWidth[pos1]()
	                };
	                break;
	            default:
	                targetElPos = {
	                    top: hostElPos.top - targetElHeight,
	                    left: shiftWidth[pos1]()
	                };
	                break;
	        }
	        return targetElPos;
	    };
	    return PositionService;
	})();
	exports.PositionService = PositionService;
	exports.positionService = new PositionService();


/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var Collapse = (function () {
	    function Collapse(el) {
	        this.el = el;
	        this.test = 'wtf';
	        this.isExpanded = true;
	        this.isCollapsed = false;
	        this.isCollapse = true;
	        this.isCollapsing = false;
	    }
	    Object.defineProperty(Collapse.prototype, "collapse", {
	        get: function () {
	            return this.isExpanded;
	        },
	        set: function (value) {
	            this.isExpanded = value;
	            this.toggle();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Collapse.prototype.toggle = function () {
	        if (this.isExpanded) {
	            this.hide();
	        }
	        else {
	            this.show();
	        }
	    };
	    Collapse.prototype.hide = function () {
	        var _this = this;
	        this.isCollapse = false;
	        this.isCollapsing = true;
	        this.isExpanded = false;
	        this.isCollapsed = true;
	        setTimeout(function () {
	            _this.height = '0';
	            _this.isCollapse = true;
	            _this.isCollapsing = false;
	        }, 4);
	    };
	    Collapse.prototype.show = function () {
	        var _this = this;
	        this.isCollapse = false;
	        this.isCollapsing = true;
	        this.isExpanded = true;
	        this.isCollapsed = false;
	        setTimeout(function () {
	            _this.height = 'auto';
	            _this.isCollapse = true;
	            _this.isCollapsing = false;
	        }, 4);
	    };
	    Collapse = __decorate([
	        angular2_1.Directive({
	            selector: '[collapse]',
	            properties: ['collapse'],
	            host: {
	                '[class.in]': 'isExpanded',
	                '[class.collapse]': 'isCollapse',
	                '[class.collapsing]': 'isCollapsing',
	                '[attr.aria-expanded]': 'isExpanded',
	                '[attr.aria-hidden]': 'isCollapsed',
	                '[style.height]': 'height'
	            }
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef])
	    ], Collapse);
	    return Collapse;
	})();
	exports.Collapse = Collapse;


/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(6);
	var NgTransclude = (function () {
	    function NgTransclude(viewRef) {
	        this.viewRef = viewRef;
	    }
	    Object.defineProperty(NgTransclude.prototype, "ngTransclude", {
	        get: function () {
	            return this._ngTransclude;
	        },
	        set: function (templateRef) {
	            this._ngTransclude = templateRef;
	            if (templateRef) {
	                this.viewRef.createEmbeddedView(templateRef);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    NgTransclude = __decorate([
	        angular2_1.Directive({
	            selector: '[ng-transclude]',
	            properties: ['ngTransclude']
	        }),
	        __param(0, angular2_1.Inject(angular2_1.ViewContainerRef)), 
	        __metadata('design:paramtypes', [angular2_1.ViewContainerRef])
	    ], NgTransclude);
	    return NgTransclude;
	})();
	exports.NgTransclude = NgTransclude;


/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(6);
	var dropdown_1 = __webpack_require__(75);
	var DropdownMenu = (function () {
	    function DropdownMenu(dropdown, el) {
	        this.dropdown = dropdown;
	        this.el = el;
	    }
	    DropdownMenu.prototype.onInit = function () {
	        this.dropdown.dropDownMenu = this;
	    };
	    DropdownMenu = __decorate([
	        angular2_1.Directive({
	            selector: '[dropdown-menu], .dropdown-menu',
	            properties: ['templateUrl']
	        }),
	        __param(0, angular2_1.Host()), 
	        __metadata('design:paramtypes', [dropdown_1.Dropdown, angular2_1.ElementRef])
	    ], DropdownMenu);
	    return DropdownMenu;
	})();
	exports.DropdownMenu = DropdownMenu;


/***/ },

/***/ 208:
/***/ function(module, exports) {

	exports.ALWAYS = 'always';
	exports.DISABLED = 'disabled';
	exports.OUTSIDECLICK = 'outsideClick';
	var DropdownService = (function () {
	    function DropdownService() {
	        this.closeDropdownBind = this.closeDropdown.bind(this);
	        this.keybindFilterBind = this.keybindFilter.bind(this);
	    }
	    DropdownService.prototype.open = function (dropdownScope) {
	        if (!this.openScope) {
	            window.document.addEventListener('click', this.closeDropdownBind);
	            window.document.addEventListener('keydown', this.keybindFilterBind);
	        }
	        if (this.openScope && this.openScope !== this.dropdownScope) {
	            this.openScope.isOpen = false;
	        }
	        this.openScope = dropdownScope;
	    };
	    DropdownService.prototype.close = function (dropdownScope) {
	        if (this.openScope !== dropdownScope) {
	            return;
	        }
	        this.openScope = null;
	        window.document.removeEventListener('click', this.closeDropdownBind);
	        window.document.removeEventListener('keydown', this.keybindFilterBind);
	    };
	    DropdownService.prototype.closeDropdown = function (event) {
	        if (!this.openScope) {
	            return;
	        }
	        if (event && this.openScope.autoClose === exports.DISABLED) {
	            return;
	        }
	        if (event && this.openScope.toggleEl &&
	            this.openScope.toggleEl.nativeElement === event.target) {
	            return;
	        }
	        if (event && this.openScope.autoClose === exports.OUTSIDECLICK &&
	            this.openScope.menuEl &&
	            this.openScope.menuEl.nativeElement === event.target) {
	            return;
	        }
	        this.openScope.isOpen = false;
	    };
	    DropdownService.prototype.keybindFilter = function (event) {
	        if (event.which === 27) {
	            this.openScope.focusToggleElement();
	            this.closeDropdown(null);
	            return;
	        }
	        if (this.openScope.keyboardNav && this.openScope.isOpen &&
	            (event.which === 38 || event.which === 40)) {
	            event.preventDefault();
	            event.stopPropagation();
	            this.openScope.focusDropdownEntry(event.which);
	        }
	    };
	    return DropdownService;
	})();
	exports.DropdownService = DropdownService;
	exports.dropdownService = new DropdownService();


/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(6);
	var dropdown_1 = __webpack_require__(75);
	var DropdownToggle = (function () {
	    function DropdownToggle(dropdown, el) {
	        this.dropdown = dropdown;
	        this.el = el;
	        this.disabled = false;
	    }
	    DropdownToggle.prototype.onInit = function () {
	        this.dropdown.dropDownToggle = this;
	    };
	    Object.defineProperty(DropdownToggle.prototype, "isOpen", {
	        get: function () {
	            return this.dropdown.isOpen;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DropdownToggle.prototype.toggleDropdown = function (event) {
	        event.preventDefault();
	        event.stopPropagation();
	        if (!this.disabled) {
	            this.dropdown.toggle();
	        }
	    };
	    DropdownToggle = __decorate([
	        angular2_1.Directive({
	            selector: '[dropdown-toggle]',
	            properties: ['disabled'],
	            host: {
	                '(click)': 'toggleDropdown($event)',
	                '[class.dropdown-toggle]': 'true',
	                '[class.disabled]': 'disabled',
	                '[attr.aria-haspopup]': 'true',
	                '[attr.aria-expanded]': 'isOpen'
	            }
	        }),
	        __param(0, angular2_1.Host()), 
	        __metadata('design:paramtypes', [dropdown_1.Dropdown, angular2_1.ElementRef])
	    ], DropdownToggle);
	    return DropdownToggle;
	})();
	exports.DropdownToggle = DropdownToggle;


/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(401));
	__export(__webpack_require__(402));
	__export(__webpack_require__(404));
	__export(__webpack_require__(403));
	__export(__webpack_require__(406));
	__export(__webpack_require__(75));
	__export(__webpack_require__(207));
	__export(__webpack_require__(208));
	__export(__webpack_require__(209));
	__export(__webpack_require__(405));
	__export(__webpack_require__(205));
	__export(__webpack_require__(407));
	__export(__webpack_require__(408));
	__export(__webpack_require__(409));
	__export(__webpack_require__(410));
	__export(__webpack_require__(411));
	__export(__webpack_require__(412));
	__export(__webpack_require__(413));
	__export(__webpack_require__(128));
	__export(__webpack_require__(206));
	__export(__webpack_require__(127));


/***/ },

/***/ 367:
/***/ function(module, exports) {

	module.exports = "<h3 id=\"usage\">Usage</h3>\n<pre class=\"language-typescript\"><code class=\"language-typescript\"><span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>charts<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'ng2-charts'</span><span class=\"token punctuation\" >;</span>\n</code></pre>\n<h1 id=\"utilisation\">Utilisation</h1>\n<p>There are directive: <code>base-chart</code>, and there are 6 types of charts: , <code>Line</code>, <code>Bar</code>, <code>Radar</code>, <code>Pie</code>, <code>PolarArea</code>, <code>Doughnut</code>.</p>\n<h3 id=\"properties\">Properties</h3>\n<ul>\n<li><code>data</code> (<code>Array&lt;any&gt;</code>) -  set of points of the chart, it should be Array&lt;Array&lt;number&gt;&gt; only for line, bar and radar, otherwise Array&lt;number&gt;</li>\n<li><code>labels</code> (<code>?Array&lt;any&gt;</code>) - x axis labels. It&#39;s necessary for charts: line, bar and radar. And just labels (on hover) for charts: polar area, pie and doughnut</li>\n<li><code>chart-type</code> (<code>?string</code>) - indicates the type of charts, it can be: &#39;Line&#39;, &#39;Bar&#39;, &#39;Radar&#39;, &#39;Pie&#39;, &#39;PolarArea&#39;, &#39;Doughnut&#39;</li>\n<li><code>options</code> (<code>?any</code>) - chart options (as from <a href=\"http://www.chartjs.org/docs/\">Chart.js documentation</a>)</li>\n<li><code>series</code> (<code>?Array&lt;any&gt;</code>) - name points on the chart, work for line, bar and radar</li>\n<li><code>colours</code> (<code>?Array&lt;any&gt;</code>) - data colours, will use default colours if not specified (see below)</li>\n<li><code>legend</code>: (<code>?boolean=false</code>) - if true show legend below the chart, otherwise not be shown</li>\n</ul>\n<h3 id=\"events\">Events</h3>\n<ul>\n<li><code>chart-click</code>: fires when click on a chart has occurred, returns information regarding active points and labels</li>\n<li><code>chart-hover</code>: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels</li>\n</ul>\n<h2 id=\"colours\">Colours</h2>\n<p>There are a set of 7 default colours. Colours can be replaced using the <code>colours</code> attribute.\nIf there is more data than colours, colours are generated randomly or can be provided\nvia a function through the <code>getColour</code> attribute.</p>\n<p>Hex colours are converted to Chart.js colours automatically,\nincluding different shades for highlight, fill, stroke, etc.</p>\n";

/***/ },

/***/ 368:
/***/ function(module, exports) {

	module.exports = "<h1 id=\"getting-started\">Getting started</h1>\n<h3 id=\"first-of-all-welcome-\">First of all, Welcome!</h3>\n";

/***/ },

/***/ 369:
/***/ function(module, exports) {

	module.exports = "<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>base-chart</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chart<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >[data]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>barChartData<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >[labels]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>barChartLabels<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >[options]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>barChartOptions<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >[series]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>barChartSeries<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >[legend]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>barChartLegend<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >[series]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>barChartSeries<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >[chart-type]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>barChartType<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >(chart-hover)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartHovered($event)<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >(chart-click)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartClicked($event)<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span><span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>base-chart</span><span class=\"token punctuation\" >></span></span>\n"

/***/ },

/***/ 370:
/***/ function(module, exports) {

	module.exports = "  <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>div</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>col-md-6<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>\n\n    <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>base-chart</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chart<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[data]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartData<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[labels]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartLabels<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[options]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartOptions<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[series]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartSeries<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[chart-type]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartType<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >(chart-hover)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartHovered($event)<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >(chart-click)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartClicked($event)<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span><span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>base-chart</span><span class=\"token punctuation\" >></span></span>\n  <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>div</span><span class=\"token punctuation\" >></span></span>\n  <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>div</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>col-md-6<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>\n    <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>base-chart</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chart<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[data]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>pieChartData<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[labels]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>pieChartLabels<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[chart-type]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>pieChartType<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >(chart-hover)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartHovered($event)<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >(chart-click)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartClicked($event)<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span><span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>base-chart</span><span class=\"token punctuation\" >></span></span>\n  <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>div</span><span class=\"token punctuation\" >></span></span>\n  <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>div</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>col-md-12 text-center<span class=\"token punctuation\" >\"</span></span><span class=\"token style-attr language-css\" ><span class=\"token attr-name\" > <span class=\"token attr-name\" >style</span></span><span class=\"token punctuation\" >=\"</span><span class=\"token attr-value\" ><span class=\"token property\" >margin-top</span><span class=\"token punctuation\" >:</span> 10px<span class=\"token punctuation\" >;</span></span><span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>\n    <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>button</span> <span class=\"token attr-name\" >(click)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>randomizeType()<span class=\"token punctuation\" >\"</span></span><span class=\"token style-attr language-css\" ><span class=\"token attr-name\" > <span class=\"token attr-name\" >style</span></span><span class=\"token punctuation\" >=\"</span><span class=\"token attr-value\" ><span class=\"token property\" >display</span><span class=\"token punctuation\" >:</span> inline-block</span><span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>Toggle<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>button</span><span class=\"token punctuation\" >></span></span>\n  <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>div</span><span class=\"token punctuation\" >></span></span>\n\n\n"

/***/ },

/***/ 371:
/***/ function(module, exports) {

	module.exports = "<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>base-chart</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chart<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[data]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>doughnutChartData<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[labels]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>doughnutChartLabels<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[chart-type]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>doughnutChartType<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >(chart-hover)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartHovered($event)<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >(chart-click)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartClicked($event)<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span><span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>base-chart</span><span class=\"token punctuation\" >></span></span>\n"

/***/ },

/***/ 372:
/***/ function(module, exports) {

	module.exports = "<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>div</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>row<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>\n  <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>div</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>col-md-6<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>\n    <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>base-chart</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chart<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[data]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartData<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[labels]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartLabels<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[options]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartOptions<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[series]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartSeries<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[colours]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartColours<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[chart-type]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartType<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >[legend]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>lineChartLegend<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >(chart-hover)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartHovered($event)<span class=\"token punctuation\" >\"</span></span>\n                <span class=\"token attr-name\" >(chart-click)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartClicked($event)<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span><span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>base-chart</span><span class=\"token punctuation\" >></span></span>\n  <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>div</span><span class=\"token punctuation\" >></span></span>\n  <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>div</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>col-md-6<span class=\"token punctuation\" >\"</span></span><span class=\"token style-attr language-css\" ><span class=\"token attr-name\" > <span class=\"token attr-name\" >style</span></span><span class=\"token punctuation\" >=\"</span><span class=\"token attr-value\" ><span class=\"token property\" >margin-bottom</span><span class=\"token punctuation\" >:</span> 10px<span class=\"token punctuation\" >;</span></span><span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>\n    <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>table</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>table table-responsive table-condensed<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>\n      <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>tr</span><span class=\"token punctuation\" >></span></span>\n        <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>th</span> <span class=\"token attr-name\" >*ng-for</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>#label of lineChartLabels<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>{{label}}<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>th</span><span class=\"token punctuation\" >></span></span>\n      <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>tr</span><span class=\"token punctuation\" >></span></span>\n      <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>tr</span> <span class=\"token attr-name\" >*ng-for</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>#d of lineChartData<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>\n        <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>td</span> <span class=\"token attr-name\" >*ng-for</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>#label of lineChartLabels; #j<span class=\"token punctuation\" >=</span>index<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>{{d[j]}}<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>td</span><span class=\"token punctuation\" >></span></span>\n      <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>tr</span><span class=\"token punctuation\" >></span></span>\n    <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>table</span><span class=\"token punctuation\" >></span></span>\n    <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>button</span> <span class=\"token attr-name\" >(click)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>randomize()<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span>CLICK<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>button</span><span class=\"token punctuation\" >></span></span>\n  <span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>div</span><span class=\"token punctuation\" >></span></span>\n<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>div</span><span class=\"token punctuation\" >></span></span>"

/***/ },

/***/ 373:
/***/ function(module, exports) {

	module.exports = "<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>base-chart</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chart<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >[data]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>pieChartData<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >[labels]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>pieChartLabels<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >[chart-type]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>pieChartType<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >(chart-hover)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartHovered($event)<span class=\"token punctuation\" >\"</span></span>\n           <span class=\"token attr-name\" >(chart-click)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartClicked($event)<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span><span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>base-chart</span><span class=\"token punctuation\" >></span></span>\n"

/***/ },

/***/ 374:
/***/ function(module, exports) {

	module.exports = "<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>base-chart</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chart<span class=\"token punctuation\" >\"</span></span>\n            <span class=\"token attr-name\" >[data]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>polarAreaChartData<span class=\"token punctuation\" >\"</span></span>\n            <span class=\"token attr-name\" >[labels]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>polarAreaChartLabels<span class=\"token punctuation\" >\"</span></span>\n            <span class=\"token attr-name\" >[colours]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>polarAreaChartColours<span class=\"token punctuation\" >\"</span></span>\n            <span class=\"token attr-name\" >[legend]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>polarAreaLegend<span class=\"token punctuation\" >\"</span></span>\n            <span class=\"token attr-name\" >[chart-type]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>polarAreaChartType<span class=\"token punctuation\" >\"</span></span>\n            <span class=\"token attr-name\" >(chart-hover)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartHovered($event)<span class=\"token punctuation\" >\"</span></span>\n            <span class=\"token attr-name\" >(chart-click)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartClicked($event)<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span><span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>base-chart</span><span class=\"token punctuation\" >></span></span>\n"

/***/ },

/***/ 375:
/***/ function(module, exports) {

	module.exports = "<span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;</span>base-chart</span> <span class=\"token attr-name\" >class</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chart<span class=\"token punctuation\" >\"</span></span>\n             <span class=\"token attr-name\" >[data]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>radarChartData<span class=\"token punctuation\" >\"</span></span>\n             <span class=\"token attr-name\" >[labels]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>radarChartLabels<span class=\"token punctuation\" >\"</span></span>\n             <span class=\"token attr-name\" >[chart-type]</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>radarChartType<span class=\"token punctuation\" >\"</span></span>\n             <span class=\"token attr-name\" >(chart-hover)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartHovered($event)<span class=\"token punctuation\" >\"</span></span>\n             <span class=\"token attr-name\" >(chart-click)</span><span class=\"token attr-value\" ><span class=\"token punctuation\" >=</span><span class=\"token punctuation\" >\"</span>chartClicked($event)<span class=\"token punctuation\" >\"</span></span><span class=\"token punctuation\" >></span></span><span class=\"token tag\" ><span class=\"token tag\" ><span class=\"token punctuation\" >&lt;/</span>base-chart</span><span class=\"token punctuation\" >></span></span>\n"

/***/ },

/***/ 376:
/***/ function(module, exports) {

	module.exports = "<span class=\"token comment\" spellcheck=\"true\">/// &lt;reference path=\"../../../tsd.d.ts\" /></span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>\n  Component<span class=\"token punctuation\" >,</span> View<span class=\"token punctuation\" >,</span> EventEmitter<span class=\"token punctuation\" >,</span>\n  CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >,</span> NgClass\n<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'angular2/angular2'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>charts<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'../../../components/index'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token comment\" spellcheck=\"true\">// webpack html imports</span>\n<span class=\"token keyword\" >let</span> template <span class=\"token operator\" >=</span> <span class=\"token function\" >require</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'./bar-chart-demo.html'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n\n@<span class=\"token function\" >Component</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  selector<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'bar-chart-demo'</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n@<span class=\"token function\" >View</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  template<span class=\"token punctuation\" >:</span> template<span class=\"token punctuation\" >,</span>\n  directives<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >[</span>charts<span class=\"token punctuation\" >,</span> NgClass<span class=\"token punctuation\" >,</span> CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >]</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n<span class=\"token keyword\" >export</span> <span class=\"token keyword\" >class</span> <span class=\"token class-name\" >BarChartDemo</span> <span class=\"token punctuation\" >{</span>\n\n  <span class=\"token keyword\" >constructor</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'bar demo'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token keyword\" >private</span> barChartOptions <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >{</span>\n    scaleShowVerticalLines<span class=\"token punctuation\" >:</span> <span class=\"token keyword\" >false</span><span class=\"token punctuation\" >,</span>\n    responsive<span class=\"token punctuation\" >:</span> <span class=\"token keyword\" >true</span><span class=\"token punctuation\" >,</span>\n    multiTooltipTemplate<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'&lt;%if (datasetLabel){%>&lt;%=datasetLabel %>: &lt;%}%>&lt;%= value %>'</span>\n  <span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> barChartLabels <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'2006'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'2007'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'2008'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'2009'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'2010'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'2011'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'2012'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> barChartSeries <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'Series A'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Series B'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> barChartType <span class=\"token operator\" >=</span> <span class=\"token string\" >'Bar'</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> barChartLegend<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >boolean</span> <span class=\"token operator\" >=</span> <span class=\"token keyword\" >true</span><span class=\"token punctuation\" >;</span>\n\n  <span class=\"token keyword\" >private</span> barChartData <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span>\n    <span class=\"token punctuation\" >[</span><span class=\"token number\" >65</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >59</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >80</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >81</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >56</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >55</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >40</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >,</span>\n    <span class=\"token punctuation\" >[</span><span class=\"token number\" >28</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >48</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >40</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >19</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >86</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >27</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >90</span><span class=\"token punctuation\" >]</span>\n  <span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// events</span>\n  <span class=\"token function\" >chartClicked</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n  <span class=\"token function\" >chartHovered</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n<span class=\"token punctuation\" >}</span>\n"

/***/ },

/***/ 377:
/***/ function(module, exports) {

	module.exports = "<span class=\"token comment\" spellcheck=\"true\">/// &lt;reference path=\"../../../tsd.d.ts\" /></span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>\n  Component<span class=\"token punctuation\" >,</span> View<span class=\"token punctuation\" >,</span> EventEmitter<span class=\"token punctuation\" >,</span>\n  CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >,</span> NgClass\n<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'angular2/angular2'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>charts<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'../../../components/index'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token comment\" spellcheck=\"true\">// webpack html imports</span>\n<span class=\"token keyword\" >let</span> template <span class=\"token operator\" >=</span> <span class=\"token function\" >require</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'./base-chart-demo.html'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n\n@<span class=\"token function\" >Component</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  selector<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'base-chart-demo'</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n@<span class=\"token function\" >View</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  template<span class=\"token punctuation\" >:</span> template<span class=\"token punctuation\" >,</span>\n  directives<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >[</span>charts<span class=\"token punctuation\" >,</span> NgClass<span class=\"token punctuation\" >,</span> CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >]</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n<span class=\"token keyword\" >export</span> <span class=\"token keyword\" >class</span> <span class=\"token class-name\" >BaseChartDemo</span> <span class=\"token punctuation\" >{</span>\n\n  <span class=\"token keyword\" >constructor</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'foo demo'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// lineChart</span>\n  <span class=\"token keyword\" >private</span> lineChartData<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >Array</span><span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >any</span><span class=\"token operator\" >></span> <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span>\n    <span class=\"token punctuation\" >[</span><span class=\"token number\" >65</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >59</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >80</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >81</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >56</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >55</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >40</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >,</span>\n    <span class=\"token punctuation\" >[</span><span class=\"token number\" >28</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >48</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >40</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >19</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >86</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >27</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >90</span><span class=\"token punctuation\" >]</span>\n  <span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> lineChartLabels<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >Array</span><span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >any</span><span class=\"token operator\" >></span> <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'January'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'February'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'March'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'April'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'May'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'June'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'July'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> lineChartSeries<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >Array</span><span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >any</span><span class=\"token operator\" >></span> <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'Series A'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Series B'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Series C'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> lineChartOptions<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span> <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >{</span>\n    multiTooltipTemplate<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'&lt;%if (datasetLabel){%>&lt;%=datasetLabel %>: &lt;%}%>&lt;%= value %>'</span>\n  <span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> lineChartType<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >string</span> <span class=\"token operator\" >=</span> <span class=\"token string\" >'Line'</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> pieChartType<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >string</span> <span class=\"token operator\" >=</span> <span class=\"token string\" >'Pie'</span><span class=\"token punctuation\" >;</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// Pie</span>\n  <span class=\"token keyword\" >private</span> pieChartLabels <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'Download Sales'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'In-Store Sales'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Mail Sales'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> pieChartData <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token number\" >300</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >500</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >100</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n\n  <span class=\"token keyword\" >private</span> <span class=\"token function\" >randomizeType</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>lineChartType <span class=\"token operator\" >=</span> <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>lineChartType <span class=\"token operator\" >===</span> <span class=\"token string\" >'Line'</span> <span class=\"token operator\" >?</span> <span class=\"token string\" >'Bar'</span> <span class=\"token punctuation\" >:</span> <span class=\"token string\" >'Line'</span><span class=\"token punctuation\" >;</span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>pieChartType <span class=\"token operator\" >=</span> <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>pieChartType <span class=\"token operator\" >===</span> <span class=\"token string\" >'Doughnut'</span> <span class=\"token operator\" >?</span> <span class=\"token string\" >'Pie'</span> <span class=\"token punctuation\" >:</span> <span class=\"token string\" >'Doughnut'</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token function\" >chartClicked</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token function\" >chartHovered</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n<span class=\"token punctuation\" >}</span>\n"

/***/ },

/***/ 378:
/***/ function(module, exports) {

	module.exports = "<span class=\"token comment\" spellcheck=\"true\">/// &lt;reference path=\"../../../tsd.d.ts\" /></span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>\n  Component<span class=\"token punctuation\" >,</span> View<span class=\"token punctuation\" >,</span> EventEmitter<span class=\"token punctuation\" >,</span>\n  CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >,</span> NgClass\n<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'angular2/angular2'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>charts<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'../../../components/index'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token comment\" spellcheck=\"true\">// webpack html imports</span>\n<span class=\"token keyword\" >let</span> template <span class=\"token operator\" >=</span> <span class=\"token function\" >require</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'./doughnut-chart-demo.html'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n\n@<span class=\"token function\" >Component</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  selector<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'doughnut-chart-demo'</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n@<span class=\"token function\" >View</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  template<span class=\"token punctuation\" >:</span> template<span class=\"token punctuation\" >,</span>\n  directives<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >[</span>charts<span class=\"token punctuation\" >,</span> NgClass<span class=\"token punctuation\" >,</span> CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >]</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n<span class=\"token keyword\" >export</span> <span class=\"token keyword\" >class</span> <span class=\"token class-name\" >DoughnutChartDemo</span> <span class=\"token punctuation\" >{</span>\n\n  <span class=\"token keyword\" >constructor</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'doughnut demo'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// events</span>\n  <span class=\"token function\" >chartClicked</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token function\" >chartHovered</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// Doughnut</span>\n  <span class=\"token keyword\" >private</span> doughnutChartLabels <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'Download Sales'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'In-Store Sales'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Mail-Order Sales'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> doughnutChartData <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token number\" >350</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >450</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >100</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> doughnutChartType <span class=\"token operator\" >=</span> <span class=\"token string\" >'Doughnut'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token punctuation\" >}</span>\n"

/***/ },

/***/ 379:
/***/ function(module, exports) {

	module.exports = "<span class=\"token comment\" spellcheck=\"true\">/// &lt;reference path=\"../../../tsd.d.ts\" /></span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>\n  Component<span class=\"token punctuation\" >,</span> View<span class=\"token punctuation\" >,</span> EventEmitter<span class=\"token punctuation\" >,</span>\n  CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >,</span> NgClass\n<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'angular2/angular2'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>charts<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'../../../components/index'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token comment\" spellcheck=\"true\">// webpack html imports</span>\n<span class=\"token keyword\" >let</span> template <span class=\"token operator\" >=</span> <span class=\"token function\" >require</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'./line-chart-demo.html'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n\n@<span class=\"token function\" >Component</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  selector<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'line-chart-demo'</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n@<span class=\"token function\" >View</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  template<span class=\"token punctuation\" >:</span> template<span class=\"token punctuation\" >,</span>\n  directives<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >[</span>charts<span class=\"token punctuation\" >,</span> NgClass<span class=\"token punctuation\" >,</span> CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >]</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n<span class=\"token keyword\" >export</span> <span class=\"token keyword\" >class</span> <span class=\"token class-name\" >LineChartDemo</span> <span class=\"token punctuation\" >{</span>\n\n  <span class=\"token keyword\" >constructor</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'line demo'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// lineChart</span>\n  <span class=\"token keyword\" >private</span> lineChartData<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >Array</span><span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >any</span><span class=\"token operator\" >></span> <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span>\n    <span class=\"token punctuation\" >[</span><span class=\"token number\" >65</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >59</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >80</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >81</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >56</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >55</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >40</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >,</span>\n    <span class=\"token punctuation\" >[</span><span class=\"token number\" >28</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >48</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >40</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >19</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >86</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >27</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >90</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >,</span>\n    <span class=\"token punctuation\" >[</span><span class=\"token number\" >18</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >48</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >77</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >9</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >100</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >27</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >40</span><span class=\"token punctuation\" >]</span>\n  <span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> lineChartLabels<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >Array</span><span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >any</span><span class=\"token operator\" >></span> <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'January'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'February'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'March'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'April'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'May'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'June'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'July'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> lineChartSeries<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >Array</span><span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >any</span><span class=\"token operator\" >></span> <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'Series A'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Series B'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Series C'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> lineChartOptions<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span> <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >{</span>\n    animation<span class=\"token punctuation\" >:</span> <span class=\"token keyword\" >false</span><span class=\"token punctuation\" >,</span>\n    responsive<span class=\"token punctuation\" >:</span> <span class=\"token keyword\" >true</span><span class=\"token punctuation\" >,</span>\n    multiTooltipTemplate<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'&lt;%if (datasetLabel){%>&lt;%=datasetLabel %>: &lt;%}%>&lt;%= value %>'</span>\n  <span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> lineChartColours<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >Array</span><span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >any</span><span class=\"token operator\" >></span> <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span>\n    <span class=\"token punctuation\" >{</span> <span class=\"token comment\" spellcheck=\"true\">// grey</span>\n      fillColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(148,159,177,0.2)'</span><span class=\"token punctuation\" >,</span>\n      strokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(148,159,177,1)'</span><span class=\"token punctuation\" >,</span>\n      pointColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(148,159,177,1)'</span><span class=\"token punctuation\" >,</span>\n      pointStrokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightFill<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightStroke<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(148,159,177,0.8)'</span>\n    <span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >,</span>\n    <span class=\"token punctuation\" >{</span> <span class=\"token comment\" spellcheck=\"true\">// dark grey</span>\n      fillColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(77,83,96,0.2)'</span><span class=\"token punctuation\" >,</span>\n      strokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(77,83,96,1)'</span><span class=\"token punctuation\" >,</span>\n      pointColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(77,83,96,1)'</span><span class=\"token punctuation\" >,</span>\n      pointStrokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightFill<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightStroke<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(77,83,96,1)'</span>\n    <span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >,</span>\n    <span class=\"token punctuation\" >{</span> <span class=\"token comment\" spellcheck=\"true\">// grey</span>\n      fillColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(148,159,177,0.2)'</span><span class=\"token punctuation\" >,</span>\n      strokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(148,159,177,1)'</span><span class=\"token punctuation\" >,</span>\n      pointColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(148,159,177,1)'</span><span class=\"token punctuation\" >,</span>\n      pointStrokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightFill<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightStroke<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(148,159,177,0.8)'</span>\n    <span class=\"token punctuation\" >}</span>\n  <span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> lineChartLegend<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >boolean</span> <span class=\"token operator\" >=</span> <span class=\"token keyword\" >true</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> lineChartType<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >string</span> <span class=\"token operator\" >=</span> <span class=\"token string\" >'Line'</span><span class=\"token punctuation\" >;</span>\n\n  <span class=\"token keyword\" >private</span> <span class=\"token function\" >randomize</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    <span class=\"token keyword\" >let</span> _lineChartData <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n    <span class=\"token keyword\" >for</span> <span class=\"token punctuation\" >(</span><span class=\"token keyword\" >let</span> i <span class=\"token operator\" >=</span> <span class=\"token number\" >0</span><span class=\"token punctuation\" >;</span> i <span class=\"token operator\" >&lt;</span> <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>lineChartData<span class=\"token punctuation\" >.</span>length<span class=\"token punctuation\" >;</span> i<span class=\"token operator\" >++</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n      _lineChartData<span class=\"token punctuation\" >[</span>i<span class=\"token punctuation\" >]</span> <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n      <span class=\"token keyword\" >for</span> <span class=\"token punctuation\" >(</span><span class=\"token keyword\" >let</span> j <span class=\"token operator\" >=</span> <span class=\"token number\" >0</span><span class=\"token punctuation\" >;</span> j <span class=\"token operator\" >&lt;</span> <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>lineChartData<span class=\"token punctuation\" >[</span>i<span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >.</span>length<span class=\"token punctuation\" >;</span> j<span class=\"token operator\" >++</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n        _lineChartData<span class=\"token punctuation\" >[</span>i<span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >push</span><span class=\"token punctuation\" >(</span>Math<span class=\"token punctuation\" >.</span><span class=\"token function\" >floor</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >(</span>Math<span class=\"token punctuation\" >.</span><span class=\"token function\" >random</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >*</span> <span class=\"token number\" >100</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >+</span> <span class=\"token number\" >1</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n\n      <span class=\"token punctuation\" >}</span>\n    <span class=\"token punctuation\" >}</span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>lineChartData <span class=\"token operator\" >=</span> _lineChartData<span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// events</span>\n  <span class=\"token function\" >chartClicked</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token function\" >chartHovered</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n<span class=\"token punctuation\" >}</span>\n"

/***/ },

/***/ 380:
/***/ function(module, exports) {

	module.exports = "<span class=\"token comment\" spellcheck=\"true\">/// &lt;reference path=\"../../../tsd.d.ts\" /></span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>\n  Component<span class=\"token punctuation\" >,</span> View<span class=\"token punctuation\" >,</span> EventEmitter<span class=\"token punctuation\" >,</span>\n  CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >,</span> NgClass\n<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'angular2/angular2'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>charts<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'../../../components/index'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token comment\" spellcheck=\"true\">// webpack html imports</span>\n<span class=\"token keyword\" >let</span> template <span class=\"token operator\" >=</span> <span class=\"token function\" >require</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'./pie-chart-demo.html'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n\n@<span class=\"token function\" >Component</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  selector<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'pie-chart-demo'</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n@<span class=\"token function\" >View</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  template<span class=\"token punctuation\" >:</span> template<span class=\"token punctuation\" >,</span>\n  directives<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >[</span>charts<span class=\"token punctuation\" >,</span> NgClass<span class=\"token punctuation\" >,</span> CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >]</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n<span class=\"token keyword\" >export</span> <span class=\"token keyword\" >class</span> <span class=\"token class-name\" >PieChartDemo</span> <span class=\"token punctuation\" >{</span>\n\n  <span class=\"token keyword\" >constructor</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'pie demo'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// events</span>\n  <span class=\"token function\" >chartClicked</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token function\" >chartHovered</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// Pie</span>\n  <span class=\"token keyword\" >private</span> pieChartLabels <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'Download Sales'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'In-Store Sales'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Mail Sales'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> pieChartData <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token number\" >300</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >500</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >100</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> pieChartType <span class=\"token operator\" >=</span> <span class=\"token string\" >'Pie'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token punctuation\" >}</span>\n"

/***/ },

/***/ 381:
/***/ function(module, exports) {

	module.exports = "<span class=\"token comment\" spellcheck=\"true\">/// &lt;reference path=\"../../../tsd.d.ts\" /></span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>\n  Component<span class=\"token punctuation\" >,</span> View<span class=\"token punctuation\" >,</span> EventEmitter<span class=\"token punctuation\" >,</span>\n  CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >,</span> NgClass\n<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'angular2/angular2'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>charts<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'../../../components/index'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token comment\" spellcheck=\"true\">// webpack html imports</span>\n<span class=\"token keyword\" >let</span> template <span class=\"token operator\" >=</span> <span class=\"token function\" >require</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'./polar-area-chart-demo.html'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n\n@<span class=\"token function\" >Component</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  selector<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'polar-area-chart-demo'</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n@<span class=\"token function\" >View</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  template<span class=\"token punctuation\" >:</span> template<span class=\"token punctuation\" >,</span>\n  directives<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >[</span>charts<span class=\"token punctuation\" >,</span> NgClass<span class=\"token punctuation\" >,</span> CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >]</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n<span class=\"token keyword\" >export</span> <span class=\"token keyword\" >class</span> <span class=\"token class-name\" >PolarAreaChartDemo</span> <span class=\"token punctuation\" >{</span>\n\n  <span class=\"token keyword\" >constructor</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'PolarArea demo'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// events</span>\n  <span class=\"token function\" >chartClicked</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n  <span class=\"token function\" >chartHovered</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// PolarArea</span>\n  <span class=\"token keyword\" >private</span> polarAreaChartLabels <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'Download Sales'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'In-Store Sales'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Mail Sales'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Telesales'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Corporate Sales'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> polarAreaChartData <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token number\" >300</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >500</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >100</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >40</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >120</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> polarAreaLegend<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >boolean</span> <span class=\"token operator\" >=</span> <span class=\"token keyword\" >true</span><span class=\"token punctuation\" >;</span>\n\n  <span class=\"token keyword\" >private</span> polarAreaChartType <span class=\"token operator\" >=</span> <span class=\"token string\" >'PolarArea'</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> polarAreaChartColours <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span>\n    <span class=\"token punctuation\" >{</span>\n      fillColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(151,187,205,0.2)'</span><span class=\"token punctuation\" >,</span>\n      strokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(151,187,205,1)'</span><span class=\"token punctuation\" >,</span>\n      pointColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(151,187,205,1)'</span><span class=\"token punctuation\" >,</span>\n      pointStrokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightFill<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightStroke<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(151,187,205,0.8)'</span><span class=\"token punctuation\" >,</span>\n      color<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(151,187,205,1)'</span><span class=\"token punctuation\" >,</span>\n      highlight<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(151,187,205,0.8)'</span>\n    <span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >{</span>\n      fillColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(220,220,220,0.2)'</span><span class=\"token punctuation\" >,</span>\n      strokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(220,220,220,1)'</span><span class=\"token punctuation\" >,</span>\n      pointColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(220,220,220,1)'</span><span class=\"token punctuation\" >,</span>\n      pointStrokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightFill<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightStroke<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(220,220,220,0.8)'</span><span class=\"token punctuation\" >,</span>\n      color<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(220,220,220,1)'</span><span class=\"token punctuation\" >,</span>\n      highlight<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(220,220,220,0.8)'</span>\n    <span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >,</span>\n    <span class=\"token punctuation\" >{</span>\n      fillColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(247,70,74,0.2)'</span><span class=\"token punctuation\" >,</span>\n      strokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(247,70,74,1)'</span><span class=\"token punctuation\" >,</span>\n      pointColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(247,70,74,1)'</span><span class=\"token punctuation\" >,</span>\n      pointStrokeColor<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightFill<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'#fff'</span><span class=\"token punctuation\" >,</span>\n      pointHighlightStroke<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(247,70,74,0.8)'</span><span class=\"token punctuation\" >,</span>\n      color<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(247,70,74,1)'</span><span class=\"token punctuation\" >,</span>\n      highlight<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'rgba(247,70,74,0.8)'</span>\n    <span class=\"token punctuation\" >}</span>\n  <span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token punctuation\" >}</span>\n"

/***/ },

/***/ 382:
/***/ function(module, exports) {

	module.exports = "<span class=\"token comment\" spellcheck=\"true\">/// &lt;reference path=\"../../../tsd.d.ts\" /></span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>\n  Component<span class=\"token punctuation\" >,</span> View<span class=\"token punctuation\" >,</span> EventEmitter<span class=\"token punctuation\" >,</span>\n  CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >,</span> NgClass\n<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'angular2/angular2'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token keyword\" >import</span> <span class=\"token punctuation\" >{</span>charts<span class=\"token punctuation\" >}</span> from <span class=\"token string\" >'../../../components/index'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token comment\" spellcheck=\"true\">// webpack html imports</span>\n<span class=\"token keyword\" >let</span> template <span class=\"token operator\" >=</span> <span class=\"token function\" >require</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'./radar-chart-demo.html'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n\n@<span class=\"token function\" >Component</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  selector<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'radar-chart-demo'</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n@<span class=\"token function\" >View</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >{</span>\n  template<span class=\"token punctuation\" >:</span> template<span class=\"token punctuation\" >,</span>\n  directives<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >[</span>charts<span class=\"token punctuation\" >,</span> NgClass<span class=\"token punctuation\" >,</span> CORE_DIRECTIVES<span class=\"token punctuation\" >,</span> FORM_DIRECTIVES<span class=\"token punctuation\" >]</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n<span class=\"token keyword\" >export</span> <span class=\"token keyword\" >class</span> <span class=\"token class-name\" >RadarChartDemo</span> <span class=\"token punctuation\" >{</span>\n\n  <span class=\"token keyword\" >constructor</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'radar demo'</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// events</span>\n  <span class=\"token function\" >chartClicked</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token function\" >chartHovered</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >:</span><span class=\"token keyword\" >any</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n    console<span class=\"token punctuation\" >.</span><span class=\"token function\" >log</span><span class=\"token punctuation\" >(</span>e<span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token punctuation\" >}</span>\n\n  <span class=\"token comment\" spellcheck=\"true\">// Radar</span>\n  <span class=\"token keyword\" >private</span> radarChartLabels <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'Eating'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Drinking'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Sleeping'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Designing'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Coding'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Cycling'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'Running'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> radarChartData <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span>\n    <span class=\"token punctuation\" >[</span><span class=\"token number\" >65</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >59</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >90</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >81</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >56</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >55</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >40</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >,</span>\n    <span class=\"token punctuation\" >[</span><span class=\"token number\" >28</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >48</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >40</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >19</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >96</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >27</span><span class=\"token punctuation\" >,</span> <span class=\"token number\" >100</span><span class=\"token punctuation\" >]</span>\n  <span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >;</span>\n  <span class=\"token keyword\" >private</span> radarChartType <span class=\"token operator\" >=</span> <span class=\"token string\" >'Radar'</span><span class=\"token punctuation\" >;</span>\n\n<span class=\"token punctuation\" >}</span>\n"

/***/ },

/***/ 384:
/***/ function(module, exports) {

	module.exports = "<base-chart class=\"chart\"\n           [data]=\"barChartData\"\n           [labels]=\"barChartLabels\"\n           [options]=\"barChartOptions\"\n           [series]=\"barChartSeries\"\n           [legend]=\"barChartLegend\"\n           [series]=\"barChartSeries\"\n           [chart-type]=\"barChartType\"\n           (chart-hover)=\"chartHovered($event)\"\n           (chart-click)=\"chartClicked($event)\"></base-chart>\n"

/***/ },

/***/ 385:
/***/ function(module, exports) {

	module.exports = "  <div class=\"col-md-6\">\n\n    <base-chart class=\"chart\"\n                [data]=\"lineChartData\"\n                [labels]=\"lineChartLabels\"\n                [options]=\"lineChartOptions\"\n                [series]=\"lineChartSeries\"\n                [chart-type]=\"lineChartType\"\n                (chart-hover)=\"chartHovered($event)\"\n                (chart-click)=\"chartClicked($event)\"></base-chart>\n  </div>\n  <div class=\"col-md-6\">\n    <base-chart class=\"chart\"\n                [data]=\"pieChartData\"\n                [labels]=\"pieChartLabels\"\n                [chart-type]=\"pieChartType\"\n                (chart-hover)=\"chartHovered($event)\"\n                (chart-click)=\"chartClicked($event)\"></base-chart>\n  </div>\n  <div class=\"col-md-12 text-center\" style=\"margin-top: 10px;\">\n    <button (click)=\"randomizeType()\" style=\"display: inline-block\">Toggle</button>\n  </div>\n\n\n"

/***/ },

/***/ 386:
/***/ function(module, exports) {

	module.exports = "<base-chart class=\"chart\"\n                [data]=\"doughnutChartData\"\n                [labels]=\"doughnutChartLabels\"\n                [chart-type]=\"doughnutChartType\"\n                (chart-hover)=\"chartHovered($event)\"\n                (chart-click)=\"chartClicked($event)\"></base-chart>\n"

/***/ },

/***/ 387:
/***/ function(module, exports) {

	module.exports = "<div class=\"row\">\n  <div class=\"col-md-6\">\n    <base-chart class=\"chart\"\n                [data]=\"lineChartData\"\n                [labels]=\"lineChartLabels\"\n                [options]=\"lineChartOptions\"\n                [series]=\"lineChartSeries\"\n                [colours]=\"lineChartColours\"\n                [chart-type]=\"lineChartType\"\n                [legend]=\"lineChartLegend\"\n                (chart-hover)=\"chartHovered($event)\"\n                (chart-click)=\"chartClicked($event)\"></base-chart>\n  </div>\n  <div class=\"col-md-6\" style=\"margin-bottom: 10px;\">\n    <table class=\"table table-responsive table-condensed\">\n      <tr>\n        <th *ng-for=\"#label of lineChartLabels\">{{label}}</th>\n      </tr>\n      <tr *ng-for=\"#d of lineChartData\">\n        <td *ng-for=\"#label of lineChartLabels; #j=index\">{{d[j]}}</td>\n      </tr>\n    </table>\n    <button (click)=\"randomize()\">CLICK</button>\n  </div>\n</div>"

/***/ },

/***/ 388:
/***/ function(module, exports) {

	module.exports = "<base-chart class=\"chart\"\n           [data]=\"pieChartData\"\n           [labels]=\"pieChartLabels\"\n           [chart-type]=\"pieChartType\"\n           (chart-hover)=\"chartHovered($event)\"\n           (chart-click)=\"chartClicked($event)\"></base-chart>\n"

/***/ },

/***/ 389:
/***/ function(module, exports) {

	module.exports = "<base-chart class=\"chart\"\n            [data]=\"polarAreaChartData\"\n            [labels]=\"polarAreaChartLabels\"\n            [colours]=\"polarAreaChartColours\"\n            [legend]=\"polarAreaLegend\"\n            [chart-type]=\"polarAreaChartType\"\n            (chart-hover)=\"chartHovered($event)\"\n            (chart-click)=\"chartClicked($event)\"></base-chart>\n"

/***/ },

/***/ 390:
/***/ function(module, exports) {

	module.exports = "<base-chart class=\"chart\"\n             [data]=\"radarChartData\"\n             [labels]=\"radarChartLabels\"\n             [chart-type]=\"radarChartType\"\n             (chart-hover)=\"chartHovered($event)\"\n             (chart-click)=\"chartClicked($event)\"></base-chart>\n"

/***/ },

/***/ 392:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var ng2_bootstrap_1 = __webpack_require__(210);
	var line_chart_demo_1 = __webpack_require__(396);
	var bar_chart_demo_1 = __webpack_require__(393);
	var doughnut_chart_demo_1 = __webpack_require__(395);
	var pie_chart_demo_1 = __webpack_require__(397);
	var polar_area_chart_demo_1 = __webpack_require__(398);
	var radar_chart_demo_1 = __webpack_require__(399);
	var base_chart_demo_1 = __webpack_require__(394);
	var name = 'Charts';
	var src = 'https://github.com/valor-software/ng2-charts/blob/master/components/charts/charts.ts';
	var doc = __webpack_require__(367);
	var chartDesc = [
	    {
	        heading: 'Line Chart',
	        tag: 'line-chart-demo',
	        id: 'lineChart',
	        ts: __webpack_require__(379),
	        html: __webpack_require__(372)
	    },
	    {
	        heading: 'Bar Chart',
	        tag: 'bar-chart-demo',
	        id: 'barChart',
	        ts: __webpack_require__(376),
	        html: __webpack_require__(369)
	    },
	    {
	        heading: 'Doughnut Chart',
	        tag: 'doughnut-chart-demo',
	        id: 'doughnutChart',
	        ts: __webpack_require__(378),
	        html: __webpack_require__(371)
	    },
	    {
	        heading: 'Radar Chart',
	        tag: 'radar-chart-demo',
	        id: 'radarChart',
	        ts: __webpack_require__(382),
	        html: __webpack_require__(375)
	    },
	    {
	        heading: 'Pie Chart',
	        tag: 'pie-chart-demo',
	        id: 'pieChart',
	        ts: __webpack_require__(380),
	        html: __webpack_require__(373)
	    },
	    {
	        heading: 'Polar Area Chart',
	        tag: 'polar-area-chart-demo',
	        id: 'polarAreaChart',
	        ts: __webpack_require__(381),
	        html: __webpack_require__(374)
	    },
	    {
	        heading: 'Dynamic Chart',
	        tag: 'base-chart-demo',
	        id: 'baseChart',
	        ts: __webpack_require__(377),
	        html: __webpack_require__(370)
	    }
	];
	var chartContent = "";
	chartDesc.forEach(function (desc) {
	    chartContent += "\n      <section id=\"" + desc.id + "\" style=\"padding-top: 50px;\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <h4>" + desc.heading + "</h4>\n          </div>\n        </div>\n        <div class=\"card card-block panel panel-default panel-body\">\n\n         <div class=\"row\">\n          <div *ng-if=\"'" + desc.heading + "' == 'Line Chart' || '" + desc.heading + "' == 'Dynamic Chart'\">\n            <div class=\"col-md-12\">\n              <" + desc.tag + "></" + desc.tag + ">\n            </div>\n          </div>\n          <div *ng-if=\"'" + desc.heading + "' != 'Line Chart' && '" + desc.heading + "' != 'Dynamic Chart'\">\n            <div class=\"col-md-3\"></div>\n            <div class=\"col-md-6\">\n              <" + desc.tag + "></" + desc.tag + ">\n            </div>\n            <div class=\"col-md-3\"></div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <tabset>\n            <tab heading=\"Markup\">\n              <div class=\"card card-block panel panel-default panel-body\">\n                <pre class=\"language-html\"><code class=\"language-html\" ng-non-bindable>" + desc.html + "</code></pre>\n              </div>\n            </tab>\n            <tab heading=\"TypeScript\">\n              <div class=\"card card-block panel panel-default panel-body\">\n                <pre class=\"language-typescript\"><code class=\"language-typescript\" ng-non-bindable>" + desc.ts + "</code></pre>\n              </div>\n            </tab>\n          </tabset>\n        </div>\n      </div>\n    </section>\n  ";
	});
	var ChartsSection = (function () {
	    function ChartsSection() {
	    }
	    ChartsSection = __decorate([
	        angular2_1.Component({
	            selector: 'charts-section'
	        }),
	        angular2_1.View({
	            template: "\n  <br>\n  <section id=\"" + name.toLowerCase() + "\">\n    <div class=\"row\"><h1>" + name + "<small>(<a href=\"" + src + "\">src</a>)</small></h1></div>\n\n    <hr>\n\n    <div class=\"row\">\n      <h2>Example</h2>\n        " + chartContent + "\n    </div>\n\n    <br>\n\n    <div class=\"row\">\n      <h2>API</h2>\n      <div class=\"card card-block panel panel-default panel-body\">" + doc + "</div>\n    </div>\n  </section>\n  ",
	            directives: [line_chart_demo_1.LineChartDemo, bar_chart_demo_1.BarChartDemo, doughnut_chart_demo_1.DoughnutChartDemo, pie_chart_demo_1.PieChartDemo,
	                polar_area_chart_demo_1.PolarAreaChartDemo, radar_chart_demo_1.RadarChartDemo, base_chart_demo_1.BaseChartDemo, ng2_bootstrap_1.tabs, angular2_1.CORE_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ChartsSection);
	    return ChartsSection;
	})();
	exports.ChartsSection = ChartsSection;


/***/ },

/***/ 393:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var index_1 = __webpack_require__(21);
	var template = __webpack_require__(384);
	var BarChartDemo = (function () {
	    function BarChartDemo() {
	        this.barChartOptions = {
	            scaleShowVerticalLines: false,
	            responsive: true,
	            multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
	        };
	        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	        this.barChartSeries = ['Series A', 'Series B'];
	        this.barChartType = 'Bar';
	        this.barChartLegend = true;
	        this.barChartData = [
	            [65, 59, 80, 81, 56, 55, 40],
	            [28, 48, 40, 19, 86, 27, 90]
	        ];
	        console.log('bar demo');
	    }
	    BarChartDemo.prototype.chartClicked = function (e) {
	        console.log(e);
	    };
	    BarChartDemo.prototype.chartHovered = function (e) {
	        console.log(e);
	    };
	    BarChartDemo = __decorate([
	        angular2_1.Component({
	            selector: 'bar-chart-demo'
	        }),
	        angular2_1.View({
	            template: template,
	            directives: [index_1.charts, angular2_1.NgClass, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], BarChartDemo);
	    return BarChartDemo;
	})();
	exports.BarChartDemo = BarChartDemo;


/***/ },

/***/ 394:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var index_1 = __webpack_require__(21);
	var template = __webpack_require__(385);
	var BaseChartDemo = (function () {
	    function BaseChartDemo() {
	        this.lineChartData = [
	            [65, 59, 80, 81, 56, 55, 40],
	            [28, 48, 40, 19, 86, 27, 90]
	        ];
	        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	        this.lineChartSeries = ['Series A', 'Series B', 'Series C'];
	        this.lineChartOptions = {
	            multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
	        };
	        this.lineChartType = 'Line';
	        this.pieChartType = 'Pie';
	        this.pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
	        this.pieChartData = [300, 500, 100];
	        console.log('foo demo');
	    }
	    BaseChartDemo.prototype.randomizeType = function () {
	        this.lineChartType = this.lineChartType === 'Line' ? 'Bar' : 'Line';
	        this.pieChartType = this.pieChartType === 'Doughnut' ? 'Pie' : 'Doughnut';
	    };
	    BaseChartDemo.prototype.chartClicked = function (e) {
	        console.log(e);
	    };
	    BaseChartDemo.prototype.chartHovered = function (e) {
	        console.log(e);
	    };
	    BaseChartDemo = __decorate([
	        angular2_1.Component({
	            selector: 'base-chart-demo'
	        }),
	        angular2_1.View({
	            template: template,
	            directives: [index_1.charts, angular2_1.NgClass, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], BaseChartDemo);
	    return BaseChartDemo;
	})();
	exports.BaseChartDemo = BaseChartDemo;


/***/ },

/***/ 395:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var index_1 = __webpack_require__(21);
	var template = __webpack_require__(386);
	var DoughnutChartDemo = (function () {
	    function DoughnutChartDemo() {
	        this.doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	        this.doughnutChartData = [350, 450, 100];
	        this.doughnutChartType = 'Doughnut';
	        console.log('doughnut demo');
	    }
	    DoughnutChartDemo.prototype.chartClicked = function (e) {
	        console.log(e);
	    };
	    DoughnutChartDemo.prototype.chartHovered = function (e) {
	        console.log(e);
	    };
	    DoughnutChartDemo = __decorate([
	        angular2_1.Component({
	            selector: 'doughnut-chart-demo'
	        }),
	        angular2_1.View({
	            template: template,
	            directives: [index_1.charts, angular2_1.NgClass, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DoughnutChartDemo);
	    return DoughnutChartDemo;
	})();
	exports.DoughnutChartDemo = DoughnutChartDemo;


/***/ },

/***/ 396:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var index_1 = __webpack_require__(21);
	var template = __webpack_require__(387);
	var LineChartDemo = (function () {
	    function LineChartDemo() {
	        this.lineChartData = [
	            [65, 59, 80, 81, 56, 55, 40],
	            [28, 48, 40, 19, 86, 27, 90],
	            [18, 48, 77, 9, 100, 27, 40]
	        ];
	        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	        this.lineChartSeries = ['Series A', 'Series B', 'Series C'];
	        this.lineChartOptions = {
	            animation: false,
	            responsive: true,
	            multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
	        };
	        this.lineChartColours = [
	            {
	                fillColor: 'rgba(148,159,177,0.2)',
	                strokeColor: 'rgba(148,159,177,1)',
	                pointColor: 'rgba(148,159,177,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(148,159,177,0.8)'
	            },
	            {
	                fillColor: 'rgba(77,83,96,0.2)',
	                strokeColor: 'rgba(77,83,96,1)',
	                pointColor: 'rgba(77,83,96,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(77,83,96,1)'
	            },
	            {
	                fillColor: 'rgba(148,159,177,0.2)',
	                strokeColor: 'rgba(148,159,177,1)',
	                pointColor: 'rgba(148,159,177,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(148,159,177,0.8)'
	            }
	        ];
	        this.lineChartLegend = true;
	        this.lineChartType = 'Line';
	        console.log('line demo');
	    }
	    LineChartDemo.prototype.randomize = function () {
	        var _lineChartData = [];
	        for (var i = 0; i < this.lineChartData.length; i++) {
	            _lineChartData[i] = [];
	            for (var j = 0; j < this.lineChartData[i].length; j++) {
	                _lineChartData[i].push(Math.floor((Math.random() * 100) + 1));
	            }
	        }
	        this.lineChartData = _lineChartData;
	    };
	    LineChartDemo.prototype.chartClicked = function (e) {
	        console.log(e);
	    };
	    LineChartDemo.prototype.chartHovered = function (e) {
	        console.log(e);
	    };
	    LineChartDemo = __decorate([
	        angular2_1.Component({
	            selector: 'line-chart-demo'
	        }),
	        angular2_1.View({
	            template: template,
	            directives: [index_1.charts, angular2_1.NgClass, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], LineChartDemo);
	    return LineChartDemo;
	})();
	exports.LineChartDemo = LineChartDemo;


/***/ },

/***/ 397:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var index_1 = __webpack_require__(21);
	var template = __webpack_require__(388);
	var PieChartDemo = (function () {
	    function PieChartDemo() {
	        this.pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
	        this.pieChartData = [300, 500, 100];
	        this.pieChartType = 'Pie';
	        console.log('pie demo');
	    }
	    PieChartDemo.prototype.chartClicked = function (e) {
	        console.log(e);
	    };
	    PieChartDemo.prototype.chartHovered = function (e) {
	        console.log(e);
	    };
	    PieChartDemo = __decorate([
	        angular2_1.Component({
	            selector: 'pie-chart-demo'
	        }),
	        angular2_1.View({
	            template: template,
	            directives: [index_1.charts, angular2_1.NgClass, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], PieChartDemo);
	    return PieChartDemo;
	})();
	exports.PieChartDemo = PieChartDemo;


/***/ },

/***/ 398:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var index_1 = __webpack_require__(21);
	var template = __webpack_require__(389);
	var PolarAreaChartDemo = (function () {
	    function PolarAreaChartDemo() {
	        this.polarAreaChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
	        this.polarAreaChartData = [300, 500, 100, 40, 120];
	        this.polarAreaLegend = true;
	        this.polarAreaChartType = 'PolarArea';
	        this.polarAreaChartColours = [
	            {
	                fillColor: 'rgba(151,187,205,0.2)',
	                strokeColor: 'rgba(151,187,205,1)',
	                pointColor: 'rgba(151,187,205,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(151,187,205,0.8)',
	                color: 'rgba(151,187,205,1)',
	                highlight: 'rgba(151,187,205,0.8)'
	            }, {
	                fillColor: 'rgba(220,220,220,0.2)',
	                strokeColor: 'rgba(220,220,220,1)',
	                pointColor: 'rgba(220,220,220,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(220,220,220,0.8)',
	                color: 'rgba(220,220,220,1)',
	                highlight: 'rgba(220,220,220,0.8)'
	            },
	            {
	                fillColor: 'rgba(247,70,74,0.2)',
	                strokeColor: 'rgba(247,70,74,1)',
	                pointColor: 'rgba(247,70,74,1)',
	                pointStrokeColor: '#fff',
	                pointHighlightFill: '#fff',
	                pointHighlightStroke: 'rgba(247,70,74,0.8)',
	                color: 'rgba(247,70,74,1)',
	                highlight: 'rgba(247,70,74,0.8)'
	            }
	        ];
	        console.log('PolarArea demo');
	    }
	    PolarAreaChartDemo.prototype.chartClicked = function (e) {
	        console.log(e);
	    };
	    PolarAreaChartDemo.prototype.chartHovered = function (e) {
	        console.log(e);
	    };
	    PolarAreaChartDemo = __decorate([
	        angular2_1.Component({
	            selector: 'polar-area-chart-demo'
	        }),
	        angular2_1.View({
	            template: template,
	            directives: [index_1.charts, angular2_1.NgClass, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], PolarAreaChartDemo);
	    return PolarAreaChartDemo;
	})();
	exports.PolarAreaChartDemo = PolarAreaChartDemo;


/***/ },

/***/ 399:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var index_1 = __webpack_require__(21);
	var template = __webpack_require__(390);
	var RadarChartDemo = (function () {
	    function RadarChartDemo() {
	        this.radarChartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
	        this.radarChartData = [
	            [65, 59, 90, 81, 56, 55, 40],
	            [28, 48, 40, 19, 96, 27, 100]
	        ];
	        this.radarChartType = 'Radar';
	        console.log('radar demo');
	    }
	    RadarChartDemo.prototype.chartClicked = function (e) {
	        console.log(e);
	    };
	    RadarChartDemo.prototype.chartHovered = function (e) {
	        console.log(e);
	    };
	    RadarChartDemo = __decorate([
	        angular2_1.Component({
	            selector: 'radar-chart-demo'
	        }),
	        angular2_1.View({
	            template: template,
	            directives: [index_1.charts, angular2_1.NgClass, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], RadarChartDemo);
	    return RadarChartDemo;
	})();
	exports.RadarChartDemo = RadarChartDemo;


/***/ },

/***/ 400:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var ng2_bootstrap_1 = __webpack_require__(210);
	var components = [
	    {
	        name: 'Line Chart',
	        href: 'lineChart'
	    }, {
	        name: 'Bar Chart',
	        href: 'barChart'
	    }, {
	        name: 'Radar Chart',
	        href: 'radarChart'
	    }, {
	        name: 'Pie Chart',
	        href: 'pieChart'
	    }, {
	        name: 'Polar Area Chart',
	        href: 'polarAreaChart'
	    }, {
	        name: 'Doughnut Chart',
	        href: 'doughnutChart'
	    }, {
	        name: 'Dynamic Chart',
	        href: 'baseChart'
	    }
	];
	var template = "\n    <header class=\"navbar navbar-default navbar-fixed-top navbar-inner bg-faded\">\n    <div class=\"container\">\n      <div class=\"navbar-header hidden-md-up\">\n        <button type=\"button\" class=\"navbar-toggle navbar-toggler pull-right\" (click)=\"isCollapsed = !isCollapsed\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand visible-xs\" href=\"{{prefix}}#\">ng2-charts</a>\n      </div>\n      <nav class=\"hidden-xs hidden-xs-down\">\n        <ul class=\"nav navbar-nav\">\n          <li class=\"nav-item\"><a href=\"{{prefix}}#top\" role=\"button\" class=\"navbar-brand\">ng2-charts</a></li>\n          <li class=\"nav-item dropdown\" dropdown>\n            <a role=\"button\" class=\"nav-link dropdown-toggle\" dropdown-toggle>Directives <b class=\"caret\"></b></a>\n            <ul class=\"dropdown-menu\">\n              <li *ng-for=\"#comp of components\">\n               <a class=\"dropdown-item\" href=\"{{prefix}}#{{comp.href}}\">{{comp.name}}</a>\n              </li>\n            </ul>\n          </li>\n        </ul>\n      </nav>\n      <nav class=\"visible-xs hidden-md-up\">\n        <ul class=\"nav nav-pills nav-stacked scrollable-menu\" [collapse]=\"!isCollapsed\" (click)=\"isCollapsed = !isCollapsed; true\">\n          <li *ng-for=\"#comp of components\" class=\"nav-item\">\n            <a class=\"dropdown-item\" href=\"{{prefix}}#{{comp.href}}\">{{comp.name}}</a>\n          </li>\n        </ul>\n      </nav>\n    </div>\n  </header>";
	var DemoHeader = (function () {
	    function DemoHeader() {
	        this.components = components;
	        this.prefix = ng2_bootstrap_1.Ng2BootstrapConfig.theme === ng2_bootstrap_1.Ng2BootstrapTheme.BS4 ? 'index-bs4.html' : '';
	    }
	    DemoHeader = __decorate([
	        angular2_1.Component({
	            selector: 'demo-header'
	        }),
	        angular2_1.View({
	            template: template,
	            directives: [
	                angular2_1.NgFor,
	                ng2_bootstrap_1.Collapse,
	                ng2_bootstrap_1.dropdown
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DemoHeader);
	    return DemoHeader;
	})();
	exports.DemoHeader = DemoHeader;


/***/ },

/***/ 401:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(6);
	var Accordion = (function () {
	    function Accordion() {
	        this.groups = [];
	    }
	    Accordion.prototype.closeOtherGroups = function (openGroup) {
	        if (!this.closeOthers) {
	            return;
	        }
	        this.groups.forEach(function (group) {
	            if (group !== openGroup) {
	                group.isOpen = false;
	            }
	        });
	    };
	    Accordion.prototype.addGroup = function (group) {
	        this.groups.push(group);
	    };
	    Accordion.prototype.removeGroup = function (group) {
	        var index = this.groups.indexOf(group);
	        if (index !== -1) {
	            this.groups.slice(index, 1);
	        }
	    };
	    Accordion = __decorate([
	        angular2_1.Component({
	            selector: 'accordion, [accordion]',
	            properties: ['templateUrl', 'closeOthers'],
	            host: {
	                '[class.panel-group]': 'true'
	            }
	        }),
	        angular2_1.View({
	            template: "<ng-content></ng-content>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Accordion);
	    return Accordion;
	})();
	exports.Accordion = Accordion;
	var AccordionTransclude = (function () {
	    function AccordionTransclude(viewRef) {
	        this.viewRef = viewRef;
	    }
	    AccordionTransclude.prototype.onInit = function () {
	        if (this.accordionTransclude) {
	            this.viewRef.createEmbeddedView(this.accordionTransclude);
	        }
	    };
	    AccordionTransclude = __decorate([
	        angular2_1.Directive({
	            selector: 'accordion-transclude, [accordion-transclude]',
	            properties: ['accordionTransclude']
	        }),
	        __param(0, angular2_1.Inject(angular2_1.ViewContainerRef)), 
	        __metadata('design:paramtypes', [angular2_1.ViewContainerRef])
	    ], AccordionTransclude);
	    return AccordionTransclude;
	})();
	exports.AccordionTransclude = AccordionTransclude;
	var collapse_1 = __webpack_require__(205);
	var AccordionGroup = (function () {
	    function AccordionGroup(accordion) {
	        this.accordion = accordion;
	    }
	    AccordionGroup.prototype.onInit = function () {
	        this.panelClass = this.panelClass || 'panel-default';
	        this.accordion.addGroup(this);
	    };
	    AccordionGroup.prototype.onDestroy = function () {
	        this.accordion.removeGroup(this);
	    };
	    AccordionGroup.prototype.toggleOpen = function (event) {
	        event.preventDefault();
	        if (!this.isDisabled) {
	            this.isOpen = !this.isOpen;
	        }
	    };
	    Object.defineProperty(AccordionGroup.prototype, "isOpen", {
	        get: function () {
	            return this._isOpen;
	        },
	        set: function (value) {
	            this._isOpen = value;
	            if (value) {
	                this.accordion.closeOtherGroups(this);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AccordionGroup = __decorate([
	        angular2_1.Component({
	            selector: 'accordion-group, [accordion-group]',
	            properties: ['templateUrl', 'heading', 'isOpen', 'isDisabled', 'panelClass'],
	            host: {
	                '[class.panel-open]': 'isOpen'
	            }
	        }),
	        angular2_1.View({
	            template: "\n  <div class=\"panel\" [ng-class]=\"panelClass\">\n    <div class=\"panel-heading\" (click)=\"toggleOpen($event)\">\n      <h4 class=\"panel-title\">\n        <a href tabindex=\"0\" class=\"accordion-toggle\">\n          <span [ng-class]=\"{'text-muted': isDisabled}\"\n            [accordion-transclude]=\"headingTemplate\">{{heading}}</span>\n        </a>\n      </h4>\n    </div>\n    <div class=\"panel-collapse collapse\" [collapse]=\"!isOpen\">\n      <div class=\"panel-body\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n  ",
	            directives: [collapse_1.Collapse, AccordionTransclude, angular2_1.NgClass]
	        }), 
	        __metadata('design:paramtypes', [Accordion])
	    ], AccordionGroup);
	    return AccordionGroup;
	})();
	exports.AccordionGroup = AccordionGroup;
	var AccordionHeading = (function () {
	    function AccordionHeading(group, templateRef) {
	        this.group = group;
	        this.templateRef = templateRef;
	        group.headingTemplate = templateRef;
	    }
	    AccordionHeading = __decorate([
	        angular2_1.Directive({
	            selector: 'accordion-heading, [accordion-heading]'
	        }), 
	        __metadata('design:paramtypes', [AccordionGroup, angular2_1.TemplateRef])
	    ], AccordionHeading);
	    return AccordionHeading;
	})();
	exports.AccordionHeading = AccordionHeading;
	exports.accordion = [Accordion, AccordionGroup, AccordionHeading];


/***/ },

/***/ 402:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var Alert = (function () {
	    function Alert(el) {
	        this.el = el;
	        this.close = new angular2_1.EventEmitter();
	        this.classes = [];
	        this.closeable = this.closeable || el.nativeElement.getAttribute('(close)');
	    }
	    Object.defineProperty(Alert.prototype, "dismissible", {
	        get: function () {
	            return this.closeable;
	        },
	        set: function (v) {
	            this.closeable = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Alert.prototype.onInit = function () {
	        this.type = this.type || 'warning';
	        this.classes[0] = 'alert-' + (this.type || 'warning');
	        if (this.closeable) {
	            this.classes[1] = 'alert-dismissible';
	        }
	        else {
	            this.classes.length = 1;
	        }
	        if (this.dismissOnTimeout) {
	            var close_1 = this.onClose.bind(this);
	            setTimeout(close_1, this.dismissOnTimeout);
	        }
	    };
	    Alert.prototype.onClose = function () {
	        this.close.next(this);
	        this.closed = true;
	    };
	    Alert = __decorate([
	        angular2_1.Component({
	            selector: 'alert',
	            inputs: ['type', 'dismissible', 'dismissOnTimeout'],
	            outputs: ['close']
	        }),
	        angular2_1.View({
	            template: "\n  <div class=\"alert\" role=\"alert\" [ng-class]=\"classes\" *ng-if=\"!closed\">\n    <button *ng-if=\"closeable\" type=\"button\" class=\"close\" (click)=\"onClose($event)\">\n      <span aria-hidden=\"true\">&times;</span>\n      <span class=\"sr-only\">Close</span>\n    </button>\n    <ng-content></ng-content>\n  </div>\n  ",
	            directives: [angular2_1.NgIf, angular2_1.NgClass]
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef])
	    ], Alert);
	    return Alert;
	})();
	exports.Alert = Alert;


/***/ },

/***/ 403:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(6);
	var ButtonCheckbox = (function () {
	    function ButtonCheckbox(cd) {
	        this.cd = cd;
	        this.state = false;
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        cd.valueAccessor = this;
	    }
	    ButtonCheckbox.prototype.onInit = function () {
	        this.toggle(this.trueValue === this.value);
	    };
	    Object.defineProperty(ButtonCheckbox.prototype, "trueValue", {
	        get: function () {
	            return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ButtonCheckbox.prototype, "falseValue", {
	        get: function () {
	            return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ButtonCheckbox.prototype.toggle = function (state) {
	        this.state = state;
	        this.value = this.state ? this.trueValue : this.falseValue;
	    };
	    ButtonCheckbox.prototype.onClick = function () {
	        this.toggle(!this.state);
	        this.cd.viewToModelUpdate(this.value);
	    };
	    ButtonCheckbox.prototype.writeValue = function (value) {
	        this.state = this.trueValue === value;
	        this.value = value;
	    };
	    ButtonCheckbox.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    ButtonCheckbox.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    ButtonCheckbox = __decorate([
	        angular2_1.Directive({
	            selector: '[btn-checkbox][ng-model]',
	            properties: ['btnCheckboxTrue', 'btnCheckboxFalse'],
	            host: {
	                '(click)': 'onClick()',
	                '[class.active]': 'state'
	            }
	        }),
	        __param(0, angular2_1.Self()), 
	        __metadata('design:paramtypes', [angular2_1.NgModel])
	    ], ButtonCheckbox);
	    return ButtonCheckbox;
	})();
	exports.ButtonCheckbox = ButtonCheckbox;


/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(6);
	var ButtonRadio = (function () {
	    function ButtonRadio(cd, el) {
	        this.cd = cd;
	        this.el = el;
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        cd.valueAccessor = this;
	    }
	    ButtonRadio.prototype.onInit = function () {
	        this.uncheckable = typeof this.uncheckable !== 'undefined';
	    };
	    Object.defineProperty(ButtonRadio.prototype, "isActive", {
	        get: function () {
	            return this.btnRadio === this.value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ButtonRadio.prototype, "value", {
	        get: function () {
	            return this.cd.viewModel;
	        },
	        set: function (value) {
	            this.cd.viewModel = value;
	            if (this.isActive) {
	                this.el.nativeElement.classList.add('active');
	            }
	            else {
	                this.el.nativeElement.classList.remove('active');
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ButtonRadio.prototype.onClick = function () {
	        if (this.uncheckable && this.btnRadio === this.value) {
	            return this.cd.viewToModelUpdate(null);
	        }
	        this.cd.viewToModelUpdate(this.btnRadio);
	    };
	    ButtonRadio.prototype.writeValue = function (value) {
	        this.value = value;
	    };
	    ButtonRadio.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    ButtonRadio.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    ButtonRadio = __decorate([
	        angular2_1.Directive({
	            selector: '[btn-radio][ng-model]',
	            properties: ['btnRadio', 'uncheckable'],
	            host: {
	                '(click)': 'onClick()',
	                '[class.active]': 'isActive'
	            }
	        }),
	        __param(0, angular2_1.Self()), 
	        __metadata('design:paramtypes', [angular2_1.NgModel, angular2_1.ElementRef])
	    ], ButtonRadio);
	    return ButtonRadio;
	})();
	exports.ButtonRadio = ButtonRadio;


/***/ },

/***/ 405:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var ng2_bootstrap_config_1 = __webpack_require__(127);
	(function (Direction) {
	    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
	    Direction[Direction["NEXT"] = 1] = "NEXT";
	    Direction[Direction["PREV"] = 2] = "PREV";
	})(exports.Direction || (exports.Direction = {}));
	var Direction = exports.Direction;
	var NAVIGATION = (_a = {},
	    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = "\n<a class=\"left carousel-control\" (click)=\"prev()\" [hidden]=\"!slides.length\">\n  <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n  <span class=\"sr-only\">Previous</span>\n</a>\n<a class=\"right carousel-control\" (click)=\"next()\" [hidden]=\"!slides.length\">\n  <span class=\"icon-next\" aria-hidden=\"true\"></span>\n  <span class=\"sr-only\">Next</span>\n</a>\n  ",
	    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = "\n<a class=\"left carousel-control\" (click)=\"prev()\" [hidden]=\"!slides.length\">\n  <span class=\"glyphicon glyphicon-chevron-left\"></span>\n</a>\n<a class=\"right carousel-control\" (click)=\"next()\" [hidden]=\"!slides.length\">\n  <span class=\"glyphicon glyphicon-chevron-right\"></span>\n</a>\n  ",
	    _a
	);
	var Carousel = (function () {
	    function Carousel() {
	        this.slides = [];
	        this.destroyed = false;
	    }
	    Carousel.prototype.onDestroy = function () {
	        this.destroyed = true;
	    };
	    Object.defineProperty(Carousel.prototype, "interval", {
	        get: function () {
	            return this._interval;
	        },
	        set: function (value) {
	            this._interval = value;
	            this.restartTimer();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Carousel.prototype.select = function (nextSlide, direction) {
	        if (direction === void 0) { direction = Direction.UNKNOWN; }
	        var nextIndex = nextSlide.index;
	        if (direction === Direction.UNKNOWN) {
	            direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
	        }
	        if (nextSlide && nextSlide !== this.currentSlide) {
	            this.goNext(nextSlide, direction);
	        }
	    };
	    Carousel.prototype.goNext = function (slide, direction) {
	        if (this.destroyed) {
	            return;
	        }
	        slide.direction = direction;
	        slide.active = true;
	        if (this.currentSlide) {
	            this.currentSlide.direction = direction;
	            this.currentSlide.active = false;
	        }
	        this.currentSlide = slide;
	        this.restartTimer();
	    };
	    Carousel.prototype.getSlideByIndex = function (index) {
	        var len = this.slides.length;
	        for (var i = 0; i < len; ++i) {
	            if (this.slides[i].index === index) {
	                return this.slides[i];
	            }
	        }
	    };
	    Carousel.prototype.getCurrentIndex = function () {
	        return !this.currentSlide ? 0 : this.currentSlide.index;
	    };
	    Carousel.prototype.next = function () {
	        var newIndex = (this.getCurrentIndex() + 1) % this.slides.length;
	        if (newIndex === 0 && this.noWrap) {
	            this.pause();
	            return;
	        }
	        return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
	    };
	    Carousel.prototype.prev = function () {
	        var newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;
	        if (this.noWrap && newIndex === this.slides.length - 1) {
	            this.pause();
	            return;
	        }
	        return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
	    };
	    Carousel.prototype.restartTimer = function () {
	        var _this = this;
	        this.resetTimer();
	        var interval = +this.interval;
	        if (!isNaN(interval) && interval > 0) {
	            this.currentInterval = setInterval(function () {
	                var nInterval = +_this.interval;
	                if (_this.isPlaying && !isNaN(_this.interval) && nInterval > 0 && _this.slides.length) {
	                    _this.next();
	                }
	                else {
	                    _this.pause();
	                }
	            }, interval);
	        }
	    };
	    Carousel.prototype.resetTimer = function () {
	        if (this.currentInterval) {
	            clearInterval(this.currentInterval);
	            this.currentInterval = null;
	        }
	    };
	    Carousel.prototype.play = function () {
	        if (!this.isPlaying) {
	            this.isPlaying = true;
	            this.restartTimer();
	        }
	    };
	    Carousel.prototype.pause = function () {
	        if (!this.noPause) {
	            this.isPlaying = false;
	            this.resetTimer();
	        }
	    };
	    Carousel.prototype.addSlide = function (slide) {
	        slide.index = this.slides.length;
	        this.slides.push(slide);
	        if (this.slides.length === 1 || slide.active) {
	            this.select(this.slides[this.slides.length - 1]);
	            if (this.slides.length === 1) {
	                this.play();
	            }
	        }
	        else {
	            slide.active = false;
	        }
	    };
	    Carousel.prototype.removeSlide = function (slide) {
	        this.slides.splice(slide.index, 1);
	        if (this.slides.length === 0) {
	            this.currentSlide = null;
	            return;
	        }
	        for (var i = 0; i < this.slides.length; i++) {
	            this.slides[i].index = i;
	        }
	    };
	    Carousel = __decorate([
	        angular2_1.Component({
	            selector: 'carousel, [carousel]',
	            properties: ['interval', 'noTransition', 'noPause', 'noWrap']
	        }),
	        angular2_1.View({
	            template: "\n<div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" class=\"carousel slide\">\n  <ol class=\"carousel-indicators\" [hidden]=\"slides.length <= 1\">\n     <li *ng-for=\"#slidez of slides\" [ng-class]=\"{active: slidez.active === true}\" (click)=\"select(slidez)\"></li>\n  </ol>\n  <div class=\"carousel-inner\"><ng-content></ng-content></div>\n  " + NAVIGATION[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme] + "\n</div>\n  ",
	            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.NgClass]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Carousel);
	    return Carousel;
	})();
	exports.Carousel = Carousel;
	var Slide = (function () {
	    function Slide(carousel) {
	        this.carousel = carousel;
	    }
	    Slide.prototype.onInit = function () {
	        this.carousel.addSlide(this);
	    };
	    Slide.prototype.onDestroy = function () {
	        this.carousel.removeSlide(this);
	    };
	    Slide = __decorate([
	        angular2_1.Component({
	            selector: 'slide, [slide]',
	            properties: ['direction', 'active', 'index'],
	            host: {
	                '[class.active]': 'active',
	                '[class.item]': 'true',
	                '[class.carousel-item]': 'true'
	            }
	        }),
	        angular2_1.View({
	            template: "\n  <div [ng-class]=\"{active: active}\" class=\"item text-center\">\n    <ng-content></ng-content>\n  </div>\n  ",
	            directives: [angular2_1.NgClass]
	        }), 
	        __metadata('design:paramtypes', [Carousel])
	    ], Slide);
	    return Slide;
	})();
	exports.Slide = Slide;
	exports.carousel = [Carousel, Slide];
	var _a;


/***/ },

/***/ 406:
/***/ function(module, exports, __webpack_require__) {

	var dropdown_1 = __webpack_require__(75);
	var dropdown_menu_1 = __webpack_require__(207);
	var dropdown_toggle_1 = __webpack_require__(209);
	exports.dropdown = [dropdown_1.Dropdown, dropdown_menu_1.DropdownMenu, dropdown_toggle_1.DropdownToggle];


/***/ },

/***/ 407:
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(6);
	var paginationConfig = {
	    maxSize: void 0,
	    itemsPerPage: 10,
	    boundaryLinks: false,
	    directionLinks: true,
	    firstText: 'First',
	    previousText: 'Previous',
	    nextText: 'Next',
	    lastText: 'Last',
	    rotate: true
	};
	var Pagination = (function () {
	    function Pagination(cd, renderer, elementRef) {
	        this.cd = cd;
	        this.renderer = renderer;
	        this.elementRef = elementRef;
	        this.numPages = new angular2_1.EventEmitter();
	        this.pageChanged = new angular2_1.EventEmitter();
	        this.inited = false;
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        cd.valueAccessor = this;
	        this.config = this.config || paginationConfig;
	    }
	    Object.defineProperty(Pagination.prototype, "itemsPerPage", {
	        get: function () {
	            return this._itemsPerPage;
	        },
	        set: function (v) {
	            this._itemsPerPage = v;
	            this.totalPages = this.calculateTotalPages();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pagination.prototype, "totalItems", {
	        get: function () {
	            return this._totalItems;
	        },
	        set: function (v) {
	            this._totalItems = v;
	            this.totalPages = this.calculateTotalPages();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pagination.prototype, "totalPages", {
	        get: function () {
	            return this._totalPages;
	        },
	        set: function (v) {
	            this._totalPages = v;
	            this.numPages.next(v);
	            if (this.inited) {
	                this.selectPage(this.page);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pagination.prototype, "page", {
	        get: function () {
	            return this._page;
	        },
	        set: function (value) {
	            this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
	            this.pageChanged.next({
	                page: this._page,
	                itemsPerPage: this.itemsPerPage
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Pagination.prototype.onInit = function () {
	        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
	        this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
	        this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
	        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
	        this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;
	        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
	        this.totalPages = this.calculateTotalPages();
	        this.pages = this.getPages(this.page, this.totalPages);
	        this.page = this.cd.value;
	        this.inited = true;
	    };
	    Pagination.prototype.writeValue = function (value) {
	        this.page = value;
	        this.pages = this.getPages(this.page, this.totalPages);
	    };
	    Pagination.prototype.selectPage = function (page, event) {
	        if (event) {
	            event.preventDefault();
	        }
	        if (!this.disabled) {
	            if (event && event.target) {
	                var target = event.target;
	                target.blur();
	            }
	            this.writeValue(page);
	            this.cd.viewToModelUpdate(this.page);
	        }
	    };
	    Pagination.prototype.getText = function (key) {
	        return this[key + 'Text'] || paginationConfig[key + 'Text'];
	    };
	    Pagination.prototype.noPrevious = function () {
	        return this.page === 1;
	    };
	    Pagination.prototype.noNext = function () {
	        return this.page === this.totalPages;
	    };
	    Pagination.prototype.makePage = function (number, text, isActive) {
	        return {
	            number: number,
	            text: text,
	            active: isActive
	        };
	    };
	    Pagination.prototype.getPages = function (currentPage, totalPages) {
	        var pages = [];
	        var startPage = 1;
	        var endPage = totalPages;
	        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
	        if (isMaxSized) {
	            if (this.rotate) {
	                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
	                endPage = startPage + this.maxSize - 1;
	                if (endPage > totalPages) {
	                    endPage = totalPages;
	                    startPage = endPage - this.maxSize + 1;
	                }
	            }
	            else {
	                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
	                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
	            }
	        }
	        for (var number = startPage; number <= endPage; number++) {
	            var page = this.makePage(number, number.toString(), number === currentPage);
	            pages.push(page);
	        }
	        if (isMaxSized && !this.rotate) {
	            if (startPage > 1) {
	                var previousPageSet = this.makePage(startPage - 1, '...', false);
	                pages.unshift(previousPageSet);
	            }
	            if (endPage < totalPages) {
	                var nextPageSet = this.makePage(endPage + 1, '...', false);
	                pages.push(nextPageSet);
	            }
	        }
	        return pages;
	    };
	    Pagination.prototype.calculateTotalPages = function () {
	        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
	        return Math.max(totalPages || 0, 1);
	    };
	    Pagination.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    Pagination.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    Pagination = __decorate([
	        angular2_1.Component({
	            selector: 'pagination[ng-model], [pagination][ng-model]',
	            properties: [
	                'rotate', 'disabled',
	                'totalItems', 'itemsPerPage', 'maxSize',
	                'boundaryLinks', 'directionLinks',
	                'firstText', 'previousText', 'nextText', 'lastText'
	            ],
	            events: ['numPages', 'pageChanged']
	        }),
	        angular2_1.View({
	            template: "\n  <ul class=\"pagination\" [ng-class]=\"classMap\">\n    <li class=\"pagination-first\"\n        [ng-class]=\"{disabled: noPrevious()||disabled, hidden: !boundaryLinks}\"\n        [hidden]=\"!boundaryLinks\">\n      <a href (click)=\"selectPage(1, $event)\">{{getText('first')}}</a>\n    </li>\n\n    <li class=\"pagination-prev\"\n        [ng-class]=\"{disabled: noPrevious()||disabled, hidden: !directionLinks}\"\n        [hidden]=\"!directionLinks\">\n      <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n\n    <li *ng-for=\"#pg of pages\"\n    [ng-class]=\"{active: pg.active, disabled: disabled&&!pg.active}\"\n    class=\"pagination-page\">\n      <a href (click)=\"selectPage(pg.number, $event)\">{{pg.text}}</a>\n    </li>\n\n    <li class=\"pagination-next\"\n        [ng-class]=\"{disabled: noNext()||disabled, hidden: !directionLinks}\"\n        [hidden]=\"!directionLinks\">\n      <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a></li>\n\n    <li class=\"pagination-last\"\n        [ng-class]=\"{disabled: noNext()||disabled, hidden: !boundaryLinks}\"\n        [hidden]=\"!boundaryLinks\">\n      <a href (click)=\"selectPage(totalPages, $event)\">{{getText('last')}}</a></li>\n  </ul>\n  ",
	            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.NgClass],
	            encapsulation: angular2_1.ViewEncapsulation.None
	        }),
	        __param(0, angular2_1.Self()), 
	        __metadata('design:paramtypes', [angular2_1.NgModel, angular2_1.Renderer, angular2_1.ElementRef])
	    ], Pagination);
	    return Pagination;
	})();
	exports.Pagination = Pagination;
	var pagerConfig = {
	    itemsPerPage: 10,
	    previousText: '« Previous',
	    nextText: 'Next »',
	    align: true
	};
	var Pager = (function (_super) {
	    __extends(Pager, _super);
	    function Pager(cd, renderer, elementRef) {
	        _super.call(this, cd, renderer, elementRef);
	        this.align = pagerConfig.align;
	        this.config = pagerConfig;
	    }
	    Pager = __decorate([
	        angular2_1.Component({
	            selector: 'pager[ng-model], [pager][ng-model]',
	            properties: [
	                'align',
	                'totalItems', 'itemsPerPage',
	                'previousText', 'nextText',
	            ]
	        }),
	        angular2_1.View({
	            template: "\n    <ul class=\"pager\">\n      <li [ng-class]=\"{disabled: noPrevious(), previous: align, 'pull-left': align}\"><a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a></li>\n      <li [ng-class]=\"{disabled: noNext(), next: align, 'pull-right': align}\"><a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a></li>\n  </ul>\n  ",
	            directives: [angular2_1.NgClass]
	        }),
	        __param(0, angular2_1.Self()), 
	        __metadata('design:paramtypes', [angular2_1.NgModel, angular2_1.Renderer, angular2_1.ElementRef])
	    ], Pager);
	    return Pager;
	})(Pagination);
	exports.Pager = Pager;
	exports.pagination = [Pagination, Pager];


/***/ },

/***/ 408:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(6);
	var progressConfig = {
	    animate: true,
	    max: 100
	};
	var Progress = (function () {
	    function Progress() {
	        this.bars = [];
	    }
	    Progress.prototype.onInit = function () {
	        this.animate = this.animate !== false;
	        this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
	    };
	    Object.defineProperty(Progress.prototype, "max", {
	        get: function () {
	            return this._max;
	        },
	        set: function (v) {
	            this._max = v;
	            this.bars.forEach(function (bar) {
	                bar.recalculatePercentage();
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Progress.prototype.addBar = function (bar) {
	        if (!this.animate) {
	            bar.transition = 'none';
	        }
	        this.bars.push(bar);
	    };
	    Progress.prototype.removeBar = function (bar) {
	        this.bars.splice(this.bars.indexOf(bar), 1);
	    };
	    Progress = __decorate([
	        angular2_1.Directive({
	            selector: 'bs-progress, [progress]',
	            properties: ['animate', 'max'],
	            host: {
	                'class': 'progress',
	                '[attr.max]': 'max'
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Progress);
	    return Progress;
	})();
	exports.Progress = Progress;
	var Bar = (function () {
	    function Bar(progress) {
	        this.progress = progress;
	        this.percent = 0;
	    }
	    Bar.prototype.onInit = function () {
	        this.progress.addBar(this);
	    };
	    Bar.prototype.onDestroy = function () {
	        this.progress.removeBar(this);
	    };
	    Object.defineProperty(Bar.prototype, "value", {
	        get: function () {
	            return this._value;
	        },
	        set: function (v) {
	            if (!v && v !== 0) {
	                return;
	            }
	            this._value = v;
	            this.recalculatePercentage();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Bar.prototype.recalculatePercentage = function () {
	        this.percent = +(100 * this.value / this.progress.max).toFixed(2);
	        var totalPercentage = this.progress.bars.reduce(function (total, bar) {
	            return total + bar.percent;
	        }, 0);
	        if (totalPercentage > 100) {
	            this.percent -= totalPercentage - 100;
	        }
	    };
	    Bar = __decorate([
	        angular2_1.Component({
	            selector: 'bar, [bar]',
	            properties: ['type', 'value']
	        }),
	        angular2_1.View({
	            template: "\n  <div class=\"progress-bar\"\n    style=\"min-width: 0;\"\n    role=\"progressbar\"\n    [ng-class]=\"type && 'progress-bar-' + type\"\n    [ng-style]=\"{width: (percent < 100 ? percent : 100) + '%', transition: transition}\"\n    aria-valuemin=\"0\"\n    [attr.aria-valuenow]=\"value\"\n    [attr.aria-valuetext]=\"percent.toFixed(0) + '%'\"\n    [attr.aria-valuemax]=\"max\"\n    ><ng-content></ng-content></div>\n",
	            directives: [angular2_1.NgStyle, angular2_1.NgClass],
	            encapsulation: angular2_1.ViewEncapsulation.None
	        }),
	        __param(0, angular2_1.Host()), 
	        __metadata('design:paramtypes', [Progress])
	    ], Bar);
	    return Bar;
	})();
	exports.Bar = Bar;
	var Progressbar = (function () {
	    function Progressbar() {
	    }
	    Progressbar = __decorate([
	        angular2_1.Component({
	            selector: 'progressbar, [progressbar]',
	            properties: ['animate', 'max', 'type', 'value']
	        }),
	        angular2_1.View({
	            template: "\n    <div progress [animate]=\"animate\" [max]=\"max\">\n      <bar [type]=\"type\" [value]=\"value\">\n          <ng-content></ng-content>\n      </bar>\n    </div>\n  ",
	            directives: [Progress, Bar]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Progressbar);
	    return Progressbar;
	})();
	exports.Progressbar = Progressbar;
	exports.progressbar = [Progress, Bar, Progressbar];


/***/ },

/***/ 409:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(6);
	var Rating = (function () {
	    function Rating(cd) {
	        this.cd = cd;
	        this.onHover = new angular2_1.EventEmitter();
	        this.onLeave = new angular2_1.EventEmitter();
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        cd.valueAccessor = this;
	    }
	    Rating.prototype.onInit = function () {
	        this.max = typeof this.max !== 'undefined' ? this.max : 5;
	        this.readonly = this.readonly === true;
	        this.stateOn = typeof this.stateOn !== 'undefined' ? this.stateOn : 'glyphicon-star';
	        this.stateOff = typeof this.stateOff !== 'undefined' ? this.stateOff : 'glyphicon-star-empty';
	        this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0 ? this.titles : ['one', 'two', 'three', 'four', 'five'];
	        this.range = this.buildTemplateObjects(this.ratingStates, this.max);
	    };
	    Rating.prototype.writeValue = function (value) {
	        if (value % 1 !== value) {
	            this.value = Math.round(value);
	            this.preValue = value;
	            return;
	        }
	        this.preValue = value;
	        this.value = value;
	    };
	    Rating.prototype.buildTemplateObjects = function (ratingStates, max) {
	        ratingStates = ratingStates || [];
	        var count = ratingStates.length || max;
	        var result = [];
	        for (var i = 0; i < count; i++) {
	            result.push(Object.assign({
	                index: i,
	                stateOn: this.stateOn,
	                stateOff: this.stateOff,
	                title: this.titles[i] || i + 1
	            }, ratingStates[i] || {}));
	        }
	        return result;
	    };
	    Rating.prototype.rate = function (value) {
	        if (!this.readonly && value >= 0 && value <= this.range.length) {
	            this.writeValue(value);
	            this.cd.viewToModelUpdate(value);
	        }
	    };
	    Rating.prototype.enter = function (value) {
	        if (!this.readonly) {
	            this.value = value;
	            this.onHover.next(value);
	        }
	    };
	    Rating.prototype.reset = function () {
	        this.value = this.preValue;
	        this.onLeave.next(this.value);
	    };
	    Rating.prototype.onKeydown = function (event) {
	        if ([37, 38, 39, 40].indexOf(event.which) === -1) {
	            return;
	        }
	        event.preventDefault();
	        event.stopPropagation();
	        var sign = event.which === 38 || event.which === 39 ? 1 : -1;
	        this.rate(this.value + sign);
	    };
	    Rating.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    Rating.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    Rating = __decorate([
	        angular2_1.Component({
	            selector: 'rating[ng-model]',
	            properties: [
	                'max', 'readonly', 'titles',
	                'stateOn', 'stateOff',
	                'ratingStates'
	            ],
	            events: ['onHover', 'onLeave'],
	            host: {
	                '(keydown)': 'onKeydown($event)'
	            }
	        }),
	        angular2_1.View({
	            template: "\n    <span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"range.length\" [attr.aria-valuenow]=\"value\">\n      <template ng-for #r [ng-for-of]=\"range\" #index=\"index\">\n        <span class=\"sr-only\">({{ index < value ? '*' : ' ' }})</span>\n        <i (mouseenter)=\"enter(index + 1)\" (click)=\"rate(index + 1)\" class=\"glyphicon\" [ng-class]=\"index < value ? r.stateOn : r.stateOff\" [title]=\"r.title\" ></i>\n      </template>\n    </span>\n  ",
	            directives: [angular2_1.NgClass, angular2_1.NgFor]
	        }),
	        __param(0, angular2_1.Self()), 
	        __metadata('design:paramtypes', [angular2_1.NgModel])
	    ], Rating);
	    return Rating;
	})();
	exports.Rating = Rating;


/***/ },

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var common_1 = __webpack_require__(206);
	var Tabset = (function () {
	    function Tabset() {
	        this.tabs = [];
	    }
	    Object.defineProperty(Tabset.prototype, "classMap", {
	        get: function () {
	            var map = {
	                'nav-stacked': this.vertical,
	                'nav-justified': this.justified
	            };
	            map['nav-' + (this.type || 'tabs')] = true;
	            return map;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Tabset.prototype.onInit = function () {
	        this.type = this.type !== 'undefined' ? this.type : 'tabs';
	    };
	    Tabset.prototype.addTab = function (tab) {
	        this.tabs.push(tab);
	        tab.active = this.tabs.length === 1 && tab.active !== false;
	    };
	    Tabset.prototype.removeTab = function (tab) {
	        var index = this.tabs.indexOf(tab);
	        if (index === -1) {
	            return;
	        }
	        if (tab.active && this.tabs.length > 1) {
	            var newActiveIndex = index === this.tabs.length - 1 ? index - 1 : index + 1;
	            this.tabs[newActiveIndex].active = true;
	        }
	        this.tabs.slice(index, 1);
	    };
	    Tabset = __decorate([
	        angular2_1.Component({
	            selector: 'tabset',
	            properties: ['vertical', 'justified', 'type']
	        }),
	        angular2_1.View({
	            template: "\n    <ul class=\"nav\" [ng-class]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ng-for=\"#tabz of tabs\" class=\"nav-item\" [ng-class]=\"{active: tabz.active, disabled: tabz.disabled}\">\n          <a href class=\"nav-link\" [ng-class]=\"{active: tabz.active, disabled: tabz.disabled}\" (click)=\"tabz.active = true\">\n            <span [ng-transclude]=\"tabz.headingRef\">{{tabz.heading}}</span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-content></ng-content>\n    </div>\n  ",
	            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.NgClass, common_1.NgTransclude]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Tabset);
	    return Tabset;
	})();
	exports.Tabset = Tabset;
	var Tab = (function () {
	    function Tab(tabset) {
	        this.tabset = tabset;
	        this.select = new angular2_1.EventEmitter();
	        this.deselect = new angular2_1.EventEmitter();
	        this.tabset.addTab(this);
	    }
	    Object.defineProperty(Tab.prototype, "disable", {
	        get: function () {
	            return this.disabled;
	        },
	        set: function (v) {
	            console.warn('DEPRECATED use `disabled` property (not `disable`)');
	            this.disabled = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Tab.prototype, "active", {
	        get: function () {
	            return this._active;
	        },
	        set: function (active) {
	            var _this = this;
	            if (this.disabled && active || !active) {
	                if (!active) {
	                    this._active = active;
	                }
	                this.deselect.next(this);
	                return;
	            }
	            this._active = active;
	            this.select.next(this);
	            this.tabset.tabs.forEach(function (tab) {
	                if (tab !== _this) {
	                    tab.active = false;
	                }
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Tab.prototype.doCheck = function () {
	        return true;
	    };
	    Tab.prototype.onInit = function () {
	    };
	    Tab.prototype.onDestroy = function () {
	        this.tabset.removeTab(this);
	    };
	    Tab = __decorate([
	        angular2_1.Directive({
	            selector: 'tab, [tab]',
	            properties: ['active', 'disable', 'disabled', 'heading'],
	            events: ['select', 'deselect'],
	            host: {
	                '[class.tab-pane]': 'true',
	                '[class.active]': 'active'
	            }
	        }), 
	        __metadata('design:paramtypes', [Tabset])
	    ], Tab);
	    return Tab;
	})();
	exports.Tab = Tab;
	var TabHeading = (function () {
	    function TabHeading(templateRef, tab) {
	        this.templateRef = templateRef;
	        tab.headingRef = templateRef;
	    }
	    TabHeading = __decorate([
	        angular2_1.Directive({ selector: '[tab-heading]' }), 
	        __metadata('design:paramtypes', [angular2_1.TemplateRef, Tab])
	    ], TabHeading);
	    return TabHeading;
	})();
	exports.TabHeading = TabHeading;
	exports.tabs = [Tab, TabHeading, Tabset];


/***/ },

/***/ 411:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(6);
	exports.timepickerConfig = {
	    hourStep: 1,
	    minuteStep: 1,
	    showMeridian: true,
	    meridians: null,
	    readonlyInput: false,
	    mousewheel: true,
	    arrowkeys: true,
	    showSpinners: true,
	    min: void 0,
	    max: void 0
	};
	function isDefined(value) {
	    return typeof value !== 'undefined';
	}
	function def(value, fn, defaultValue) {
	    return fn(value) ? value : defaultValue;
	}
	function addMinutes(date, minutes) {
	    var dt = new Date(date.getTime() + minutes * 60000);
	    var newDate = new Date(date);
	    newDate.setHours(dt.getHours(), dt.getMinutes());
	    return newDate;
	}
	var Timepicker = (function () {
	    function Timepicker(cd) {
	        this.cd = cd;
	        this._selected = new Date();
	        this.meridians = ['AM', 'PM'];
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        cd.valueAccessor = this;
	    }
	    Object.defineProperty(Timepicker.prototype, "selected", {
	        get: function () {
	            return this._selected;
	        },
	        set: function (v) {
	            if (v) {
	                this._selected = v;
	                this.updateTemplate();
	                this.cd.viewToModelUpdate(this.selected);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Timepicker.prototype, "showMeridian", {
	        get: function () {
	            return this._showMeridian;
	        },
	        set: function (value) {
	            this._showMeridian = value;
	            if (true) {
	                this.updateTemplate();
	                return;
	            }
	            var hours = this.getHoursFromTemplate();
	            var minutes = this.getMinutesFromTemplate();
	            if (isDefined(hours) && isDefined(minutes)) {
	                this.selected.setHours(hours);
	                this.refresh();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Timepicker.prototype.onInit = function () {
	        this.meridians = def(this.meridians, isDefined, exports.timepickerConfig.meridians) || ['AM', 'PM'];
	        this.mousewheel = def(this.mousewheel, isDefined, exports.timepickerConfig.mousewheel);
	        if (this.mousewheel) {
	            this.setupMousewheelEvents();
	        }
	        this.arrowkeys = def(this.arrowkeys, isDefined, exports.timepickerConfig.arrowkeys);
	        if (this.arrowkeys) {
	            this.setupArrowkeyEvents();
	        }
	        this.readonlyInput = def(this.readonlyInput, isDefined, exports.timepickerConfig.readonlyInput);
	        this.setupInputEvents();
	        this.hourStep = def(this.hourStep, isDefined, exports.timepickerConfig.hourStep);
	        this.minuteStep = def(this.minuteStep, isDefined, exports.timepickerConfig.minuteStep);
	        this.min = def(this.min, isDefined, exports.timepickerConfig.min);
	        this.max = def(this.max, isDefined, exports.timepickerConfig.max);
	        this.showMeridian = def(this.showMeridian, isDefined, exports.timepickerConfig.showMeridian);
	        this.showSpinners = def(this.showSpinners, isDefined, exports.timepickerConfig.showSpinners);
	    };
	    Timepicker.prototype.writeValue = function (v) {
	        if (v === this.selected) {
	            return;
	        }
	        if (v && v instanceof Date) {
	            this.selected = v;
	            return;
	        }
	        this.selected = v ? new Date(v) : null;
	    };
	    Timepicker.prototype.refresh = function (type) {
	        this.updateTemplate();
	        this.cd.viewToModelUpdate(this.selected);
	    };
	    Timepicker.prototype.updateTemplate = function (keyboardChange) {
	        var hours = this.selected.getHours();
	        var minutes = this.selected.getMinutes();
	        if (this.showMeridian) {
	            hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
	        }
	        this.hours = this.pad(hours);
	        this.minutes = this.pad(minutes);
	        this.meridian = this.selected.getHours() < 12 ? this.meridians[0] : this.meridians[1];
	    };
	    Timepicker.prototype.getHoursFromTemplate = function () {
	        var hours = parseInt(this.hours, 10);
	        var valid = this.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
	        if (!valid) {
	            return undefined;
	        }
	        if (this.showMeridian) {
	            if (hours === 12) {
	                hours = 0;
	            }
	            if (this.meridian === this.meridians[1]) {
	                hours = hours + 12;
	            }
	        }
	        return hours;
	    };
	    Timepicker.prototype.getMinutesFromTemplate = function () {
	        var minutes = parseInt(this.minutes, 10);
	        return (minutes >= 0 && minutes < 60) ? minutes : undefined;
	    };
	    Timepicker.prototype.pad = function (value) {
	        return (isDefined(value) && value.toString().length < 2) ? '0' + value : value.toString();
	    };
	    Timepicker.prototype.setupMousewheelEvents = function () {
	    };
	    Timepicker.prototype.setupArrowkeyEvents = function () {
	    };
	    Timepicker.prototype.setupInputEvents = function () {
	    };
	    Timepicker.prototype.updateHours = function () {
	        if (this.readonlyInput) {
	            return;
	        }
	        var hours = this.getHoursFromTemplate();
	        var minutes = this.getMinutesFromTemplate();
	        if (!isDefined(hours) || !isDefined(minutes)) {
	        }
	        this.selected.setHours(hours);
	        if (this.selected < this.min || this.selected > this.max) {
	        }
	        else {
	            this.refresh('h');
	        }
	    };
	    Timepicker.prototype.hoursOnBlur = function (event) {
	        if (this.readonlyInput) {
	            return;
	        }
	        if (!this.invalidHours && parseInt(this.hours, 10) < 10) {
	            this.hours = this.pad(this.hours);
	        }
	    };
	    Timepicker.prototype.updateMinutes = function () {
	        if (this.readonlyInput) {
	            return;
	        }
	        var minutes = this.getMinutesFromTemplate();
	        var hours = this.getHoursFromTemplate();
	        if (!isDefined(minutes) || !isDefined(hours)) {
	        }
	        this.selected.setMinutes(minutes);
	        if (this.selected < this.min || this.selected > this.max) {
	        }
	        else {
	            this.refresh('m');
	        }
	    };
	    Timepicker.prototype.minutesOnBlur = function (event) {
	        if (this.readonlyInput) {
	            return;
	        }
	        if (!this.invalidMinutes && parseInt(this.minutes, 10) < 10) {
	            this.minutes = this.pad(this.minutes);
	        }
	    };
	    Timepicker.prototype.noIncrementHours = function () {
	        var incrementedSelected = addMinutes(this.selected, this.hourStep * 60);
	        return incrementedSelected > this.max ||
	            (incrementedSelected < this.selected && incrementedSelected < this.min);
	    };
	    Timepicker.prototype.noDecrementHours = function () {
	        var decrementedSelected = addMinutes(this.selected, -this.hourStep * 60);
	        return decrementedSelected < this.min ||
	            (decrementedSelected > this.selected && decrementedSelected > this.max);
	    };
	    Timepicker.prototype.noIncrementMinutes = function () {
	        var incrementedSelected = addMinutes(this.selected, this.minuteStep);
	        return incrementedSelected > this.max ||
	            (incrementedSelected < this.selected && incrementedSelected < this.min);
	    };
	    Timepicker.prototype.noDecrementMinutes = function () {
	        var decrementedSelected = addMinutes(this.selected, -this.minuteStep);
	        return decrementedSelected < this.min ||
	            (decrementedSelected > this.selected && decrementedSelected > this.max);
	    };
	    Timepicker.prototype.addMinutesToSelected = function (minutes) {
	        this.selected = addMinutes(this.selected, minutes);
	        this.refresh();
	    };
	    Timepicker.prototype.noToggleMeridian = function () {
	        if (this.selected.getHours() < 13) {
	            return addMinutes(this.selected, 12 * 60) > this.max;
	        }
	        else {
	            return addMinutes(this.selected, -12 * 60) < this.min;
	        }
	    };
	    Timepicker.prototype.incrementHours = function () {
	        if (!this.noIncrementHours()) {
	            this.addMinutesToSelected(this.hourStep * 60);
	        }
	    };
	    Timepicker.prototype.decrementHours = function () {
	        if (!this.noDecrementHours()) {
	            this.addMinutesToSelected(-this.hourStep * 60);
	        }
	    };
	    Timepicker.prototype.incrementMinutes = function () {
	        if (!this.noIncrementMinutes()) {
	            this.addMinutesToSelected(this.minuteStep);
	        }
	    };
	    Timepicker.prototype.decrementMinutes = function () {
	        if (!this.noDecrementMinutes()) {
	            this.addMinutesToSelected(-this.minuteStep);
	        }
	    };
	    Timepicker.prototype.toggleMeridian = function () {
	        if (!this.noToggleMeridian()) {
	            var sign = this.selected.getHours() < 12 ? 1 : -1;
	            this.addMinutesToSelected(12 * 60 * sign);
	        }
	    };
	    Timepicker.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    Timepicker.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    Timepicker = __decorate([
	        angular2_1.Component({
	            selector: 'timepicker[ng-model]',
	            properties: [
	                'hourStep', 'minuteStep',
	                'meridians', 'showMeridian',
	                'readonlyInput',
	                'mousewheel', 'arrowkeys',
	                'showSpinners',
	                'min', 'max'
	            ]
	        }),
	        angular2_1.View({
	            template: "\n    <table>\n      <tbody>\n        <tr class=\"text-center\" [ng-class]=\"{hidden: !showSpinners}\">\n          <td><a (click)=\"incrementHours()\" [ng-class]=\"{disabled: noIncrementHours()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n          <td>&nbsp;</td>\n          <td><a (click)=\"incrementMinutes()\" [ng-class]=\"{disabled: noIncrementMinutes()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n          <td [ng-class]=\"{hidden: !showMeridian}\" [hidden]=\"!showMeridian\"></td>\n        </tr>\n        <tr>\n          <td class=\"form-group\" [ng-class]=\"{'has-error': invalidHours}\">\n            <input style=\"width:50px;\" type=\"text\" [(ng-model)]=\"hours\" (change)=\"updateHours()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" (blur)=\"hoursOnBlur($event)\" maxlength=\"2\">\n          </td>\n          <td>:</td>\n          <td class=\"form-group\" [ng-class]=\"{'has-error': invalidMinutes}\">\n            <input style=\"width:50px;\" type=\"text\" [(ng-model)]=\"minutes\" (change)=\"updateMinutes()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" (blur)=\"minutesOnBlur($event)\" maxlength=\"2\">\n          </td>\n          <td [ng-class]=\"{hidden: !showMeridian}\" [hidden]=\"!showMeridian\"><button type=\"button\" [ng-class]=\"{disabled: noToggleMeridian()}\" class=\"btn btn-default text-center\" (click)=\"toggleMeridian()\">{{meridian}}</button></td>\n        </tr>\n        <tr class=\"text-center\" [ng-class]=\"{hidden: !showSpinners}\">\n          <td><a (click)=\"decrementHours()\" [ng-class]=\"{disabled: noDecrementHours()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n          <td>&nbsp;</td>\n          <td><a (click)=\"decrementMinutes()\" [ng-class]=\"{disabled: noDecrementMinutes()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n          <td [ng-class]=\"{hidden: !showMeridian}\" [hidden]=\"!showMeridian\"></td>\n        </tr>\n      </tbody>\n    </table>\n  ",
	            directives: [angular2_1.FORM_DIRECTIVES, angular2_1.NgClass]
	        }),
	        __param(0, angular2_1.Self()), 
	        __metadata('design:paramtypes', [angular2_1.NgModel])
	    ], Timepicker);
	    return Timepicker;
	})();
	exports.Timepicker = Timepicker;


/***/ },

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	var angular2_2 = __webpack_require__(6);
	var position_1 = __webpack_require__(128);
	var TooltipOptions = (function () {
	    function TooltipOptions(options) {
	        Object.assign(this, options);
	    }
	    return TooltipOptions;
	})();
	var TooltipContainer = (function () {
	    function TooltipContainer(element, options) {
	        this.element = element;
	        Object.assign(this, options);
	        this.classMap = { 'in': false };
	        this.classMap[options.placement] = true;
	    }
	    TooltipContainer.prototype.position = function (hostEl) {
	        this.display = 'block';
	        this.top = '0px';
	        this.left = '0px';
	        var p = position_1.positionService
	            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, this.appendToBody);
	        this.top = p.top + 'px';
	        this.left = p.left + 'px';
	        this.classMap['in'] = true;
	    };
	    TooltipContainer = __decorate([
	        angular2_1.Component({
	            selector: 'tooltip-container'
	        }),
	        angular2_1.View({
	            template: "\n    <div class=\"tooltip\" role=\"tooltip\"\n     [ng-style]=\"{top: top, left: left, display: display}\"\n     [ng-class]=\"classMap\" >\n      <div class=\"tooltip-arrow\"></div>\n      <div class=\"tooltip-inner\">\n        {{content}}\n      </div>\n    </div>",
	            directives: [angular2_1.NgClass, angular2_1.NgStyle],
	            encapsulation: angular2_1.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef, TooltipOptions])
	    ], TooltipContainer);
	    return TooltipContainer;
	})();
	var Tooltip = (function () {
	    function Tooltip(element, loader) {
	        this.element = element;
	        this.loader = loader;
	        this.visible = false;
	        this.placement = 'top';
	    }
	    Tooltip.prototype.onInit = function () {
	    };
	    Tooltip.prototype.show = function () {
	        var _this = this;
	        if (this.visible) {
	            return;
	        }
	        this.visible = true;
	        var options = new TooltipOptions({
	            content: this.content,
	            placement: this.placement
	        });
	        var binding = angular2_2.Injector.resolve([
	            angular2_2.bind(TooltipOptions).toValue(options)
	        ]);
	        this.tooltip = this.loader
	            .loadNextToLocation(TooltipContainer, this.element, binding)
	            .then(function (componentRef) {
	            componentRef.instance.position(_this.element);
	            return componentRef;
	        });
	    };
	    Tooltip.prototype.hide = function () {
	        if (!this.visible) {
	            return;
	        }
	        this.visible = false;
	        this.tooltip.then(function (componentRef) {
	            componentRef.dispose();
	            return componentRef;
	        });
	    };
	    Tooltip = __decorate([
	        angular2_1.Directive({
	            selector: '[tooltip]',
	            properties: [
	                'content:tooltip',
	                'placement:tooltip-placement',
	                'appendToBody',
	                'isOpen: tooltip-is-open',
	                'enable: tooltip-enable'
	            ],
	            host: {
	                '(mouseenter)': 'show($event, $targe)',
	                '(mouseleave)': 'hide($event, $targe)',
	                '(focusin)': 'show($event, $targe)',
	                '(focusout)': 'hide($event, $targe)'
	            }
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef, angular2_1.DynamicComponentLoader])
	    ], Tooltip);
	    return Tooltip;
	})();
	exports.Tooltip = Tooltip;
	exports.tooltip = [Tooltip, TooltipContainer];


/***/ },

/***/ 413:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(6);
	function setProperty(renderer, elementRef, propName, propValue) {
	    renderer.setElementProperty(elementRef, propName, propValue);
	}
	var angular2_2 = __webpack_require__(6);
	var ng2_bootstrap_config_1 = __webpack_require__(127);
	var position_1 = __webpack_require__(128);
	var TEMPLATE = (_a = {},
	    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = "\n  <div class=\"dropdown-menu\"\n      [ng-style]=\"{top: top, left: left, display: display}\"\n      style=\"display: block\">\n      <a href=\"#\"\n         *ng-for=\"#match of matches\"\n         (click)=\"selectMatch(match, $event)\"\n         [ng-class]=\"{active: isActive(match) }\"\n         (mouseenter)=\"selectActive(match)\"\n         class=\"dropdown-item\"\n         [inner-html]=\"hightlight(match, query)\"></a>\n  </div>\n  ",
	    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = "\n  <ul class=\"dropdown-menu\"\n      [ng-style]=\"{top: top, left: left, display: display}\"\n      style=\"display: block\">\n    <li *ng-for=\"#match of matches\"\n        [ng-class]=\"{active: isActive(match) }\"\n        (mouseenter)=\"selectActive(match)\">\n        <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\" [inner-html]=\"hightlight(match, query)\"></a>\n    </li>\n  </ul>\n  ",
	    _a
	);
	var TypeaheadOptions = (function () {
	    function TypeaheadOptions(options) {
	        Object.assign(this, options);
	    }
	    return TypeaheadOptions;
	})();
	exports.TypeaheadOptions = TypeaheadOptions;
	var TypeaheadContainer = (function () {
	    function TypeaheadContainer(element, options) {
	        this.element = element;
	        this._matches = [];
	        Object.assign(this, options);
	    }
	    Object.defineProperty(TypeaheadContainer.prototype, "matches", {
	        get: function () {
	            return this._matches;
	        },
	        set: function (value) {
	            this._matches = value;
	            if (this._matches.length > 0) {
	                this._active = this._matches[0];
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TypeaheadContainer.prototype.position = function (hostEl) {
	        this.display = 'block';
	        this.top = '0px';
	        this.left = '0px';
	        var p = position_1.positionService
	            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
	        this.top = p.top + 'px';
	        this.left = p.left + 'px';
	    };
	    TypeaheadContainer.prototype.selectActiveMatch = function () {
	        this.selectMatch(this._active);
	    };
	    TypeaheadContainer.prototype.prevActiveMatch = function () {
	        var index = this.matches.indexOf(this._active);
	        this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
	    };
	    TypeaheadContainer.prototype.nextActiveMatch = function () {
	        var index = this.matches.indexOf(this._active);
	        this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
	    };
	    TypeaheadContainer.prototype.selectActive = function (value) {
	        this._active = value;
	    };
	    TypeaheadContainer.prototype.isActive = function (value) {
	        return this._active === value;
	    };
	    TypeaheadContainer.prototype.selectMatch = function (value, e) {
	        if (e === void 0) { e = null; }
	        if (e) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	        this.parent.changeModel(value);
	        this.parent.typeaheadOnSelect.next({
	            item: value
	        });
	        return false;
	    };
	    TypeaheadContainer.prototype.escapeRegexp = function (queryToEscape) {
	        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	    };
	    TypeaheadContainer.prototype.hightlight = function (item, query) {
	        return query ? item.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : item;
	    };
	    ;
	    TypeaheadContainer = __decorate([
	        angular2_1.Component({
	            selector: 'typeahead-container'
	        }),
	        angular2_1.View({
	            template: TEMPLATE[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme],
	            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.NgClass, angular2_1.NgStyle],
	            encapsulation: angular2_1.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef, TypeaheadOptions])
	    ], TypeaheadContainer);
	    return TypeaheadContainer;
	})();
	exports.TypeaheadContainer = TypeaheadContainer;
	var Typeahead = (function () {
	    function Typeahead(cd, element, renderer, loader) {
	        this.cd = cd;
	        this.element = element;
	        this.renderer = renderer;
	        this.loader = loader;
	        this.typeaheadLoading = new angular2_1.EventEmitter();
	        this.typeaheadNoResults = new angular2_1.EventEmitter();
	        this.typeaheadOnSelect = new angular2_1.EventEmitter();
	        this.async = null;
	        this._matches = [];
	        this.placement = 'bottom-left';
	    }
	    Object.defineProperty(Typeahead.prototype, "matches", {
	        get: function () {
	            return this._matches;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Typeahead.prototype.debounce = function (func, wait) {
	        var timeout;
	        var args;
	        var timestamp;
	        var waitOriginal = wait;
	        return function () {
	            args = [].slice.call(arguments, 0);
	            timestamp = Date.now();
	            wait = this.container ? waitOriginal : this.waitMs;
	            var later = function () {
	                var last = Date.now() - timestamp;
	                if (last < wait) {
	                    timeout = setTimeout(later, wait - last);
	                }
	                else {
	                    timeout = null;
	                    func.apply(this, args);
	                }
	            };
	            if (!timeout) {
	                timeout = setTimeout(later, wait);
	            }
	        };
	    };
	    Typeahead.prototype.processMatches = function () {
	        this._matches = [];
	        if (this.cd.model.toString().length >= this.minLength) {
	            for (var i = 0; i < this.source.length; i++) {
	                var match = void 0;
	                if (typeof this.source[i] === 'object' &&
	                    this.source[i][this.field]) {
	                    match = this.source[i][this.field];
	                }
	                if (typeof this.source[i] === 'string') {
	                    match = this.source[i];
	                }
	                if (!match) {
	                    console.log('Invalid match type', typeof this.source[i], this.field);
	                    continue;
	                }
	                if (match.toLowerCase().indexOf(this.cd.model.toString().toLowerCase()) >= 0) {
	                    this._matches.push(match);
	                    if (this._matches.length > this.optionsLimit - 1) {
	                        break;
	                    }
	                }
	            }
	        }
	    };
	    Typeahead.prototype.finalizeAsyncCall = function () {
	        this.typeaheadLoading.next(false);
	        this.typeaheadNoResults.next(this.cd.model.toString().length >=
	            this.minLength && this.matches.length <= 0);
	        if (this.cd.model.toString().length <= 0 || this._matches.length <= 0) {
	            this.hide();
	            return;
	        }
	        if (this.container && this._matches.length > 0) {
	            this.container.query = this.cd.model;
	            this.container.matches = this._matches;
	        }
	        if (!this.container && this._matches.length > 0) {
	            this.show(this._matches);
	        }
	    };
	    Typeahead.prototype.onInit = function () {
	        var _this = this;
	        this.optionsLimit = this.optionsLimit || 20;
	        this.minLength = this.minLength || 1;
	        this.waitMs = this.waitMs || 0;
	        if (this.async === null && typeof this.source !== 'function') {
	            this.async = false;
	        }
	        if (typeof this.source === 'function') {
	            this.async = true;
	        }
	        if (this.async === true) {
	            this.debouncer = this.debounce(function () {
	                if (typeof _this.source === 'function') {
	                    _this.source().then(function (matches) {
	                        _this._matches = [];
	                        if (_this.cd.model.toString().length >= _this.minLength) {
	                            for (var i = 0; i < matches.length; i++) {
	                                _this._matches.push(matches[i]);
	                                if (_this._matches.length > _this.optionsLimit - 1) {
	                                    break;
	                                }
	                            }
	                        }
	                        _this.finalizeAsyncCall();
	                    });
	                }
	                if (typeof _this.source === 'object' && _this.source.length) {
	                    _this.processMatches();
	                    _this.finalizeAsyncCall();
	                }
	            }, 100);
	        }
	    };
	    Typeahead.prototype.onChange = function (e) {
	        if (this.container) {
	            if (e.keyCode === 27) {
	                this.hide();
	                return;
	            }
	            if (e.keyCode === 38) {
	                this.container.prevActiveMatch();
	                return;
	            }
	            if (e.keyCode === 40) {
	                this.container.nextActiveMatch();
	                return;
	            }
	            if (e.keyCode === 13) {
	                this.container.selectActiveMatch();
	                return;
	            }
	        }
	        this.typeaheadLoading.next(true);
	        if (this.async === true) {
	            this.debouncer();
	        }
	        if (this.async === false) {
	            this.processMatches();
	            this.finalizeAsyncCall();
	        }
	    };
	    Typeahead.prototype.changeModel = function (value) {
	        this.cd.viewToModelUpdate(value);
	        setProperty(this.renderer, this.element, 'value', value);
	        this.hide();
	    };
	    Typeahead.prototype.show = function (matches) {
	        var _this = this;
	        var options = new TypeaheadOptions({
	            placement: this.placement,
	            animation: false
	        });
	        var binding = angular2_2.Injector.resolve([
	            angular2_2.bind(TypeaheadOptions).toValue(options)
	        ]);
	        this.popup = this.loader
	            .loadNextToLocation(TypeaheadContainer, this.element, binding)
	            .then(function (componentRef) {
	            componentRef.instance.position(_this.element);
	            _this.container = componentRef.instance;
	            _this.container.parent = _this;
	            _this.container.query = _this.cd.model;
	            _this.container.matches = matches;
	            _this.element.nativeElement.focus();
	            return componentRef;
	        });
	    };
	    Typeahead.prototype.hide = function () {
	        var _this = this;
	        if (this.container) {
	            this.popup.then(function (componentRef) {
	                componentRef.dispose();
	                _this.container = null;
	                return componentRef;
	            });
	        }
	    };
	    Typeahead = __decorate([
	        angular2_1.Directive({
	            selector: 'typeahead, [typeahead]',
	            properties: [
	                'source:typeahead',
	                'appendToBody:typeaheadAppendToBody',
	                'editable:typeaheadEditable',
	                'focusFirst:typeaheadFocusFirst',
	                'inputFormatter:typeaheadInputFormatter',
	                'minLength:typeaheadMinLength',
	                'selectOnExact:typeaheadSelectOnExact',
	                'templateUrl:typeaheadTemplateUrl',
	                'popupTemplateUrl:typeaheadPopupTemplateUrl',
	                'waitMs:typeaheadWaitMs',
	                'optionsLimit:typeaheadOptionsLimit',
	                'selectOnBlur:typeaheadSelectOnBlur',
	                'focusOnSelect:typeaheadFocusOnSelect',
	                'field:typeaheadOptionField',
	                'async:typeaheadAsync'
	            ],
	            events: ['typeaheadLoading', 'typeaheadNoResults', 'typeaheadOnSelect'],
	            host: {
	                '(keyup)': 'onChange($event)'
	            }
	        }), 
	        __metadata('design:paramtypes', [angular2_1.NgModel, angular2_1.ElementRef, angular2_1.Renderer, angular2_1.DynamicComponentLoader])
	    ], Typeahead);
	    return Typeahead;
	})();
	exports.Typeahead = Typeahead;
	exports.typeahead = [Typeahead];
	var _a;


/***/ }

});
//# sourceMappingURL=angular2-charts-demo.js.map