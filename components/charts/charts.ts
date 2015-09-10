/// <reference path="../../tsd.d.ts" />

import {
  Component, View,
  Directive, LifecycleEvent,
  EventEmitter, ElementRef,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass
} from 'angular2/angular2';

let Chart = require('chart.js');

@Component({
  selector: 'chart, canvas[chart]'
})
@View({
  template: `
  <canvas></canvas>
  `,
  directives: [CORE_DIRECTIVES, NgClass]
})
export class Charts {
  constructor(element:ElementRef) {
    let ctx = element.nativeElement.children[0].getContext('2d');

    let lineData:LinearChartData = {
      labels: ['03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'],
      datasets: [
        {
          label: 'Accepted',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Quarantined',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    let myLineChart = new Chart(ctx).Line(lineData, {
      scaleShowGridLines: true,
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      scaleGridLineWidth: 1,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\">' +
      '<% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\">' +
      '</span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    });

  }
}

@Component({
  selector: 'line-chart',
  properties: [
    'data',
    'labels',
    'series',
    'colours',
    // TODO
    // 'getColour',
    'chartType',
    'legend',
    'options',
    /*'click',
     'hover',

     //TODO
     'chartData',
     'chartLabels',
     'chartOptions',
     'chartSeries',
     'chartColours',
     'chartLegend',
     'chartClick',
     'chartHover'*/
  ],
  evens: ['chartClick'],
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
  <canvas></canvas>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})
export class LineChart {
  private data:Array<any> = [];
  private labels:Array<any> = [];
  private options:any = {
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 1,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true
  };
  private series:Array<any> = [];
  private colours:Array<any> = [
    {
      fillColor: 'rgba(148,159,177,0.2)',
      strokeColor: 'rgba(148,159,177,1)',
      pointColor: 'rgba(148,159,177,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(148,159,177,0.8)'
    }
  ];
  private chartType:string;
  private legend:boolean;
  private chartClick:EventEmitter = new EventEmitter();

  constructor(public element:ElementRef) {

  }

  onInit() {
    let ctx = this.element.nativeElement.children[0].getContext('2d');

    let dataset:Array<any> = [];

    for (let i = 0, c = 0; i < this.data.length; ++i, c++) {
      let data:any = Object.assign({label: '', data: this.data[i]}, this.colours[i % this.colours.length]);
      dataset.push(data);
    }

    let lineData:LinearChartData = {
      labels: this.labels,
      datasets: dataset
    };

    let myLineChart = new Chart(ctx).Line(lineData, this.options);
    /*let myLineChart = new Chart(ctx).Line(lineData, {
     //TODO: legend default = false
     //legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
     });*/

    /*setTimeout(() => {
     this.chartClick.next('chart clicked!!!');
     }, 3000);
     this.element*/
    this.chartClick.next('chart clicked!!!');

  }
}

export const charts:Array<any> = [Charts, LineChart];
