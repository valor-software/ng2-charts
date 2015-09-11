/// <reference path="../../../tsd.d.ts" />

import {
  Component, View, EventEmitter,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass
} from 'angular2/angular2';

import {charts} from '../../../components/index';

// webpack html imports
let template = require('./charts-demo.html');

@Component({
  selector: 'charts-demo',
  host: {
    '(chartClick)': 'lineChartClicked($event)'
  }
})
@View({
  template: template,
  directives: [charts, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ChartsDemo {
  private lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  private lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  private lineChartSeries:Array<any> = ['Series A', 'Series B'];
  private lineChartOptions:any = {
    animation: false,
    multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
  };
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
    }
  ];
  private lineChartType:string = 'Line';
  private lineChartLegend:boolean = false;

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
  lineChartClicked(e:string) {
    console.log(e);
  }
}
