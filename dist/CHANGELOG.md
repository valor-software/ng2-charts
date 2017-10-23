<a name="1.6.0"></a>
# [1.6.0](https://github.com/valor-software/ng2-charts/compare/v1.5.0...v1.6.0) (2017-05-30)


### Features

* **core:** Chart.js is now loaded as a module ([#628](https://github.com/valor-software/ng2-charts/issues/628)) ([6ed93e6](https://github.com/valor-software/ng2-charts/commit/6ed93e6))
* **package:** Allow usage with Angular 4, like was done with ngx-bootstrap ([#748](https://github.com/valor-software/ng2-charts/issues/748)) ([8f59f85](https://github.com/valor-software/ng2-charts/commit/8f59f85))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/valor-software/ng2-charts/compare/v1.4.4...v1.5.0) (2017-01-17)


### Bug Fixes

* **charts:** Make charts dynamic and avoid re-rendering full chart on data change ([905183b](https://github.com/valor-software/ng2-charts/commit/905183b))


### Features

* **package:** relax dependencies ([#543](https://github.com/valor-software/ng2-charts/issues/543)) ([51b581d](https://github.com/valor-software/ng2-charts/commit/51b581d))
* **package:** upgrade to ng v2.3+ ([#574](https://github.com/valor-software/ng2-charts/issues/574)) ([ce5011c](https://github.com/valor-software/ng2-charts/commit/ce5011c))



<a name="1.4.4"></a>
## [1.4.4](https://github.com/valor-software/ng2-charts/compare/v1.3.0...v1.4.4) (2016-12-13)


### Bug Fixes

* **labels:** Update chart labels ([#456](https://github.com/valor-software/ng2-charts/issues/456)) ([7175c1e](https://github.com/valor-software/ng2-charts/commit/7175c1e)), closes [#420](https://github.com/valor-software/ng2-charts/issues/420) [#445](https://github.com/valor-software/ng2-charts/issues/445)
* **pie&doughnut:** Sizing issue on doughnut and pie charts ([#444](https://github.com/valor-software/ng2-charts/issues/444)) ([cfb1033](https://github.com/valor-software/ng2-charts/commit/cfb1033))
* **readme:** update instruction for import ([a9f07a8](https://github.com/valor-software/ng2-charts/commit/a9f07a8))


### Features

* **charts:** base charts now is directive ([7c9e782](https://github.com/valor-software/ng2-charts/commit/7c9e782))
* **charts:** Expose chart object ([#472](https://github.com/valor-software/ng2-charts/issues/472)) ([e46b5d1](https://github.com/valor-software/ng2-charts/commit/e46b5d1))
* **label:** Update Labels onChange ([#488](https://github.com/valor-software/ng2-charts/issues/488)) ([527d9a3](https://github.com/valor-software/ng2-charts/commit/527d9a3))
* **package:** dependecies updated ([1c95440](https://github.com/valor-software/ng2-charts/commit/1c95440))


### BREAKING CHANGES

* charts: - base-chart component became baseChart directive
so you need to convert <base-chart...><&lt;base-chart> to <canvas baseChart...><&lt;canvas> and most probably wrap in <div style='display:block'>...<&lt;div>



<a name="1.4.2"></a>
## [1.4.2](https://github.com/valor-software/ng2-charts/compare/v1.3.0...v1.4.2) (2016-12-13)


### Bug Fixes

* **labels:** Update chart labels ([#456](https://github.com/valor-software/ng2-charts/issues/456)) ([7175c1e](https://github.com/valor-software/ng2-charts/commit/7175c1e)), closes [#420](https://github.com/valor-software/ng2-charts/issues/420) [#445](https://github.com/valor-software/ng2-charts/issues/445)
* **pie&doughnut:** Sizing issue on doughnut and pie charts ([#444](https://github.com/valor-software/ng2-charts/issues/444)) ([cfb1033](https://github.com/valor-software/ng2-charts/commit/cfb1033))
* **readme:** update instruction for import ([a9f07a8](https://github.com/valor-software/ng2-charts/commit/a9f07a8))


### Features

* **charts:** base charts now is directive ([7c9e782](https://github.com/valor-software/ng2-charts/commit/7c9e782))
* **charts:** Expose chart object ([#472](https://github.com/valor-software/ng2-charts/issues/472)) ([e46b5d1](https://github.com/valor-software/ng2-charts/commit/e46b5d1))
* **label:** Update Labels onChange ([#488](https://github.com/valor-software/ng2-charts/issues/488)) ([527d9a3](https://github.com/valor-software/ng2-charts/commit/527d9a3))
* **package:** dependecies updated ([1c95440](https://github.com/valor-software/ng2-charts/commit/1c95440))


### BREAKING CHANGES

* charts: - base-chart component became baseChart directive
so you need to convert <base-chart...><&lt;base-chart> to <canvas baseChart...><&lt;canvas> and most probably wrap in <div style='display:block'>...<&lt;div>



<a name="1.4.1"></a>
## [1.4.1](https://github.com/valor-software/ng2-charts/compare/v1.4.0...v1.4.1) (2016-10-27)


### Bug Fixes

* **labels:** Update chart labels ([#456](https://github.com/valor-software/ng2-charts/issues/456)) ([7175c1e](https://github.com/valor-software/ng2-charts/commit/7175c1e)), closes [#420](https://github.com/valor-software/ng2-charts/issues/420) [#445](https://github.com/valor-software/ng2-charts/issues/445)


### Features

* **package:** dependecies updated ([1c95440](https://github.com/valor-software/ng2-charts/commit/1c95440))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/valor-software/ng2-charts/compare/v1.2.0...v1.4.0) (2016-10-07)


### Bug Fixes

* **docs:** Updates for ng2-charts[@1](https://github.com/1).2.0 ([#399](https://github.com/valor-software/ng2-charts/issues/399)) ([2bcb549](https://github.com/valor-software/ng2-charts/commit/2bcb549))
* **pie&doughnut:** Sizing issue on doughnut and pie charts ([#444](https://github.com/valor-software/ng2-charts/issues/444)) ([cfb1033](https://github.com/valor-software/ng2-charts/commit/cfb1033))


### Features

* **charts:** base charts now is directive ([7c9e782](https://github.com/valor-software/ng2-charts/commit/7c9e782))
* **package:** upgrade to ng2 2.0.0 and use [@types](https://github.com/types) instead of typings ([#413](https://github.com/valor-software/ng2-charts/issues/413)) ([e5eae04](https://github.com/valor-software/ng2-charts/commit/e5eae04))


### BREAKING CHANGES

* charts: - base-chart component became baseChart directive
so you need to convert &lt;base-chart...>&lt;/base-chart> to &lt;canvas baseChart...>&lt;/canvas> and most probably wrap in &lt;div style='display:block'>...&lt;/div>



<a name="1.3.0"></a>
# [1.3.0](https://github.com/valor-software/ng2-charts/compare/v1.2.0...v1.3.0) (2016-09-21)


### Bug Fixes

* **docs:** Updates for ng2-charts[@1](https://github.com/1).2.0 ([#399](https://github.com/valor-software/ng2-charts/issues/399)) ([2bcb549](https://github.com/valor-software/ng2-charts/commit/2bcb549))


### Features

* **package:** upgrade to ng2 2.0.0 and use [@types](https://github.com/types) instead of typings ([#413](https://github.com/valor-software/ng2-charts/issues/413)) ([e5eae04](https://github.com/valor-software/ng2-charts/commit/e5eae04))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/valor-software/ng2-charts/compare/v1.1.2...v1.2.0) (2016-09-09)



<a name="1.1.2"></a>
## [1.1.2](https://github.com/valor-software/ng2-charts/compare/v1.1.1...v1.1.2) (2016-09-09)


### Bug Fixes

* **options:** to have colors on horizontalBar graphs ([#394](https://github.com/valor-software/ng2-charts/issues/394)) ([ab06ad2](https://github.com/valor-software/ng2-charts/commit/ab06ad2))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/valor-software/ng2-charts/compare/v1.1.0...v1.1.1) (2016-09-08)


### Features

* **docs:** add issue template with a starting plunkr ([#335](https://github.com/valor-software/ng2-charts/issues/335)) ([a69bca4](https://github.com/valor-software/ng2-charts/commit/a69bca4))
* **options:** disable legend if not provided ([#318](https://github.com/valor-software/ng2-charts/issues/318)) ([516fb6e](https://github.com/valor-software/ng2-charts/commit/516fb6e))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/valor-software/ng2-charts/compare/v1.0.3...v1.1.0) (2016-05-17)


### Features

* **package:** update to ng2 rc.1 and chart.js 2.* ([73e3ffa](https://github.com/valor-software/ng2-charts/commit/73e3ffa))


### BREAKING CHANGES

- series property removed
- datasets property added (please prefer it over data property)
- all chart type names lower cased (because of chart.js 2 changes)



<a name="1.0.3"></a>
## [1.0.3](https://github.com/valor-software/ng2-charts/compare/v1.0.2...v1.0.3) (2016-04-15)


### Features

* **package:** updated to angular2 beta.15 ([4f44c83](https://github.com/valor-software/ng2-charts/commit/4f44c83))



<a name="1.0.2"></a>
## 1.0.2 (2016-04-13)


### Bug Fixes

* **charts:** fixed implicit any issues ([14acd8a](https://github.com/valor-software/ng2-charts/commit/14acd8a))
* **typings:** included all required typings ([ecdedf5](https://github.com/valor-software/ng2-charts/commit/ecdedf5))

### Features

* **build:** added system.js bundles ([45a07e3](https://github.com/valor-software/ng2-charts/commit/45a07e3))
* **build:** updated webpack config ([ab50836](https://github.com/valor-software/ng2-charts/commit/ab50836))
* **package:** to beta14 and cleaning up imports (fixes #132 fixes #100 fixes #98) ([5c1fb93](https://github.com/valor-software/ng2-charts/commit/5c1fb93)), closes [#132](https://github.com/valor-software/ng2-charts/issues/132) [#100](https://github.com/valor-software/ng2-charts/issues/100) [#98](https://github.com/valor-software/ng2-charts/issues/98)



