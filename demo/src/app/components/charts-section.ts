import { Component } from '@angular/core';

// webpack html imports
let doc = require('html-loader!markdown-loader!../../doc.md');

@Component({
  selector: 'charts-section',
  template: `
    <br>
    <div class="row">
      <h2>API</h2>
      <div class="card card-block panel panel-default panel-body" [innerHTML]="doc"></div>
    </div>

    <section [attr.id]="name">
      <div class="row">
        <h1>{{name}}
          <small>(<a [attr.href]="src">src</a>)</small>
        </h1>
      </div>

      <hr>

      <div class="row">
        <h2>Example</h2>

        <chart-section [ts]="desc.lineChart.ts"
                       [html]="desc.lineChart.html"
                      
                       [id]="desc.lineChart.id"
                       [heading]="desc.lineChart.heading">
          <line-chart-demo></line-chart-demo>
        </chart-section>
        <chart-section [ts]="desc.barChart.ts"
                       [html]="desc.barChart.html"
                       [id]="desc.barChart.id"
                       [heading]="desc.barChart.heading">
          <bar-chart-demo></bar-chart-demo>
        </chart-section>
        <chart-section [ts]="desc.douChart.ts"
                       [html]="desc.douChart.html"
                       [id]="desc.douChart.id"
                       [heading]="desc.douChart.heading">
          <doughnut-chart-demo></doughnut-chart-demo>
        </chart-section>
        <chart-section [ts]="desc.radarChart.ts"
                       [html]="desc.radarChart.html"
                       [id]="desc.radarChart.id"
                       [heading]="desc.radarChart.heading">
          <radar-chart-demo></radar-chart-demo>
        </chart-section>
        <chart-section [ts]="desc.pieChart.ts"
                       [html]="desc.pieChart.html"
                       [id]="desc.pieChart.id"
                       [heading]="desc.pieChart.heading">
          <pie-chart-demo></pie-chart-demo>
        </chart-section>
        <chart-section [ts]="desc.polarChart.ts"
                       [html]="desc.polarChart.html"
                       [id]="desc.polarChart.id"
                       [heading]="desc.polarChart.heading">
          <polar-area-chart-demo></polar-area-chart-demo>
        </chart-section>
        <chart-section [ts]="desc.baseChart.ts"
                       [html]="desc.baseChart.html"
                       [id]="desc.baseChart.id"
                       [heading]="desc.baseChart.heading">
          <base-chart-demo></base-chart-demo>
        </chart-section>
      </div>

      <br>

    </section>
  `
})

export class ChartsSectionComponent {
  public name: string = 'Charts';
  public src: string = 'https://github.com/valor-software/ng2-charts/blob/development/src/charts/charts.ts';
  public doc: string = doc;
  public desc: any = {
    lineChart: {
      heading: 'Line Chart',
      id: 'lineChart',
      ts: require('!!raw-loader?lang=typescript!./charts/line-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/line-chart-demo.html')
    },
    barChart: {
      heading: 'Bar Chart',
      id: 'barChart',
      ts: require('!!raw-loader?lang=typescript!./charts/bar-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/bar-chart-demo.html')
    },
    douChart: {
      heading: 'Doughnut Chart',
      id: 'doughnutChart',
      ts: require('!!raw-loader?lang=typescript!./charts/doughnut-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/doughnut-chart-demo.html')
    },
    radarChart: {
      heading: 'Radar Chart',
      id: 'radarChart',
      ts: require('!!raw-loader?lang=typescript!./charts/radar-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/radar-chart-demo.html')

    },
    pieChart: {
      heading: 'Pie Chart',
      id: 'pieChart',
      ts: require('!!raw-loader?lang=typescript!./charts/pie-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/pie-chart-demo.html')
    },
    polarChart: {
      heading: 'Polar Area Chart',
      id: 'polarAreaChart',
      ts: require('!!raw-loader?lang=typescript!./charts/polar-area-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/polar-area-chart-demo.html')
    },
    baseChart: {
      heading: 'Dynamic Chart',
      id: 'baseChart',
      ts: require('!!raw-loader?lang=typescript!./charts/base-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/base-chart-demo.html')
    }
  };
}
