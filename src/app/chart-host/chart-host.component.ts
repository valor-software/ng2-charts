import { Component, OnInit, ContentChild, AfterContentInit, Input } from '@angular/core';

export const chartTypes = {
  bar: {
    heading: 'Bar Chart',
    ts: require('!!raw-loader!../bar-chart/bar-chart.component.ts'),
    html: require('!!raw-loader!../bar-chart/bar-chart.component.html'),
  },
  doughnut: {
    heading: 'Doughnut Chart',
    ts: require('!!raw-loader!../doughnut-chart/doughnut-chart.component.ts'),
    html: require('!!raw-loader!../doughnut-chart/doughnut-chart.component.html'),
  },
  dynamic: {
    heading: 'Dynamic Chart',
    ts: require('!!raw-loader!../dynamic-chart/dynamic-chart.component.ts'),
    html: require('!!raw-loader!../dynamic-chart/dynamic-chart.component.html'),
  },
  line: {
    heading: 'Line Chart',
    ts: require('!!raw-loader!../line-chart/line-chart.component.ts'),
    html: require('!!raw-loader!../line-chart/line-chart.component.html'),
  },
  pie: {
    heading: 'Pie Chart',
    ts: require('!!raw-loader!../pie-chart/pie-chart.component.ts'),
    html: require('!!raw-loader!../pie-chart/pie-chart.component.html'),
  },
  'polar-area': {
    heading: 'Polar Area Chart',
    ts: require('!!raw-loader!../polar-area-chart/polar-area-chart.component.ts'),
    html: require('!!raw-loader!../polar-area-chart/polar-area-chart.component.html'),
  },
  bubble: {
    heading: 'Bubble Chart',
    ts: require('!!raw-loader!../bubble-chart/bubble-chart.component.ts'),
    html: require('!!raw-loader!../bubble-chart/bubble-chart.component.html'),
  },
  radar: {
    heading: 'Radar Chart',
    ts: require('!!raw-loader!../radar-chart/radar-chart.component.ts'),
    html: require('!!raw-loader!../radar-chart/radar-chart.component.html'),
  },
  scatter: {
    heading: 'Scatter Chart',
    ts: require('!!raw-loader!../scatter-chart/scatter-chart.component.ts'),
    html: require('!!raw-loader!../scatter-chart/scatter-chart.component.html'),
  },
  financial: {
    heading: 'Financial Chart',
    ts: require('!!raw-loader!../financial-chart/financial-chart.component.ts'),
    html: require('!!raw-loader!../financial-chart/financial-chart.component.html'),
  },
};


@Component({
  selector: 'app-chart-host',
  templateUrl: './chart-host.component.html',
  styleUrls: ['./chart-host.component.scss']
})
export class ChartHostComponent implements OnInit, AfterContentInit {
  @Input() chartType: string;
  @ContentChild('main', { static: true }) content;

  html: string;
  ts: string;
  heading: string;

  constructor() { }

  ngOnInit() { }

  ngAfterContentInit(): void {
    const compName = this.chartType;
    if (chartTypes[compName]) {
      this.heading = chartTypes[compName].heading;
      this.html = chartTypes[compName].html;
      this.ts = chartTypes[compName].ts;
    }
  }
}
