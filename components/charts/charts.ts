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
  }

}

export interface IChart {
  // TODO: refactor in one method getDataObject and getChartData ???
  getChartBuilder(ctx:any, data:Array<any>, options:any);
  getDataObject(label:string, value:any):any;
  getChartData(labels:any, dataObject:any):any;
  // getDefaultOptions():any;
  // getDefaultColours():Array<any>;
}

export class GenericChart {
  private ctx:any;
  private parent:any;
  private chart:any;
  private _data:Array<any> = [];
  private labels:Array<any> = [];
  private options:any = {responsive: true};
  private series:Array<any> = [];
  private colours:Array<any> = [];
  private chartType:string;
  private legend:boolean;
  private legendTemplate:any;
  private initFlag:boolean = false;

  constructor(private imp:IChart) {

  }

  init(element:ElementRef) {
    this.ctx = element.nativeElement.children[0].getContext('2d');
    this.parent = element.nativeElement;
    this.refresh();
    this.initFlag = true;

  }

  destroy() {
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


  private refresh() {
    /* console.log(this._data,
     this.labels,
     this.options,
     this.series,
     this.colours,
     this.chartType,
     this.legend);
     */

    this.destroy();
    let dataset:Array<any> = [];

    for (let i = 0; i < this.data.length; i++) {

      let colourDesc:Array<number> = [this.getRandomInt(0, 255), this.getRandomInt(0, 255), this.getRandomInt(0, 255)];
      let colour = i < this.colours.length ? this.colours[i] : this.getColour(colourDesc);

      let data:any = Object.assign(colour,
        this.imp.getDataObject(this.series[i], this.data[i]));

      dataset.push(data);
    }

    let data:any = this.imp.getChartData(this.labels, dataset);

    this.chart = this.imp.getChartBuilder(this.ctx, data, this.options);
    if (this.legend) {
      this.setLegend();
    }

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
    'options'
    // TODO
    /*'click',
     'hover'*/
  ],
  evens: ['chartClick'],
  lifecycle: [LifecycleEvent.onInit, LifecycleEvent.onDestroy]
})
@View({
  template: `
  <canvas style="width: 100%; height: 100%;"></canvas>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})
export class LineChart extends GenericChart {

  constructor(private element:ElementRef) {
    super(new LineChart.Impl());
  }

  onInit() {
    super.init(this.element);
  }

  onDestroy() {
    super.destroy();
  }
}

export module LineChart {
  export class Impl implements IChart {

    getChartBuilder(ctx:any, data:Array<any>, options:any) {
      return new Chart(ctx).Line(data, options);
    }

    getDataObject(label:string, value:any):any {
      return {
        label: label,
        data: value
      };
    }

    getChartData(labels:any, dataObject:any):any {
      return {
        labels: labels,
        datasets: dataObject
      };
    }
  }
}

// BarChart
@Component({
  selector: 'bar-chart',
  properties: [
    'data',
    'labels',
    'series',
    'colours',
    // TODO
    // 'getColour',
    'chartType',
    'legend',
    'options'
    // TODO
    /*'click',
     'hover'*/
  ],
  evens: ['chartClick'],
  lifecycle: [LifecycleEvent.onInit, LifecycleEvent.onDestroy]
})
@View({
  template: `
  <canvas style="width: 100%; height: 100%;"></canvas>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})

export class BarChart extends GenericChart {

  constructor(private element:ElementRef) {
    super(new BarChart.Impl());
  }

  onInit() {
    super.init(this.element);
  }

  onDestroy() {
    super.destroy();
  }
}
export module BarChart {
  export class Impl implements IChart {

    getChartBuilder(ctx:any, data:Array<any>, options:any) {
      return new Chart(ctx).Bar(data, options);
    }

    getDataObject(label:string, value:any):any {
      return {
        label: label,
        data: value
      };
    }

    getChartData(labels:any, dataObject:any):any {
      return {
        labels: labels,
        datasets: dataObject
      };
    }

  }
}

// PolarArea
@Component({
  selector: 'polar-area-chart',
  properties: [
    'data',
    'labels',
    'series',
    'colours',
    // TODO
    // 'getColour',
    'chartType',
    'legend',
    'options'
    // TODO
    /*'click',
     'hover'*/
  ],
  evens: ['chartClick'],
  lifecycle: [LifecycleEvent.onInit, LifecycleEvent.onDestroy]
})
@View({
  template: `
  <canvas style="width: 100%; height: 100%;"></canvas>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})

export class PolarAreaChart extends GenericChart {

  constructor(private element:ElementRef) {
    super(new PolarAreaChart.Impl());
  }

  onInit() {
    super.init(this.element);
  }

  onDestroy() {
    super.destroy();
  }
}

export module PolarAreaChart {
  export class Impl implements IChart {

    getChartBuilder(ctx:any, data:Array<any>, options:any) {
      return new Chart(ctx).PolarArea(data, options);
    }

    getDataObject(label:string, value:any):any {
      return {
        label: label,
        value: value
      };
    }

    getChartData(labels:any, dataObject:any):any {
      return dataObject;
    }

  }
}


// Doughnut
@Component({
  selector: 'doughnut-chart',
  properties: [
    'data',
    'labels',
    'series',
    'colours',
    // TODO
    // 'getColour',
    'chartType',
    'legend',
    'options'
    // TODO
    /*'click',
     'hover'*/
  ],
  evens: ['chartClick'],
  lifecycle: [LifecycleEvent.onInit, LifecycleEvent.onDestroy]
})
@View({
  template: `
  <canvas style="width: 100%; height: 100%;"></canvas>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})

export class DoughnutChart extends GenericChart {

  constructor(private element:ElementRef) {
    super(new DoughnutChart.Impl());
  }

  onInit() {
    super.init(this.element);
  }

  onDestroy() {
    super.destroy();
  }
}

export module DoughnutChart {
  export class Impl implements IChart {

    getChartBuilder(ctx:any, data:Array<any>, options:any) {
      return new Chart(ctx).Doughnut(data, options);
    }

    getDataObject(label:string, value:any):any {
      return {
        label: label,
        value: value
      };
    }

    getChartData(labels:any, dataObject:any):any {
      return dataObject;
    }

  }
}

// Pie
@Component({
  selector: 'pie-chart',
  properties: [
    'data',
    'labels',
    'series',
    'colours',
    // TODO
    // 'getColour',
    'chartType',
    'legend',
    'options'
    // TODO
    /*'click',
     'hover'*/
  ],
  evens: ['chartClick'],
  lifecycle: [LifecycleEvent.onInit, LifecycleEvent.onDestroy]
})
@View({
  template: `
  <canvas style="width: 100%; height: 100%;"></canvas>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})

export class PieChart extends GenericChart {

  constructor(private element:ElementRef) {
    super(new PieChart.Impl());
  }

  onInit() {
    super.init(this.element);
  }

  onDestroy() {
    super.destroy();
  }
}

export module PieChart {
  export class Impl implements IChart {
    getChartBuilder(ctx:any, data:Array<any>, options:any) {
      return new Chart(ctx).Pie(data, options);
    }

    getDataObject(label:string, value:any):any {
      return {
        label: label,
        value: value
      };
    }

    getChartData(labels:any, dataObject:any):any {
      return dataObject;
    }

  }
}

// RadarChart
@Component({
  selector: 'radar-chart',
  properties: [
    'data',
    'labels',
    'series',
    'colours',
    // TODO
    // 'getColour',
    'chartType',
    'legend',
    'options'
    // TODO
    /*'click',
     'hover'*/
  ],
  evens: ['chartClick'],
  lifecycle: [LifecycleEvent.onInit, LifecycleEvent.onDestroy]
})
@View({
  template: `
  <canvas style="width: 100%; height: 100%;"></canvas>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})

export class RadarChart extends GenericChart {

  constructor(private element:ElementRef) {
    super(new RadarChart.Impl());
  }

  onInit() {
    super.init(this.element);
  }

  onDestroy() {
    super.destroy();
  }
}


export module RadarChart {
  export class Impl implements IChart {

    getChartBuilder(ctx:any, data:Array<any>, options:any) {
      return new Chart(ctx).Radar(data, options);
    }

    getDataObject(label:string, value:any):any {
      return {
        label: label,
        data: value
      };
    }

    getChartData(labels:any, dataObject:any):any {
      return {
        labels: labels,
        datasets: dataObject
      };
    }

  }
}

export const charts:Array<any> = [Charts, LineChart, BarChart, PolarAreaChart, DoughnutChart,
  PieChart, RadarChart];
