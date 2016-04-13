import {
  Component, OnDestroy, OnInit, OnChanges,
  EventEmitter, ElementRef, Input
} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';

declare var Chart:any;

@Component({
  selector: 'chart, canvas[chart]',
  template: `<canvas></canvas>`,
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
  events: ['chartClick', 'chartHover'],
  template: `
  <canvas style="width: 100%; height: 100%;" (click)="click($event)" (mousemove)="hover($event)"></canvas>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})
export class BaseChart implements OnInit, OnDestroy, OnChanges {
  @Input() data:Array<any> = [];
  @Input() labels:Array<any> = [];
  @Input() options:any = {responsive: true};
  @Input() chartType:string;
  @Input() series:Array<any> = [];
  @Input() colours:Array<any> = [];
  @Input() legend:boolean;

  private ctx:any;
  private cvs:any;
  private parent:any;
  private chart:any;
  private legendTemplate:any;
  private initFlag:boolean = false;
  private chartClick:EventEmitter<any> = new EventEmitter();
  private chartHover:EventEmitter<any> = new EventEmitter();
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

  ngOnInit() {
    this.ctx = this.element.nativeElement.children[0].getContext('2d');
    this.cvs = this.element.nativeElement.children[0];
    this.parent = this.element.nativeElement;
    this.refresh();
    this.initFlag = true;
  }

  ngOnChanges() {
    if (this.initFlag) {
      this.refresh();
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    if (this.legendTemplate) {
      this.legendTemplate.destroy();
      this.legendTemplate = null;
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

  getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  rgba(colour:Array<number>, alpha:number) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
  }

  public click(evt:any) {
    let atEvent = this.chart.getPointsAtEvent || this.chart.getBarsAtEvent || this.chart.getSegmentsAtEvent;
    let activePoints = atEvent.call(this.chart, evt);
    if (activePoints.length > 0) {
      let activeLabel = activePoints[0].label;
      this.chartClick.emit({activePoints: activePoints, activeLabel: activeLabel});
    }
  }

  public hover(evt:any) {
    let atEvent = this.chart.getPointsAtEvent || this.chart.getBarsAtEvent || this.chart.getSegmentsAtEvent;
    let activePoints = atEvent.call(this.chart, evt);
    if (activePoints.length > 0) {
      let activeLabel = activePoints[0].label;
      let activePoint = activePoints[0].value;
      this.chartHover.emit({activePoints: activePoints, activePoint: activePoint, activeLabel: activeLabel});
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
    if (this.options.responsive && this.parent.clientHeight === 0) {
      return setTimeout(() => this.refresh(), 50);
    }

    this.ngOnDestroy();
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


export const CHART_DIRECTIVES:Array<any> = [Charts, BaseChart];
