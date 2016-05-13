import {
  Component, OnDestroy, OnInit, OnChanges,
  EventEmitter, ElementRef, Input, HostBinding
} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';

declare var Chart:any;

@Component({
  selector: 'chart',
  template: `<canvas></canvas>`,
  directives: [CORE_DIRECTIVES, NgClass]
})
export class ChartsComponent {}

@Component({
  selector: 'base-chart',
  template: `
  <canvas style="width: 100%; height: 100%;" (click)="click($event)" (mousemove)="hover($event)"></canvas>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})
export class BaseChartComponent implements OnDestroy, OnChanges, OnInit {
  @Input() public data:Array<any> = [];
  @Input() public labels:Array<any> = [];
  @Input() public options:any = {responsive: true};
  @Input() public chartType:string;
  @Input() public series:Array<any> = [];
  @Input() public colours:Array<any> = [];
  @Input() public legend:boolean;

  @HostBinding() public chartClick:EventEmitter<any> = new EventEmitter();
  @HostBinding() public chartHover:EventEmitter<any> = new EventEmitter();

  private ctx:any;
  private cvs:any;
  private parent:any;
  private chart:any;
  private legendTemplate:any;
  private initFlag:boolean = false;

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

  private element:ElementRef;
  public constructor(element:ElementRef) {
    this.element = element;
  }

  public ngOnInit():any {
    this.ctx = this.element.nativeElement.children[0].getContext('2d');
    this.cvs = this.element.nativeElement.children[0];
    this.parent = this.element.nativeElement;
    this.initFlag = true;
    console.log(this.data)
    if (this.data) {
      this.refresh();
    }
  }

  public ngOnChanges():any {
    console.log(this.data)
    if (this.initFlag) {
      this.refresh();
    }
  }

  public ngOnDestroy():any {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
    if (this.legendTemplate) {
      this.legendTemplate.destroy();
      this.legendTemplate = void 0;
    }
  }

  public setLegend():void {
    let list = this.parent.getElementsByTagName('ul');
    if (list.length) {
      list[0].remove();
      this.parent.insertAdjacentHTML('beforeend', this.chart.generateLegend());
    } else {
      this.parent.insertAdjacentHTML('beforeend', this.chart.generateLegend());
    }
  }

  public getColour(colour:Array<number>):any {
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

  public getRandomInt(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public rgba(colour:Array<number>, alpha:number):string {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
  }

  public click(evt:any):void {
    let atEvent = this.chart.getPointsAtEvent || this.chart.getBarsAtEvent || this.chart.getSegmentsAtEvent;
    let activePoints = atEvent.call(this.chart, evt);
    if (activePoints.length > 0) {
      let activeLabel = activePoints[0].label;
      this.chartClick.emit({activePoints: activePoints, activeLabel: activeLabel});
    }
  }

  public hover(evt:any):void {
    let atEvent = this.chart.getPointsAtEvent || this.chart.getBarsAtEvent || this.chart.getSegmentsAtEvent;
    let activePoints = atEvent.call(this.chart, evt);
    if (activePoints.length > 0) {
      let activeLabel = activePoints[0].label;
      let activePoint = activePoints[0].value;
      this.chartHover.emit({activePoints: activePoints, activePoint: activePoint, activeLabel: activeLabel});
    }
  }

  public getChartBuilder(ctx:any, data:Array<any>, options:any):any {
    let opts = options;
    opts.data = data;
    opts.type = this.chartType;
    return new Chart(ctx,opts);
    // return new Chart(ctx)[this.chartType](data, options);
  }

  public getDataObject(label:string, value:any):any {
    if (this.chartType === 'line'
      || this.chartType === 'bar'
      || this.chartType === 'radar') {
      return {
        label: label,
        data: value
      };
    }

    if (this.chartType === 'pie'
      || this.chartType === 'doughnut'
      || this.chartType === 'polarArea') {
      return {
        label: label,
        value: value
      };
    }

    return void 0;
  }

  public getChartData(labels:any, dataObject:any):any {
    if (this.chartType === 'line'
      || this.chartType === 'bar'
      || this.chartType === 'radar') {
      return {
        labels: labels,
        datasets: dataObject
      };
    }
    if (this.chartType === 'pie'
      || this.chartType === 'doughnut'
      || this.chartType === 'polarArea') {
      return dataObject;
    }
  }

  private refresh():any {
    if (this.options.responsive && this.parent.clientHeight === 0) {
      return setTimeout(() => this.refresh(), 50);
    }

    this.ngOnDestroy();
    let dataset:Array<any> = [];

    for (let i = 0; i < this.data.length; i++) {
      let colourDesc:Array<number> = [this.getRandomInt(0, 255), this.getRandomInt(0, 255), this.getRandomInt(0, 255)];
      let colour = i < this.colours.length ? this.colours[i] : this.defaultsColours[i] || this.getColour(colourDesc);

      let data:any = Object.assign(colour,
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

export const CHART_DIRECTIVES:Array<any> = [ChartsComponent, BaseChartComponent];
