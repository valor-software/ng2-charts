/// <reference path="../../tsd.d.ts" />

import {Component, View, CORE_DIRECTIVES, NgNonBindable} from 'angular2/angular2';

import {tabs} from 'ng2-bootstrap';
import {LineChartDemo} from './charts/line-chart-demo';
import {BarChartDemo} from './charts/bar-chart-demo';
import {DoughnutChartDemo} from './charts/doughnut-chart-demo';
import {PieChartDemo} from './charts/pie-chart-demo';
import {PolarAreaChartDemo} from './charts/polar-area-chart-demo';
import {RadarChartDemo} from './charts/radar-chart-demo';
import {BaseChartDemo} from './charts/base-chart-demo';

let name = 'Charts';
let src = 'https://github.com/valor-software/ng2-charts/blob/master/components/charts/charts.ts';
// webpack html imports
let doc = require('../../components/charts/readme.md');


let chartDesc:Array<any> = [
  {
    heading: 'Line Chart',
    tag: 'line-chart-demo',
    id: 'lineChart',
    ts: require('!!prismjs?lang=typescript!./charts/line-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/line-chart-demo.html')
  },
  {
    heading: 'Bar Chart',
    tag: 'bar-chart-demo',
    id: 'barChart',
    ts: require('!!prismjs?lang=typescript!./charts/bar-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/bar-chart-demo.html')
  },
  {
    heading: 'Doughnut Chart',
    tag: 'doughnut-chart-demo',
    id: 'doughnutChart',
    ts: require('!!prismjs?lang=typescript!./charts/doughnut-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/doughnut-chart-demo.html')
  }
  ,
  {
    heading: 'Radar Chart',
    tag: 'radar-chart-demo',
    id: 'radarChart',
    ts: require('!!prismjs?lang=typescript!./charts/radar-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/radar-chart-demo.html')

  },
  {
    heading: 'Pie Chart',
    tag: 'pie-chart-demo',
    id: 'pieChart',
    ts: require('!!prismjs?lang=typescript!./charts/pie-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/pie-chart-demo.html')
  },
  {
    heading: 'Polar Area Chart',
    tag: 'polar-area-chart-demo',
    id: 'polarAreaChart',
    ts: require('!!prismjs?lang=typescript!./charts/polar-area-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/polar-area-chart-demo.html')
  },
  {
    heading: 'Dynamic Chart',
    tag: 'base-chart-demo',
    id: 'baseChart',
    ts: require('!!prismjs?lang=typescript!./charts/base-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/base-chart-demo.html')
  }
];


let chartContent:string = ``;
chartDesc.forEach(desc => {

  chartContent += `
      <section id="${desc.id}" style="padding-top: 50px;">
        <div class="row">
          <div class="col-md-12">
            <h4>${desc.heading}</h4>
          </div>
        </div>
        <div class="card card-block panel panel-default panel-body">

         <div class="row">
          <div *ng-if="'${desc.heading}' == 'Line Chart' || '${desc.heading}' == 'Dynamic Chart'">
            <div class="col-md-12">
              <${desc.tag}></${desc.tag}>
            </div>
          </div>
          <div *ng-if="'${desc.heading}' != 'Line Chart' && '${desc.heading}' != 'Dynamic Chart'">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <${desc.tag}></${desc.tag}>
            </div>
            <div class="col-md-3"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <tabset>
            <tab heading="Markup">
              <div class="card card-block panel panel-default panel-body">
                <pre class="language-html"><code class="language-html" ng-non-bindable>${desc.html}</code></pre>
              </div>
            </tab>
            <tab heading="TypeScript">
              <div class="card card-block panel panel-default panel-body">
                <pre class="language-typescript"><code class="language-typescript" ng-non-bindable>${desc.ts}</code></pre>
              </div>
            </tab>
          </tabset>
        </div>
      </div>
    </section>
  `;
});

@Component({
  selector: 'charts-section'
})
@View({
  template: `
  <br>
  <section id="${name.toLowerCase()}">
    <div class="row"><h1>${name}<small>(<a href="${src}">src</a>)</small></h1></div>

    <hr>

    <div class="row">
      <h2>Example</h2>
        ${chartContent}
    </div>

    <br>

    <div class="row">
      <h2>API</h2>
      <div class="card card-block panel panel-default panel-body">${doc}</div>
    </div>
  </section>
  `,
  directives: [LineChartDemo, BarChartDemo, DoughnutChartDemo, PieChartDemo,
    PolarAreaChartDemo, RadarChartDemo, BaseChartDemo, tabs, CORE_DIRECTIVES, NgNonBindable]
})
export class ChartsSection {
}
