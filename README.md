# ng2-charts [![npm version](https://badge.fury.io/js/ng2-charts.svg)](http://badge.fury.io/js/ng2-charts) [![npm downloads](https://img.shields.io/npm/dm/ng2-charts.svg)](https://npmjs.org/ng2-charts) ![Travis CI](https://travis-ci.org/valor-software/ng2-charts.svg?branch=development) [slack](https://ngx-home.slack.com)
Beautiful charts for Angular2 based on Chart.js

**Library updated for Angular 7**

<!-- [![Sauce Test Status](https://saucelabs.com/browser-matrix/valorkin.svg)](https://saucelabs.com/u/valorkin) -->
[![NPM](https://nodei.co/npm/ng2-charts.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ng2-charts)
[![NPM](https://nodei.co/npm-dl/ng2-charts.png?height=3&months=9)](https://npmjs.org/ng2-charts)


# Usage & Demo

Sample using ng2-charts@2.0.0-beta.10

https://stackblitz.com/edit/ng2-charts7-demo


- - -

Original sample using ng2-charts@1.1.0

[http://valor-software.github.io/ng2-charts/](http://valor-software.github.io/ng2-charts/)
[http://plnkr.co/edit/7fGsiuRjcF0M0Ffeoml2?p=preview](http://plnkr.co/edit/7fGsiuRjcF0M0Ffeoml2?p=preview)


- - -

### Installation

1. You can install ***ng2-charts*** using npm

  ```bash
  npm install ng2-charts@2.0.0-beta.10 --save
  ```
2. You need to install and include `Chart.js` library in your application (it is a peer dependency of this library) (more info can be found in the official `chart.js` [documentation](http://www.chartjs.org/docs/#getting-started))

  ```bash
  npm install chart.js --save
  ```

### Usage & Demo
 Demo and API details of ***ng2-charts*** can be found here:

https://stackblitz.com/edit/ng2-charts7-demo


## API

### Import
```typescript
import { ChartsModule } from 'ng2-charts';

// In your App's module:
imports: [
   ChartsModule
]
```

### Chart types
There are one directive for all chart types: `baseChart`, and there are 6 types of charts: , `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`.

### Properties

**Note**: For more information about possible options please refer to original [chart.js](http://www.chartjs.org/docs) documentation

- `data` (`SingleOrMultiDataSet`) -  set of points of the chart, it should be `MultiDataSet` only for `line`, `bar` and `radar`, otherwise `SingleDataSet`
- `datasets` (`{ data: SingleDataSet, label: string }[]`) - `data` see about, the `label` for the dataset which appears in the legend and tooltips
- `labels` (`string[]`) - x axis labels. It's necessary for charts: `line`, `bar` and `radar`. And just labels (on hover) for charts: `polarArea`, `pie` and `doughnut`
- `chartType` (`ChartType`) - indicates the type of charts, it can be: `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`
- `options` (`ChartOptions`) - chart options (as from [Chart.js documentation](http://www.chartjs.org/docs/))
- `colors` (`Color[]`) - data colors, will use default and|or random colors if not specified (see below)
- `legend`: (`boolean = false`) - if true show legend below the chart, otherwise not be shown

### Events

- `chartClick`: fires when click on a chart has occurred, returns information regarding active points and labels
- `chartHover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels


### Colors

There are a set several default colors. Colors can be replaced using the `colors` attribute. If there is more data than colors, colors are generated randomly.


## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/valor-software/ng2-charts/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/valor-software/ng2-charts/blob/master/LICENSE) file for the full text)
