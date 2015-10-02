/// <reference path="../../../tsd.d.ts" />

import {
  Component, View, EventEmitter,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass
} from 'angular2/angular2';

import {charts} from '../../../components/index';

// webpack html imports
let template = require('./charts-demo.html');

@Component({
  selector: 'charts-demo'
})
@View({
  template: template,
  directives: [charts, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ChartsDemo {

  // lineChart
  private lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
    [18, 48, 77, 9, 100, 27, 40]
  ];
  private lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  private lineChartSeries:Array<any> = ['Series A', 'Series B', 'Series C'];
  private lineChartOptions:any = {
    animation: false,
    responsive: true,
    multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
  };
  private lineChartType:string = 'Line';
  private pieChartType:string = 'Pie';


  private randomizeType() {
    this.lineChartType = this.lineChartType === 'Line' ? 'Bar' : 'Line';
    this.pieChartType = this.pieChartType === 'Doughnut' ? 'Pie' : 'Doughnut';
  }


  private lineChartColours:Array<any> = [
    { // grey
      fillColor: 'rgba(148,159,177,0.2)',
      strokeColor: 'rgba(148,159,177,1)',
      pointColor: 'rgba(148,159,177,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      fillColor: 'rgba(77,83,96,0.2)',
      strokeColor: 'rgba(77,83,96,1)',
      pointColor: 'rgba(77,83,96,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(77,83,96,1)'
    },
    { // grey
      fillColor: 'rgba(148,159,177,0.2)',
      strokeColor: 'rgba(148,159,177,1)',
      pointColor: 'rgba(148,159,177,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(148,159,177,0.8)'
    }
  ];
  private lineChartLegend:boolean = true;

  constructor() {
    console.log('foo demo');
  }

  private randomize() {
    let _lineChartData = [];
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = [];
      for (let j = 0; j < this.lineChartData[i].length; j++) {
        _lineChartData[i].push(Math.floor((Math.random() * 100) + 1));

      }
    }
    this.lineChartData = _lineChartData;
  }


  chartClicked(e:any) {
    console.log(e);
  }

  chartHovered(e:any) {
    console.log(e);
  }


  // BarChart
  private barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
  };
  private barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  private barChartSeries = ['Series A', 'Series B'];
  private barChartLegend:boolean = true;

  private barChartData = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];


  // PolarArea
  private polarAreaChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  private polarAreaChartData = [300, 500, 100, 40, 120];
  private polarAreaChartColours = [
    {
      fillColor: 'rgba(151,187,205,0.2)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,0.8)',
      color: 'rgba(151,187,205,1)',
      highlight: 'rgba(151,187,205,0.8)'
    }, {
      fillColor: 'rgba(220,220,220,0.2)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,0.8)',
      color: 'rgba(220,220,220,1)',
      highlight: 'rgba(220,220,220,0.8)'
    },
    {
      fillColor: 'rgba(247,70,74,0.2)',
      strokeColor: 'rgba(247,70,74,1)',
      pointColor: 'rgba(247,70,74,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(247,70,74,0.8)',
      color: 'rgba(247,70,74,1)',
      highlight: 'rgba(247,70,74,0.8)'
    }
  ];

  // Doughnut
  private doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  private doughnutChartData = [350, 450, 100];

  // Pie
  private pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  private pieChartData = [300, 500, 100];

  // Radar
  private radarChartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  private radarChartData = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];

}
