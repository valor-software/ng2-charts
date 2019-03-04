import { Component, OnInit, ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-chart-host',
  templateUrl: './chart-host.component.html',
  styleUrls: ['./chart-host.component.scss']
})
export class ChartHostComponent implements OnInit, AfterContentInit {
  @ContentChild('main') content;

  html: string;
  ts: string;
  heading: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    const compName = this.content.__proto__.constructor.name;
    switch (compName) {
      case 'BarChartComponent':
        this.heading = 'Bar Chart';
        this.ts = require('!!raw-loader!../bar-chart/bar-chart.component.ts');
        this.html = require('!!raw-loader!../bar-chart/bar-chart.component.html');
        break;
      case 'DoughnutChartComponent':
        this.heading = 'Doughnut Chart';
        this.ts = require('!!raw-loader!../doughnut-chart/doughnut-chart.component.ts');
        this.html = require('!!raw-loader!../doughnut-chart/doughnut-chart.component.html');
        break;
      case 'DynamicChartComponent':
        this.heading = 'Dynamic Chart';
        this.ts = require('!!raw-loader!../dynamic-chart/dynamic-chart.component.ts');
        this.html = require('!!raw-loader!../dynamic-chart/dynamic-chart.component.html');
        break;
      case 'LineChartComponent':
        this.heading = 'Line Chart';
        this.ts = require('!!raw-loader!../line-chart/line-chart.component.ts');
        this.html = require('!!raw-loader!../line-chart/line-chart.component.html');
        break;
      case 'PieChartComponent':
        this.heading = 'Pie Chart';
        this.ts = require('!!raw-loader!../pie-chart/pie-chart.component.ts');
        this.html = require('!!raw-loader!../pie-chart/pie-chart.component.html');
        break;
      case 'PolarAreaChartComponent':
        this.heading = 'Polar Area Chart';
        this.ts = require('!!raw-loader!../polar-area-chart/polar-area-chart.component.ts');
        this.html = require('!!raw-loader!../polar-area-chart/polar-area-chart.component.html');
        break;
      case 'RadarChartComponent':
        this.heading = 'Radar Chart';
        this.ts = require('!!raw-loader!../radar-chart/radar-chart.component.ts');
        this.html = require('!!raw-loader!../radar-chart/radar-chart.component.html');
        break;
    }
  }
}
