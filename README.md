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

## Quick start

1. A recommended way to install ***ng2-charts*** is through [npm](https://www.npmjs.com/search?q=ng2-charts) package manager using the following command:

  `npm i ng2-charts --save`


2. A way to install Chart.js component is through [npm](http://bower.io/search/?q=chartjs) package manager using the following command:

  `bower install Chart.js --save`

  Alternatively, you can [download it in a ZIP file](https://github.com/nnnick/Chart.js/archive/master.zip).

  After Chart.js component is downloaded, embed the code into your project.

  ```html
  <script src="bower_components/Chart.js/Chart.min.js"></script>
  ```

3. Or you can link `charts.js` at cdn
```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
```

4. More information regarding using of ***ng2-charts*** is located in
  [demo](http://valor-software.github.io/ng2-charts/) and [demo sources](https://github.com/valor-software/ng2-charts/tree/master/demo).

## API

### Properties

- `data` (`Array<any>`) -  set of points of the chart, it should be Array&lt;Array&lt;number&gt;&gt; only for line, bar and radar, otherwise Array&lt;number&gt;
- `labels` (`?Array<any>`) - x axis labels. It's necessary for charts: line, bar and radar. And just labels (on hover) for charts: polar area, pie and doughnut
- `chartType` (`?string`) - indicates the type of charts, it can be: 'Line', 'Bar', 'Radar', 'Pie', 'PolarArea', 'Doughnut'
- `options` (`?any`) - chart options (as from [Chart.js documentation](http://www.chartjs.org/docs/))
- `series` (`?Array<any>`) - name points on the chart, work for line, bar and radar
- `colours` (`?Array<any>`) - data colours, will use default colours if not specified ([see readme for components](https://github.com/valor-software/ng2-charts/blob/master/components/charts/readme.md))
- `legend`: (`?boolean=false`) - if true show legend below the chart, otherwise not be shown

### Events

- `chartClick`: fires when click on a chart has occurred, returns information regarding active points and labels
- `chartHover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels


## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/valor-software/ng2-charts/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/valor-software/ng2-charts/blob/master/LICENSE) file for the full text)
