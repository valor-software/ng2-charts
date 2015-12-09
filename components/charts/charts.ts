import {
  Component, View,
  Directive, OnInit, OnDestroy,
  EventEmitter, ElementRef,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass
} from 'angular2/angular2';

// import EventEmitter = ng.EventEmitter;

declare var Chart:any;

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
  }

}

@Component({
  selector: 'base-chart',
  properties: [
    'data',
    'labels',
    'series',
    'colours',
    'chartType',
    'legend',
    'options'
  ],
  events: ['chartClick', 'chartHover']
})
@View({
  template: `
  <canvas style="width: 100%; height: 100%;" (^click)="click($event)" (mousemove)="hover($event)"></canvas>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})


export class BaseChart implements OnInit, OnDestroy {
  private ctx:any;
  private cvs:any;
  private parent:any;
  private chart:any;
  private _data:Array<any> = [];
  private labels:Array<any> = [];
  private options:any = {responsive: true};
  private _chartType:string;
  private series:Array<any> = [];
  private colours:Array<any> = [];
  private legend:boolean;
  private legendTemplate:any;
  private initFlag:boolean = false;
  private chartClick:EventEmitter<BaseChart> = new EventEmitter();
  private chartHover:EventEmitter<BaseChart> = new EventEmitter();
  private defaultsColours:Array<any> = [
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
    }, {
      fillColor: 'rgba(247,70,74,0.2)',
      strokeColor: 'rgba(247,70,74,1)',
      pointColor: 'rgba(247,70,74,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(247,70,74,0.8)',
      color: 'rgba(247,70,74,1)',
      highlight: 'rgba(247,70,74,0.8)'
    }, {
      fillColor: 'rgba(70,191,189,0.2)',
      strokeColor: 'rgba(70,191,189,1)',
      pointColor: 'rgba(70,191,189,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(70,191,189,0.8)',
      color: 'rgba(70,191,189,1)',
      highlight: 'rgba(70,191,189,0.8)'
    }, {
      fillColor: 'rgba(253,180,92,0.2)',
      strokeColor: 'rgba(253,180,92,1)',
      pointColor: 'rgba(253,180,92,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(253,180,92,0.8)',
      color: 'rgba(253,180,92,1)',
      highlight: 'rgba(253,180,92,0.8)'
    }, {
      fillColor: 'rgba(148,159,177,0.2)',
      strokeColor: 'rgba(148,159,177,1)',
      pointColor: 'rgba(148,159,177,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(148,159,177,0.8)',
      color: 'rgba(148,159,177,1)',
      highlight: 'rgba(148,159,177,0.8)'
    }, {
      fillColor: 'rgba(77,83,96,0.2)',
      strokeColor: 'rgba(77,83,96,1)',
      pointColor: 'rgba(77,83,96,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(77,83,96,0.8)',
      color: 'rgba(77,83,96,1)',
      highlight: 'rgba(77,83,96,0.8)'
    }];


  constructor(private element:ElementRef) {
  }

  onInit() {
    this.ctx = this.element.nativeElement.children[0].getContext('2d');
    this.cvs = this.element.nativeElement.children[0];
    this.parent = this.element.nativeElement;
    this.refresh();
    this.initFlag = true;
  }

  onDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    if (this.legendTemplate) {
      this.legendTemplate.destroy();
      this.legendTemplate = null;
    }
  }

  private get data() {
    return this._data;
  }

  private set data(value) {
    this._data = value;
    if (this.initFlag && this._data && this._data.length > 0) {
      this.refresh();
    }
  }

  private get chartType() {
    return this._chartType;
  }

  private set chartType(value) {
    this._chartType = value;
    if (this.initFlag && this._chartType && this._chartType.length > 0) {
      this.refresh();
    }
  }

  setLegend() {
    let list = this.parent.getElementsByTagName('ul');
    if (list.length) {
      list[0].remove();
      this.parent.insertAdjacentHTML('beforeend', this.chart.generateLegend());
    } else {
      this.parent.insertAdjacentHTML('beforeend', this.chart.generateLegend());
    }
  }

  getColour(colour:Array<number>):any {
    return {
      fillColor: this.rgba(colour, 0.2),
      strokeColor: this.rgba(colour, 1),
      pointColor: this.rgba(colour, 1),
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: this.rgba(colour, 0.8),
      color: this.rgba(colour, 1),
      highlight: this.rgba(colour, 0.8)
    };
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  rgba(colour, alpha) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
  }

  public click(evt) {
    let atEvent = this.chart.getPointsAtEvent || this.chart.getBarsAtEvent || this.chart.getSegmentsAtEvent;
    let activePoints = atEvent.call(this.chart, evt);
    if (activePoints.length > 0) {
      let activeLabel = activePoints[0].label;
      this.chartClick.next({activePoints: activePoints, activeLabel: activeLabel});
    } else {
      console.log('not point');
    }
  }

  public hover(evt) {
    let atEvent = this.chart.getPointsAtEvent || this.chart.getBarsAtEvent || this.chart.getSegmentsAtEvent;
    let activePoints = atEvent.call(this.chart, evt);
    if (activePoints.length > 0) {
      let activeLabel = activePoints[0].label;
      let activePoint = activePoints[0].value;
      this.chartClick.next({activePoints: activePoints, activePoint: activePoint, activeLabel: activeLabel});

    } else {
      console.log('not point');
    }
  }

  getChartBuilder(ctx:any, data:Array<any>, options:any) {
    return new Chart(ctx)[this.chartType](data, options);
  }

  getDataObject(label:string, value:any):any {
    if (this.chartType === 'Line'
      || this.chartType === 'Bar'
      || this.chartType === 'Radar') {
      return {
        label: label,
        data: value
      };
    }

    if (this.chartType === 'Pie'
      || this.chartType === 'Doughnut'
      || this.chartType === 'PolarArea') {
      return {
        label: label,
        value: value
      };
    }

    return null;
  }

  getChartData(labels:any, dataObject:any) {
    if (this.chartType === 'Line'
      || this.chartType === 'Bar'
      || this.chartType === 'Radar') {
      return {
        labels: labels,
        datasets: dataObject
      };
    }
    if (this.chartType === 'Pie'
      || this.chartType === 'Doughnut'
      || this.chartType === 'PolarArea') {
      return dataObject;
    }

  }

  private refresh() {

    this.onDestroy();
    let dataset:Array<any> = [];

    for (let i = 0; i < this.data.length; i++) {

      let colourDesc:Array<number> = [this.getRandomInt(0, 255), this.getRandomInt(0, 255), this.getRandomInt(0, 255)];
      let colour = i < this.colours.length ? this.colours[i] : this.defaultsColours[i] || this.getColour(colourDesc);


      let data:any = (<any>Object).assign(colour,
        this.getDataObject(this.series[i] || this.labels[i], this.data[i]));

      dataset.push(data);

    }
    let data:any = this.getChartData(this.labels, dataset);

    this.chart = this.getChartBuilder(this.ctx, data, this.options);

    if (this.legend) {
      this.setLegend();
    }

  }
}


export const charts:Array<any> = [Charts, BaseChart];
