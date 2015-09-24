/// <reference path="../../tsd.d.ts" />

import {Component, View, CORE_DIRECTIVES, NgNonBindable} from 'angular2/angular2';

import {tabs} from 'ng2-bootstrap';
import {ChartsDemo} from './charts/charts-demo';
import {LineChartDemo} from './charts/line-chart-demo';
import {BarChartDemo} from './charts/bar-chart-demo';
import {DoughnutChartDemo} from './charts/doughnut-chart-demo';
import {PieChartDemo} from './charts/pie-chart-demo';
import {PolarAreaChartDemo} from './charts/polar-area-chart-demo';
import {RadarChartDemo} from './charts/radar-chart-demo';

let name = 'Charts';
let src = 'https://github.com/valor-software/ng2-charts/blob/master/components/charts/charts.ts';
// webpack html imports
let doc = require('../../components/charts/readme.md');
let titleDoc = require('../../components/charts/title.md');
// let ts = require('!!prismjs?lang=typescript!./charts/charts-demo.ts');
// let html = require('!!prismjs?lang=markup!./charts/charts-demo.html');


let chartDesc:Array<any> = [
  {
    heading: 'Line Chart',
    tag: 'line-chart-demo',
    ts: require('!!prismjs?lang=typescript!./charts/line-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/line-chart-demo.html')
  },
  {
    heading: 'Bar Chart',
    tag: 'bar-chart-demo',
    ts: require('!!prismjs?lang=typescript!./charts/bar-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/bar-chart-demo.html')
  },
  {
    heading: 'Doughnut Chart',
    tag: 'doughnut-chart-demo',
    ts: require('!!prismjs?lang=typescript!./charts/doughnut-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/doughnut-chart-demo.html')
  }
  ,
  {
    heading: 'Radar Chart',
    tag: 'radar-chart-demo',
    ts: require('!!prismjs?lang=typescript!./charts/radar-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/radar-chart-demo.html')

  },
  {
    heading: 'Pie Chart',
    tag: 'pie-chart-demo',
    ts: require('!!prismjs?lang=typescript!./charts/pie-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/pie-chart-demo.html')
  },
  {
    heading: 'Polar Area Chart',
    tag: 'polar-area-chart-demo',
    ts: require('!!prismjs?lang=typescript!./charts/polar-area-chart-demo.ts'),
    html: require('!!prismjs?lang=markup!./charts/polar-area-chart-demo.html')
  }
];


let chartContent:string = ``;
chartDesc.forEach(desc => {

  chartContent += `
          <div class="col-md-12">
            <h4>${desc.heading}</h4>
          </div>
          <div *ng-if="'${desc.heading}' == 'Line Chart'">
            <div class="col-md-12">
              <${desc.tag}></${desc.tag}>
            </div>
          </div>
          <div *ng-if="'${desc.heading}' != 'Line Chart'">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <${desc.tag}></${desc.tag}>
            </div>
            <div class="col-md-3"></div>
          </div>
          <div class="col-md-12">
            <div class="row" style="margin: 0px;">
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
        </tab>
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

    <div class="row"><div class="col-md-12">${titleDoc}</div></div>

    <div class="row">
      <h2>Example</h2>
      <div class="card card-block panel panel-default panel-body">

      <div class="row">
       ${chartContent}
       </div>
        <!--<charts-demo></charts-demo>-->

      </div>
    </div>

    <br>

    <div class="row">
      <h2>API</h2>
      <!--<div class="card card-block panel panel-default panel-body">${doc}</div>-->
    </div>
  </section>
  `,
  // directives: [ChartsDemo, tabs, CORE_DIRECTIVES, NgNonBindable]
  directives: [ChartsDemo, LineChartDemo, BarChartDemo, DoughnutChartDemo, PieChartDemo,
    PolarAreaChartDemo, RadarChartDemo, tabs, CORE_DIRECTIVES, NgNonBindable]
})
export class ChartsSection {
}
