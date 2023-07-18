/* eslint-disable @typescript-eslint/no-var-requires */
import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

export const chartTypes = {
  bar: {
    heading: 'Bar Chart',
    ts: require('!!raw-loader!../bar-chart/bar-chart.component.ts').default,
    html: require('!!raw-loader!../bar-chart/bar-chart.component.html').default,
  },
  doughnut: {
    heading: 'Doughnut Chart',
    ts: require('!!raw-loader!../doughnut-chart/doughnut-chart.component.ts')
      .default,
    html: require('!!raw-loader!../doughnut-chart/doughnut-chart.component.html')
      .default,
  },
  dynamic: {
    heading: 'Dynamic Chart',
    ts: require('!!raw-loader!../dynamic-chart/dynamic-chart.component.ts')
      .default,
    html: require('!!raw-loader!../dynamic-chart/dynamic-chart.component.html')
      .default,
  },
  line: {
    heading: 'Line Chart',
    ts: require('!!raw-loader!../line-chart/line-chart.component.ts').default,
    html: require('!!raw-loader!../line-chart/line-chart.component.html')
      .default,
  },
  pie: {
    heading: 'Pie Chart',
    ts: require('!!raw-loader!../pie-chart/pie-chart.component.ts').default,
    html: require('!!raw-loader!../pie-chart/pie-chart.component.html').default,
  },
  polarArea: {
    heading: 'Polar Area Chart',
    ts: require('!!raw-loader!../polar-area-chart/polar-area-chart.component.ts')
      .default,
    html: require('!!raw-loader!../polar-area-chart/polar-area-chart.component.html')
      .default,
  },
  bubble: {
    heading: 'Bubble Chart',
    ts: require('!!raw-loader!../bubble-chart/bubble-chart.component.ts')
      .default,
    html: require('!!raw-loader!../bubble-chart/bubble-chart.component.html')
      .default,
  },
  radar: {
    heading: 'Radar Chart',
    ts: require('!!raw-loader!../radar-chart/radar-chart.component.ts').default,
    html: require('!!raw-loader!../radar-chart/radar-chart.component.html')
      .default,
  },
  scatter: {
    heading: 'Scatter Chart',
    ts: require('!!raw-loader!../scatter-chart/scatter-chart.component.ts')
      .default,
    html: require('!!raw-loader!../scatter-chart/scatter-chart.component.html')
      .default,
  },
  financial: {
    heading: 'Financial Chart',
    ts: require('!!raw-loader!../financial-chart/financial-chart.component.ts')
      .default,
    html: require('!!raw-loader!../financial-chart/financial-chart.component.html')
      .default,
  },
};

@Component({
  selector: 'app-chart-host',
  templateUrl: './chart-host.component.html',
})
export class ChartHostComponent implements AfterContentInit {
  @Input() chartType: keyof typeof chartTypes = 'bar';
  @ContentChild('main', { static: true }) content?: BaseChartDirective;

  html = '';
  ts = '';
  heading = '';

  ngAfterContentInit(): void {
    const compName = this.chartType;
    if (chartTypes[compName]) {
      this.heading = chartTypes[compName].heading;
      this.html = chartTypes[compName].html;
      this.ts = chartTypes[compName].ts;
    }
  }
}
