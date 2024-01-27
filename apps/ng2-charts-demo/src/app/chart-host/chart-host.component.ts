import {
  AfterContentInit,
  Component,
  ContentChild,
  Input
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import barTs from '../bar-chart/bar-chart.component.txt';
import barHtml from '../bar-chart/bar-chart.component.html';
import doughnutTs from '../doughnut-chart/doughnut-chart.component.txt';
import doughnutHtml from '../doughnut-chart/doughnut-chart.component.html';
import dynamicTs from '../dynamic-chart/dynamic-chart.component.txt';
import dynamicHtml from '../dynamic-chart/dynamic-chart.component.html';
import lineTs from '../line-chart/line-chart.component.txt';
import lineHtml from '../line-chart/line-chart.component.html';
import pieTs from '../pie-chart/pie-chart.component.txt';
import pieHtml from '../pie-chart/pie-chart.component.html';
import polarAreaTs from '../polar-area-chart/polar-area-chart.component.txt';
import polarAreaHtml from '../polar-area-chart/polar-area-chart.component.html';
import bubbleTs from '../bubble-chart/bubble-chart.component.txt';
import bubbleHtml from '../bubble-chart/bubble-chart.component.html';
import radarTs from '../radar-chart/radar-chart.component.txt';
import radarHtml from '../radar-chart/radar-chart.component.html';
import scatterTs from '../scatter-chart/scatter-chart.component.txt';
import scatterHtml from '../scatter-chart/scatter-chart.component.html';
import financialTs from '../financial-chart/financial-chart.component.txt';
import financialHtml from '../financial-chart/financial-chart.component.html';

export const chartTypes: { [type: string]: { heading: string, ts: string, html: string } } = {
  bar: {
    heading: 'Bar Chart',
    ts: barTs,
    html: barHtml
  },
  doughnut: {
    heading: 'Doughnut Chart',
    ts: doughnutTs,
    html: doughnutHtml
  },
  dynamic: {
    heading: 'Dynamic Chart',
    ts: dynamicTs,
    html: dynamicHtml
  },
  line: {
    heading: 'Line Chart',
    ts: lineTs,
    html: lineHtml

  },
  pie: {
    heading: 'Pie Chart',
    ts: pieTs,
    html: pieHtml
  },
  polarArea: {
    heading: 'Polar Area Chart',
    ts: polarAreaTs,
    html: polarAreaHtml
  },
  bubble: {
    heading: 'Bubble Chart',
    ts: bubbleTs,
    html: bubbleHtml
  },
  radar: {
    heading: 'Radar Chart',
    ts: radarTs,
    html: radarHtml
  },
  scatter: {
    heading: 'Scatter Chart',
    ts: scatterTs,
    html: scatterHtml
  },
  financial: {
    heading: 'Financial Chart',
    ts: financialTs,
    html: financialHtml
  }
};

@Component({
  selector: 'app-chart-host',
  templateUrl: './chart-host.component.html'
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
