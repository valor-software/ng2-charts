import {Component} from '@angular/core';

let name = 'Charts';
let src = 'https://github.com/valor-software/ng2-charts/blob/master/components/charts/charts.ts';
// webpack html imports
let doc = ''; // require('../../components/charts/readme.md');

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
chartDesc.forEach((desc:any) => {

  chartContent += `
      <section id="${desc.id}" style="padding-top: 50px;">
        <div class="row">
          <div class="col-md-12">
            <h4>${desc.heading}</h4>
          </div>
        </div>
        <div class="card card-block panel panel-default panel-body">

         <div class="row">
          <div *ngIf="'${desc.heading}' == 'Line Chart' || '${desc.heading}' == 'Dynamic Chart'">
            <div class="col-md-12">
              <${desc.tag}></${desc.tag}>
            </div>
          </div>
          <div *ngIf="'${desc.heading}' != 'Line Chart' && '${desc.heading}' != 'Dynamic Chart'">
            <div class="col-md-12">
              <${desc.tag}></${desc.tag}>
            </div>
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
              </div>
            </tab>
          </tabset>
        </div>
      </div>
    </section>
  `;
});

@Component({
  selector: 'charts-section',
  template: `
  <br>
  <div class="row">
    <h2>API</h2>
    <div class="card card-block panel panel-default panel-body">${doc}</div>
  </div>

  <section id="${name.toLowerCase()}">
    <div class="row"><h1>${name}<small>(<a href="${src}">src</a>)</small></h1></div>

    <hr>

    <div class="row">
      <h2>Example</h2>
        ${chartContent}
    </div>

    <br>

  </section>
  `

})
export class ChartsSectionComponent {
}
