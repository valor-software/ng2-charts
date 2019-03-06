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
import * as chartJs from 'chart.js';
import { getColors } from './get-colors';
import { Color } from './color';

export type SingleDataSet = (number[] | chartJs.ChartPoint[]);
export type MultiDataSet = (number[] | chartJs.ChartPoint[])[];
export type SingleOrMultiDataSet = SingleDataSet | MultiDataSet;

/* The following two types are copied from @types/chart.js because they are not
 * exported from there. There is a pull request to definitely type requesting this
 * change (PR #33614 https://github.com/DefinitelyTyped/DefinitelyTyped/pull/33614)
 */
export interface PluginServiceGlobalRegistration {
  id?: string;
}

export interface PluginServiceRegistrationOptions {
  beforeInit?(chartInstance: Chart, options?: any): void;
  afterInit?(chartInstance: Chart, options?: any): void;

  beforeUpdate?(chartInstance: Chart, options?: any): void;
  afterUpdate?(chartInstance: Chart, options?: any): void;

  beforeLayout?(chartInstance: Chart, options?: any): void;
  afterLayout?(chartInstance: Chart, options?: any): void;

  beforeDatasetsUpdate?(chartInstance: Chart, options?: any): void;
  afterDatasetsUpdate?(chartInstance: Chart, options?: any): void;

  beforeDatasetUpdate?(chartInstance: Chart, options?: any): void;
  afterDatasetUpdate?(chartInstance: Chart, options?: any): void;

  // This is called at the start of a render. It is only called once, even if
  // the animation will run for a number of frames. Use beforeDraw or afterDraw
  // to do something on each animation frame
  beforeRender?(chartInstance: Chart, options?: any): void;
  afterRender?(chartInstance: Chart, options?: any): void;

  // Easing is for animation
  beforeDraw?(chartInstance: Chart, easing: string, options?: any): void;
  afterDraw?(chartInstance: Chart, easing: string, options?: any): void;

  // Before the datasets are drawn but after scales are drawn
  beforeDatasetsDraw?(chartInstance: Chart, easing: string, options?: any): void;
  afterDatasetsDraw?(chartInstance: Chart, easing: string, options?: any): void;

  beforeDatasetDraw?(chartInstance: Chart, easing: string, options?: any): void;
  afterDatasetDraw?(chartInstance: Chart, easing: string, options?: any): void;

  // Called before drawing the `tooltip`. If any plugin returns `false`,
  // the tooltip drawing is cancelled until another `render` is triggered.
  beforeTooltipDraw?(chartInstance: Chart, tooltipData?: any, options?: any): void;
  // Called after drawing the `tooltip`. Note that this hook will not,
  // be called if the tooltip drawing has been previously cancelled.
  afterTooltipDraw?(chartInstance: Chart, tooltipData?: any, options?: any): void;

  // Called when an event occurs on the chart
  beforeEvent?(chartInstance: Chart, event: Event, options?: any): void;
  afterEvent?(chartInstance: Chart, event: Event, options?: any): void;

  resize?(chartInstance: Chart, newChartSize: Chart.ChartSize, options?: any): void;
  destroy?(chartInstance: Chart): void;

  /** @deprecated since version 2.5.0. Use `afterLayout` instead. */
  afterScaleUpdate?(chartInstance: Chart, options?: any): void;
}

export type PluginServiceGlobalRegistrationAndOptions = PluginServiceGlobalRegistration & PluginServiceRegistrationOptions;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'canvas[baseChart]',
  exportAs: 'base-chart'
})
export class BaseChartDirective implements OnDestroy, OnChanges, OnInit {
  @Input() public data: SingleOrMultiDataSet;
  @Input() public datasets: chartJs.ChartDataSets[];
  @Input() public labels: string[];
  @Input() public options: chartJs.ChartOptions = {};
  @Input() public chartType: chartJs.ChartType;
  @Input() public colors: Color[];
  @Input() public legend: boolean;
  @Input() public plugins: PluginServiceGlobalRegistrationAndOptions[];

  @Output() public chartClick: EventEmitter<{ event?: MouseEvent, active?: {}[] }> = new EventEmitter();
  @Output() public chartHover: EventEmitter<{ event: MouseEvent, active: {}[] }> = new EventEmitter();

  public ctx: string;
  public chart: Chart;
  private initFlag = false;

  /**
   * Register a plugin.
   */
  public static registerPlugin(plugin: PluginServiceGlobalRegistrationAndOptions) {
    chartJs.Chart.plugins.register(plugin);
  }

  public static unregisterPlugin(plugin: PluginServiceGlobalRegistrationAndOptions) {
    chartJs.Chart.plugins.unregister(plugin);
  }

  public constructor(private element: ElementRef) { }

  public ngOnInit() {
    this.ctx = this.element.nativeElement.getContext('2d');
    this.initFlag = true;
    if (this.data || this.datasets) {
      this.refresh();
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.initFlag) {
      let updateRequired = false;
      // Check if the changes are in the data or datasets or labels or legend

      if (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets')) {
        if (changes.data) {
          this.updateChartData(changes.data.currentValue);
        } else {
          this.updateChartData(changes.datasets.currentValue);
        }

        updateRequired = true;
      }

      if (changes.hasOwnProperty('labels')) {
        this.chart.data.labels = changes.labels.currentValue;

        updateRequired = true;
      }

      if (changes.hasOwnProperty('legend')) {
        this.chart.config.options.legend.display = changes.legend.currentValue;
        this.chart.generateLegend();

        updateRequired = true;
      }

      if (updateRequired) {
        // ... if so, update chart
        this.chart.update();
      } else {
        // otherwise rebuild the chart
        this.refresh();
      }
    }
  }

  public ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
  }

  public update(duration?: any, lazy?: any) {
    return this.chart.update(duration, lazy);
  }

  public hideDataset(index: number, hidden: boolean) {
    this.chart.getDatasetMeta(index).hidden = hidden;
    this.chart.update();
  }

  public isDatasetHidden(index: number): boolean {
    return this.chart.getDatasetMeta(index).hidden;
  }

  public toBase64Image(): string {
    return this.chart.toBase64Image();
  }

  public getChartBuilder(ctx: string/*, data:any[], options:any*/): Chart {
    const datasets = this.getDatasets();

    const options = Object.assign({}, this.options);
    if (this.legend === false) {
      options.legend = { display: false };
    }
    // hook for onHover and onClick events
    options.hover = options.hover || {};
    if (!options.hover.onHover) {
      options.hover.onHover = (event: MouseEvent, active: {}[]) => {
        if (active && !active.length) {
          return;
        }
        this.chartHover.emit({ event, active });
      };
    }

    if (!options.onClick) {
      options.onClick = (event?: MouseEvent, active?: {}[]) => {
        this.chartClick.emit({ event, active });
      };
    }

    const chartConfig: chartJs.ChartConfiguration = {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets
      },
      options,
      plugins: this.plugins,
    };

    return new chartJs.Chart(ctx, chartConfig);
  }

  private isChartDataSetsArray(v: SingleOrMultiDataSet | chartJs.ChartDataSets[]): v is chartJs.ChartDataSets[] {
    const elm = v[0];
    return (typeof (elm) === 'object') && 'data' in elm;
  }

  private updateChartData(newDataValues: SingleOrMultiDataSet | chartJs.ChartDataSets[]): void {
    if (this.isChartDataSetsArray(newDataValues)) {
      if (newDataValues.length === this.chart.data.datasets.length) {
        this.chart.data.datasets.forEach((dataset, i: number) => {
          dataset.data = newDataValues[i].data;
          if (newDataValues[i].label) {
            dataset.label = newDataValues[i].label;
          }
        });
      } else {
        this.chart.data.datasets = [...newDataValues];
      }
    } else if (!this.isSingleDataSet(newDataValues)) {
      if (newDataValues.length === this.chart.data.datasets.length) {
        this.chart.data.datasets.forEach((dataset, i: number) => {
          dataset.data = newDataValues[i];
        });
      } else {
        this.chart.data.datasets = newDataValues.map((data: number[], index: number) => {
          return { data, label: this.labels[index] || `Label ${index}` };
        });
      }
    } else {
      this.chart.data.datasets[0].data = newDataValues;
    }
  }

  private isSingleDataSet(data: SingleOrMultiDataSet): data is SingleDataSet {
    return !Array.isArray(data[0]);
  }

  private getDatasets() {
    let datasets: chartJs.ChartDataSets[] = void 0;
    // in case if datasets is not provided, but data is present
    if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
      if (!this.isSingleDataSet(this.data)) {
        datasets = this.data.map((data: number[], index: number) => {
          return { data, label: this.labels[index] || `Label ${index}` };
        });
      } else {
        datasets = [{ data: this.data, label: `Label 0` }];
      }
    }

    if (this.datasets && this.datasets.length ||
      (datasets && datasets.length)) {
      datasets = (this.datasets || datasets)
        .map((elm: chartJs.ChartDataSets, index: number) => {
          const newElm: chartJs.ChartDataSets = Object.assign({}, elm);
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

  private refresh() {
    // if (this.options && this.options.responsive) {
    //   setTimeout(() => this.refresh(), 50);
    // }

    // todo: remove this line, it is producing flickering
    this.ngOnDestroy();
    this.chart = this.getChartBuilder(this.ctx/*, data, this.options*/);
  }
}
