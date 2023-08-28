# ng2-charts [![npm version](https://badge.fury.io/js/ng2-charts.svg)](http://badge.fury.io/js/ng2-charts) [![npm downloads](https://img.shields.io/npm/dm/ng2-charts.svg)](https://npmjs.org/ng2-charts) ![Travis CI](https://travis-ci.org/valor-software/ng2-charts.svg?branch=development) [slack](https://ngx-home.slack.com)

Beautiful charts for Angular based on Chart.js

# Usage & Demo

Samples using `ng2-charts`

https://valor-software.com/ng2-charts/

---

### Installation

You can install **_ng2-charts_** by using the Angular CLI:

```bash
ng add ng2-charts
```

The required packages will be automatically installed, and your `app.module.ts` will be updated with the required
changes to start using the library right away.

#### Manual install through package managers

1. You can install **_ng2-charts_** using npm

```bash
npm install ng2-charts --save
```

or yarn

```bash
yarn add ng2-charts --save
```

2. You will also need to install and include `Chart.js` library in your application (it is a peer dependency of this
   library, more info can be found in the
   official `chart.js` [documentation](http://www.chartjs.org/docs/#getting-started))

```bash
npm install chart.js --save
```

or with yarn:

```bash
yarn add  chart.js --save
```

3. Import the `NgChartsModule` in your app main module:

```typescript
import { NgChartsModule } from 'ng2-charts';

// In your App's module:
imports: [NgChartsModule];
```

### Angular version compability table

<table role="table">
 <tbody><tr>
  <td></td>
  <td colspan="5">ng2-chart version</td>
 </tr>

 <tr>
  <td>Angular version</td>
  <td>v1.x</td>
  <td>v2.x</td>
  <td>v3.x</td>
  <td>v4.x</td>
  <td>v5.x</td>
 </tr>

 <tr>
  <td>2 - 9</td>
  <td>✓</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
 </tr>

 <tr>
  <td>10</td>
  <td></td>
  <td>✓</td>
  <td></td>
  <td></td>
  <td></td>
 </tr>

 <tr>
  <td>11</td>
  <td></td>
  <td>✓</td>
  <td></td>
  <td></td>
  <td></td>
 </tr>

 <tr>
  <td>12</td>
  <td></td>
  <td>✓</td>
  <td></td>
  <td></td>
  <td></td>
 </tr>

 <tr>
  <td>13</td>
  <td></td>
  <td></td>
  <td>✓</td>
  <td></td>
  <td></td>
 </tr>

 <tr>
  <td>14</td>
  <td></td>
  <td></td>
  <td>✓</td>
  <td>✓</td>
  <td></td>
 </tr>

 <tr>
  <td>15</td>
  <td></td>
  <td></td>
  <td>✓</td>
  <td>✓</td>
  <td></td>
 </tr>

 <tr>
  <td>16</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>✓</td>
 </tr>

</tbody></table>

### Stackblitz Starting Templates

- Line Chart - https://stackblitz.com/github/santam85/ng2-charts-line-template?preset=node
- Pie Chart - https://stackblitz.com/github/santam85/ng2-charts-pie-template?preset=node
- Bar Chart - https://stackblitz.com/github/santam85/ng2-charts-bar-template?preset=node
- Doughnut Chart - https://stackblitz.com/github/santam85/ng2-charts-doughnut-template?preset=node
- Radar Chart - https://stackblitz.com/github/santam85/ng2-charts-radar-template?preset=node
- Polar Area Chart - https://stackblitz.com/github/santam85/ng2-charts-polar-area-template?preset=node
- Bubble Chart - https://stackblitz.com/github/santam85/ng2-charts-bubble-template?preset=node
- Scatter Chart - https://stackblitz.com/github/santam85/ng2-charts-scatter-template?preset=node

## API

### Chart types

There is one directive for all chart types: `baseChart`, and there are 8 types of charts: `line`, `bar`, `radar`, `pie`
, `polarArea`, `doughnut`, `bubble` and `scatter`. You can use the directive on a `canvas` element as follows:

```html
<canvas baseChart [data]="barChartData" [options]="barChartOptions" [type]="'bar'"> </canvas>
```

### Properties

**Note**: For more information about possible options please refer to original [chart.js](http://www.chartjs.org/docs)
documentation

- `type`: (`ChartType`) - indicates the type of chart, it can be: `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`
  or any custom type added to Chart.js
- `data`: (`ChartData<TType, TData, TLabel>`) - the whole data structure to be rendered in the chart. Support different
  flexible formats and parsing options,
  see [here](https://www.chartjs.org/docs/latest/general/data-structures.html#object). In alternative, and depending on
  the `type` of your chart, you can use the `labels` and `datasets` properties to specify individual options.
- `labels`: (`TLabel[]`) - Datasets labels. It's necessary for charts: `line`, `bar` and `radar`. And just labels (on
  hover) for charts: `polarArea`, `pie` and `doughnut`. Labels are matched in order with the `datasets` array.
- `datasets`: (` ChartDataset<TType, TData>[]`) - Same as the `datasets` property of the `data` input.
  See [here](https://www.chartjs.org/docs/latest/general/data-structures.html#dataset-configuration) for details.
- `options`: (`ChartOptions<TType>`) - chart options (as
  per [chart.js documentation](https://www.chartjs.org/docs/latest/general/options.html)).
- `legend`: (`boolean = false`) - if true, chart legend is shown.

### Events

- `chartClick`: fires when click on a chart has occurred, returns information regarding active points and labels
- `chartHover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and
  labels

### Colors

The library comes with a set of predefined default colors (which are exported as `baseColors`). If there are more
datasets than colors, colors are generated randomly. You can specify custom colors by following
these [instructions](https://www.chartjs.org/docs/latest/general/colors.html).

### Dynamic Theming

The `NgChartsModule` provides a service called `ThemeService` which allows clients to set a structure specifying colors
override settings. This service may be called when the dynamic theme changes, with colors which fit the theme. The
structure is interpreted as an override, with special functionality when dealing with arrays. Example:

```typescript
type Theme = 'light-theme' | 'dark-theme';

private _selectedTheme: Theme = 'light-theme';
public get selectedTheme(){
  return this._selectedTheme;
}

public set selectedTheme(value){
  this._selectedTheme = value;
  let overrides: ChartOptions;
  if (this.selectedTheme === 'dark-theme') {
    overrides = {
      legend: {
        labels: { fontColor: 'white' }
      },
      scales: {
        xAxes: [ {
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        } ],
        yAxes: [ {
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        } ]
      }
    };
  } else {
    overrides = {};
  }
  this.themeService.setColorschemesOptions(overrides);
}

constructor(private themeService: ThemeService<AppChartMetaConfig>){
}

setCurrentTheme(theme: Theme){
  this.selectedTheme = theme;
}
```

The `overrides` object has the same type as the chart options object `ChartOptions`, and wherever a simple field is
encountered it replaces the matching field in the `options` object. When an array is encountered (as in the `xAxes`
and `yAxes` fields above), the single object inside the array is used as a template to override all array elements in
the matching field in the `options` object. So in the case above, every axis will have its ticks and gridline colors
changed.

## Schematics

There are schematics that may be used to add this library to your project and generate chart components using Angular
CLI.

### Installation of library through ng-add schematics

```bash
ng add ng2-charts
```

This schematics will add the `NgChartsModule` as an imported module in the main app module (or another module as specified
in the `--module` command option).

### Example of Generating a Line Chart using Angular CLI

```bash
ng generate ng2-charts:line my-line-chart
```

This calls angular's component schematics and then modifies the result, so all the options for the component schematic
are also usable here.

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/valor-software/ng2-charts/issues) board to report bugs and feature requests (
   not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our
   heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/valor-software/ng2-charts/blob/master/LICENSE) file for the full
text)

If you like this library and want to say thanks, consider [buying me a coffee](https://www.buymeacoffee.com/santam)!

[//]: # 'super hidden section about running `npm test:ci` in win11 wsl2'
[//]: # 'export CHROME_BIN=/mnt/c/Program\\ Files\ (x86)/Google/Chrome/Application/chrome.exe'
