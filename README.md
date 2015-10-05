# ng2-charts
Beautiful charts for Angular2 based on Chart.js
Directive for [ng2-charts](https://github.com/valor-software/ng2-charts) component.


# Usage & Demo
[http://valor-software.github.io/ng2-charts/](http://valor-software.github.io/ng2-charts/)


- - -

## Quick start

1. A recommended way to install ***ng2-charts*** is through [npm](https://www.npmjs.com/search?q=ng2-charts) package manager using the following command:

  `npm i ng2-charts --save`

  Alternatively, you can [download it in a ZIP file](https://github.com/valor-software/ng2-charts/archive/master.zip).

2. A recommended way to install Chart.js component is through [Bower](http://bower.io/search/?q=chartjs) package manager using the following command:

  `bower install Chart.js --save`

  Alternatively, you can [download it in a ZIP file](https://github.com/nnnick/Chart.js/archive/master.zip).
3. After Chart.js component is downloaded, embed the code into your project.

  ```html
  <script src="bower_components/Chart.js/Chart.min.js"></script>
  ```

4. More information regarding using of ***ng2-charts*** is located in
  [demo](http://valor-software.github.io/ng2-charts/) and [demo sources](https://github.com/valor-software/ng2-charts/tree/master/demo).

## API

### Properties

- `data` (`Array<any>`) -  set of points of the chart, it should be Array&lt;Array&lt;number&gt;&gt; only for line, bar and radar, otherwise Array&lt;number&gt;
- `labels` (`?Array<any>`) - x axis labels. It's necessary for charts: line, bar and radar. And just labels (on hover) for charts: polar area, pie and doughnut
- `chart-type` (`?string`) - indicates the type of charts, it can be: 'Line', 'Bar', 'Radar', 'Pie', 'PolarArea', 'Doughnut'
- `options` (`?any`) - chart options (as from [Chart.js documentation](http://www.chartjs.org/docs/))
- `series` (`?Array<any>`) - name points on the chart, work for line, bar and radar
- `colours` (`?Array<any>`) - data colours, will use default colours if not specified ([see readme for components](https://github.com/valor-software/ng2-charts/blob/master/components/charts/readme.md))
- `legend`: (`?boolean=false`) - if true show legend below the chart, otherwise not be shown

### Events

- `chart-click`: fires when click on a chart has occurred, returns information regarding active points and labels
- `chart-hover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels


## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/valor-software/ng2-charts/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/valor-software/ng2-charts/blob/master/LICENSE) file for the full text)