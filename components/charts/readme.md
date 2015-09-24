### Usage
```typescript
import {charts} from 'ng2-charts';
```

# Utilisation

There are 6 types of charts so 6 directives: `line-chart`, `bar-chart`, `radar-chart`, `pie-chart`,
`polar-area-chart`, `doughnut-chart`.

### Properties

- `data` (`Array<any>`) - data for chart
- `labels` (`?Array<any>`) - x axis labels (line, bar, radar) or series labels (pie, doughnut, polar area)
- `options` (`?any`) - chart options (as from [Chart.js documentation](http://www.chartjs.org/docs/))
- `series` (`?Array<any>`) - series labels (line, bar, radar)
- `colours` (`?Array<any>`) - data colours (will use default colours if not specified)
- `legend`: (`?boolean=false`) - show legend below the chart

### Events

- `chart-click`: onclick event handler
- `chart-hover`: mousemove event handler


# Colours

There are a set of 7 default colours. Colours can be replaced using the `colours` attribute.
If there is more data than colours, colours are generated randomly or can be provided
via a function through the `getColour` attribute.

Hex colours are converted to Chart.js colours automatically,
including different shades for highlight, fill, stroke, etc.
