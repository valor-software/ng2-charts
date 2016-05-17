# ng2-charts [![npm version](https://badge.fury.io/js/ng2-charts.svg)](http://badge.fury.io/js/ng2-charts)
Beautiful charts for Angular2 based on Chart.js

Follow me at [twitter](https://twitter.com/valorkin) to be notified about new releases.

[![Code Climate](https://codeclimate.com/github/valor-software/ng2-charts/badges/gpa.svg)](https://codeclimate.com/github/valor-software/ng2-charts)
[![Join the chat at https://gitter.im/valor-software/ng2-bootstrap](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/valor-software/ng2-bootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/valor-software/ng2-charts.svg)](https://david-dm.org/valor-software/ng2-charts)
[![devDependency Status](https://david-dm.org/valor-software/ng2-charts/dev-status.svg)](https://david-dm.org/valor-software/ng2-charts#info=devDependencies)
[![Throughput Graph](https://graphs.waffle.io/valor-software/ng2-charts/throughput.svg)](https://waffle.io/valor-software/ng2-charts/metrics)

# Usage & Demo
[http://valor-software.github.io/ng2-charts/](http://valor-software.github.io/ng2-charts/)

- - -

### Installation

1. You can install ***ng2-charts*** using npm

  ```bash
  npm install ng2-charts --save
  ```
2. You need to install and include `Chart.js` library in application via `html` or `webpack bundler` (more options can be found in official `chart.js` [documentation](http://www.chartjs.org/docs/#getting-started))

  ```bash
  npm install chart.js --save
  ```

  **Important**: Embedding `Chart.js` in application is mandatory!

  ```html
  <script src="node_modules/chart.js/dist/Chart.bundle.min.js"></script>
  ```
### Usage & Demo
 Demo and API details of ***ng2-charts*** can be found here:
  [demo](http://valor-software.github.io/ng2-charts/) and [source code](https://github.com/valor-software/ng2-charts/tree/master/demo).

### System.js

System.js bundles can be found in `bundles` directory of npm package or at [npm cdn](https://npmcdn.com/ng2-charts/bundles/)


## API

### Import
```typescript
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
```

### Chart types
There are one directive for all chart types: `base-chart`, and there are 6 types of charts: , `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`.

### Properties

**Note**: For more information about possible options please refer to original [chart.js](http://www.chartjs.org/docs) documentation

- `data` (`Array<number[]> | number[]`) -  set of points of the chart, it should be `Array<number[]>` only for `line`, `bar` and `radar`, otherwise `number[]`;
- `datasets` (`Array<{data: Array<number[]> | number[], label: string}>`) - `data` see about, the `label` for the dataset which appears in the legend and tooltips
- `labels` (`?Array<any>`) - x axis labels. It's necessary for charts: `line`, `bar` and `radar`. And just labels (on hover) for charts: `polarArea`, `pie` and `doughnut`
- `chartType` (`?string`) - indicates the type of charts, it can be: `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`
- `options` (`?any`) - chart options (as from [Chart.js documentation](http://www.chartjs.org/docs/))
- `colours` (`?Array<any>`) - data colours, will use default and|or random colours if not specified (see below)
- `legend`: (`?boolean=false`) - if true show legend below the chart, otherwise not be shown

### Events

- `chartClick`: fires when click on a chart has occurred, returns information regarding active points and labels
- `chartHover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels


### Colours

There are a set several default colours. Colours can be replaced using the `colours` attribute. If there is more data than colours, colours are generated randomly.



## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/valor-software/ng2-charts/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/valor-software/ng2-charts/blob/master/LICENSE) file for the full text)
