import {
  Directive,
  OnDestroy,
  OnChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  SimpleChanges
} from '@angular/core';
import { Chart } from 'chart.js';
import { getColors } from './get-colors';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'canvas[baseChart]',
  exportAs: 'base-chart'
})
export class BaseChartDirective implements OnDestroy, OnChanges, OnInit {
  @Input() public data: number[] | any[];
  @Input() public datasets: any[];
  @Input() public labels: Array<any> = [];
  @Input() public options: any = {};
  @Input() public chartType: string;
  @Input() public colors: Array<any>;
  @Input() public legend: boolean;

  @Output() public chartClick: EventEmitter<any> = new EventEmitter();
  @Output() public chartHover: EventEmitter<any> = new EventEmitter();

  public ctx: any;
  public chart: any;
  private cvs: any;
  private initFlag = false;

  private element: ElementRef;

  /**
   * Register a plugin.
   */
  public static registerPlugin(plugin: any): void {
    Chart.plugins.register(plugin);
  }

  public constructor(element: ElementRef) {
    this.element = element;
  }

  public ngOnInit(): any {
    this.ctx = this.element.nativeElement.getContext('2d');
    this.cvs = this.element.nativeElement;
    this.initFlag = true;
    if (this.data || this.datasets) {
      this.refresh();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.initFlag) {
      // Check if the changes are in the data or datasets
      if (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets')) {
        if (changes.data) {
          this.updateChartData(changes.data.currentValue);
        } else {
          this.updateChartData(changes.datasets.currentValue);
        }

        this.chart.update();
      } else {
        // otherwise rebuild the chart
        this.refresh();
      }
    }
  }

  public ngOnDestroy(): any {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
  }

  public getChartBuilder(ctx: any/*, data:Array<any>, options:any*/): any {
    const datasets: any = this.getDatasets();

    const options: any = Object.assign({}, this.options);
    if (this.legend === false) {
      options.legend = { display: false };
    }
    // hock for onHover and onClick events
    options.hover = options.hover || {};
    if (!options.hover.onHover) {
      options.hover.onHover = (active: Array<any>) => {
        if (active && !active.length) {
          return;
        }
        this.chartHover.emit({ active });
      };
    }

    if (!options.onClick) {
      options.onClick = (event: any, active: Array<any>) => {
        this.chartClick.emit({ event, active });
      };
    }

    const opts = {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets
      },
      options
    };

    return new Chart(ctx, opts);
  }

  private updateChartData(newDataValues: number[] | any[]): void {
    if (Array.isArray(newDataValues[0].data)) {
      if (newDataValues.length === this.chart.data.datasets.length) {
        this.chart.data.datasets.forEach((dataset: any, i: number) => {
          dataset.data = newDataValues[i].data;

          if (newDataValues[i].label) {
            dataset.label = newDataValues[i].label;
          }
        });
      } else {
        this.chart.data.datasets = [...newDataValues];
      }
    } else {
      this.chart.data.datasets[0].data = newDataValues;
    }
  }

  private getDatasets(): any {
    let datasets: any = void 0;
    // in case if datasets is not provided, but data is present
    if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
      if (Array.isArray(this.data[0])) {
        datasets = (this.data as Array<number[]>).map((data: number[], index: number) => {
          return { data, label: this.labels[index] || `Label ${index}` };
        });
      } else {
        datasets = [{ data: this.data, label: `Label 0` }];
      }
    }

    if (this.datasets && this.datasets.length ||
      (datasets && datasets.length)) {
      datasets = (this.datasets || datasets)
        .map((elm: number, index: number) => {
          const newElm: any = Object.assign({}, elm);
          if (this.colors && this.colors.length) {
            Object.assign(newElm, this.colors[index]);
          } else {
            Object.assign(newElm, getColors(this.chartType, index, newElm.data.length));
          }
          return newElm;
        });
    }

    if (!datasets) {
      throw new Error(`ng-charts configuration error,
      data or datasets field are required to render char ${this.chartType}`);
    }

    return datasets;
  }

  private refresh(): any {
    // if (this.options && this.options.responsive) {
    //   setTimeout(() => this.refresh(), 50);
    // }

    // todo: remove this line, it is producing flickering
    this.ngOnDestroy();
    this.chart = this.getChartBuilder(this.ctx/*, data, this.options*/);
  }
}
