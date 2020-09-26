# ng2-charts [![npm version](https://badge.fury.io/js/ng2-charts.svg)](http://badge.fury.io/js/ng2-charts) [![npm downloads](https://img.shields.io/npm/dm/ng2-charts.svg)](https://npmjs.org/ng2-charts) ![Travis CI](https://travis-ci.org/valor-software/ng2-charts.svg?branch=development) [slack](https://ngx-home.slack.com)
Beautiful charts for Angular2 based on Chart.js

**Library updated for Angular 7**

<!-- [![Sauce Test Status](https://saucelabs.com/browser-matrix/valorkin.svg)](https://saucelabs.com/u/valorkin) -->
[![NPM](https://nodei.co/npm/ng2-charts.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ng2-charts)
[![NPM](https://nodei.co/npm-dl/ng2-charts.png?height=3&months=9)](https://npmjs.org/ng2-charts)


# Usage & Demo

Sample using ng2-charts@2.4.2

https://valor-software.com/ng2-charts/


- - -

### Installation

1. You can install ***ng2-charts*** using npm

  ```bash
  npm install ng2-charts@2.4.2 --save
  ```
2. You need to install and include `Chart.js` library in your application (it is a peer dependency of this library) (more info can be found in the official `chart.js` [documentation](http://www.chartjs.org/docs/#getting-started))

  ```bash
  npm install chart.js --save
  ```

### Stackblitz Starting Templates

* Line Chart - https://stackblitz.com/edit/ng2-charts-line-template
* Pie Chart - https://stackblitz.com/edit/ng2-charts-pie-template
* Bar Chart - https://stackblitz.com/edit/ng2-charts-bar-template
* Doughnut Chart - https://stackblitz.com/edit/ng2-charts-doughnut-template
* Radar Chart - https://stackblitz.com/edit/ng2-charts-radar-template
* Polar Area Chart - https://stackblitz.com/edit/ng2-charts-polar-area-template
* Bubble Chart - https://stackblitz.com/edit/ng2-charts-bubble-template
* Scatter Chart - https://stackblitz.com/edit/ng2-charts-scatter-template

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
There are one directive for all chart types: `baseChart`, and there are 8 types of charts: `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`, `bubble` and `scatter`.

### Properties

**Note**: For more information about possible options please refer to original [chart.js](http://www.chartjs.org/docs) documentation

- `data` (`SingleOrMultiDataSet`) -  set of points of the chart, it should be `MultiDataSet` only for `line`, `bar`, `radar` and `doughnut`, otherwise `SingleDataSet`
- `datasets` (`{ data: SingleDataSet, label: string }[]`) - `data` see about, the `label` for the dataset which appears in the legend and tooltips
- `labels` (`Label[]`) - x axis labels. It's necessary for charts: `line`, `bar` and `radar`. And just labels (on hover) for charts: `polarArea`, `pie` and `doughnut`. `Label` is either a single `string`, or it may be a `string[]` representing a multi-line label where each array element is on a new line.
- `chartType` (`ChartType`) - indicates the type of charts, it can be: `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`
- `options` (`ChartOptions`) - chart options (as from [Chart.js documentation](http://www.chartjs.org/docs/))
- `colors` (`Color[]`) - data colors, will use default and|or random colors if not specified (see below)
- `legend`: (`boolean = false`) - if true show legend below the chart, otherwise not be shown

### Events

- `chartClick`: fires when click on a chart has occurred, returns information regarding active points and labels
- `chartHover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels


### Colors

There are a set several default colors. Colors can be replaced using the `colors` attribute. If there is more data than colors, colors are generated randomly.

### Dynamic Theming

The `ChartsModule` provides a service called `ThemeService` which allows clients to set a structure specifying colors override settings. This service may be called when the dynamic theme changes, with colors which fit the theme. The structure is interpreted as an override, with special functionality when dealing with arrays. Example:

```typescript
type Theme = 'light-theme' | 'dark-theme';

private _selectedTheme: Theme = 'light-theme';
public get selectedTheme() {
  return this._selectedTheme;
}
public set selectedTheme(value) {
  this._selectedTheme = value;
  let overrides: ChartOptions;
  if (this.selectedTheme === 'dark-theme') {
    overrides = {
      legend: {
        labels: { fontColor: 'white' }
      },
      scales: {
        xAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }],
        yAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }]
      }
    };
  } else {
    overrides = {};
  }
  this.themeService.setColorschemesOptions(overrides);
}

constructor(private themeService: ThemeService) { }

setCurrentTheme(theme: Theme) {
  this.selectedTheme = theme;
}
```

The `overrides` object has the same type as the chart options object `ChartOptions`, and wherever a simple field is encountered it replaces the matching field in the `options` object. When an array is encountered (as in the `xAxes` and `yAxes` fields above), the single object inside the array is used as a template to override all array elements in the matching field in the `options` object. So in the case above, every axis will have its ticks and gridline colors changed.

## Schematics

There are schematics that may be used to generate chart components using Angular CLI. The components are defined in package `ng2-charts-schematics`.

### Installation of Schematics Package

```bash
npm install --save-dev ng2-charts-schematics
```

### Example of Generating a Line Chart using Angular CLI

```bash
ng generate ng2-charts-schematics:line my-line-chart
```

This calls angular's component schematics and then modifies the result, so all the options for the component schematic are also usable here. This schematics will also add the `ChartsModule` as an imported module in the main app module (or another module as specified in the `--module` command switch).

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/valor-software/ng2-charts/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/valor-software/ng2-charts/blob/master/LICENSE) file for the full text)
