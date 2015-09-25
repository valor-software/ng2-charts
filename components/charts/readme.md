### Usage
```typescript
import {charts} from 'ng2-charts';
```

# Utilisation

There are 6 types of charts so 6 directives: `line-chart`, `bar-chart`, `radar-chart`, `pie-chart`,
`polar-area-chart`, `doughnut-chart`.

### Properties

- `data` (`Array<any>`) -  set of points of the chart, it should be Array&lt;Array&lt;number&gt;&gt; only for line, bar and radar, otherwise Array&lt;number&gt;
- `labels` (`?Array<any>`) - x axis labels. It's necessary for charts: line, bar and radar. And just labels (on hover) for charts: polar area, pie and doughnut
- `options` (`?any`) - chart options (as from [Chart.js documentation](http://www.chartjs.org/docs/))
- `series` (`?Array<any>`) - name points on the chart, work for line, bar and radar
- `colours` (`?Array<any>`) - data colours, will use default colours if not specified (see below)
- `legend`: (`?boolean=false`) - if true show legend below the chart, otherwise not be shown

### Events

- `chart-click`: fires when click on a chart has occurred, returns information regarding active points and labels
- `chart-hover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels


## Colours

There are a set of 7 default colours. Colours can be replaced using the `colours` attribute.
If there is more data than colours, colours are generated randomly or can be provided
via a function through the `getColour` attribute.

Hex colours are converted to Chart.js colours automatically,
including different shades for highlight, fill, stroke, etc.
