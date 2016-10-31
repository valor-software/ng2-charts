### Usage
```typescript
import { ChartsModule } from 'ng2-charts/ng2-charts';

// In your App's module:
imports: [
   ChartsModule
]
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
- `colors` (`?Array<any>`) - data colors, will use default and|or random colors if not specified (see below)
- `legend`: (`?boolean=false`) - if true show legend below the chart, otherwise not be shown

### Events

- `chartClick`: fires when click on a chart has occurred, returns information regarding active points and labels
- `chartHover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels


### Colors

There are a set several default colors. Colors can be replaced using the `colors` attribute. If there is more data than colors, colors are generated randomly.
