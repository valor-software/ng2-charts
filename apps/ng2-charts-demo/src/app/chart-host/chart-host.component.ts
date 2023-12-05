/* eslint-disable @typescript-eslint/no-var-requires */
import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import ts from '../bar-chart/bar-chart.component.ts?raw';
import html from '../bar-chart/bar-chart.component.html?raw';

export const chartTypes = {
  bar: {
    heading: 'Bar Chart',
    // ts: ts,
    html: html,
  },
  doughnut: {
    heading: 'Doughnut Chart',
    ts: '',
    html: '',
  },
  dynamic: {
    heading: 'Dynamic Chart',
    ts: '',
    html: '',
  },
  line: {
    heading: 'Line Chart',
    ts: '',
    html: '',
  },
  pie: {
    heading: 'Pie Chart',
    ts: '',
    html: '',
  },
  polarArea: {
    heading: 'Polar Area Chart',
    ts: '',
    html: '',
  },
  bubble: {
    heading: 'Bubble Chart',
    ts: '',
    html: '',
  },
  radar: {
    heading: 'Radar Chart',
    ts: '',
    html: '',
  },
  scatter: {
    heading: 'Scatter Chart',
    ts: '',
    html: '',
  },
  financial: {
    heading: 'Financial Chart',
    ts: '',
    html: '',
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
      // this.ts = chartTypes[compName].ts;
    }
  }
}
