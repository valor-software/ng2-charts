import {
  Directive,
  OnDestroy,
  OnChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
import { getColors } from './get-colors';
import { Color } from './color';
import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { BaseChartMetaConfig } from './chartjs/base-chart-meta-config';
import { PluginServiceGlobalRegistration } from './chartjs/plugin-service-global-registration';
import { PluginServiceRegistrationOptions } from './chartjs/plugin-service-registration-options';
import { ChartOptions } from './chartjs/chart-options';
import { ChartConfiguration } from './chartjs/chart-configuration';
import { ChartDataSetsUnion } from './chartjs/chart-data-sets-union';
import { AngularChart } from './chartjs/angular-chart';

export type SingleDataSet<T extends BaseChartMetaConfig> = T['datasetTypes']['data'];
export type MultiDataSet<T extends BaseChartMetaConfig> = Array<T['datasetTypes']['data']>;
export type SingleOrMultiDataSet<T extends BaseChartMetaConfig> = SingleDataSet<T> | MultiDataSet<T>;

export type PluginServiceGlobalRegistrationAndOptions<T extends BaseChartMetaConfig> =
  PluginServiceGlobalRegistration & PluginServiceRegistrationOptions<T>;
export type SingleLineLabel = string;
export type MultiLineLabel = string[];
export type Label = SingleLineLabel | MultiLineLabel;

enum UpdateType {
  Default,
  Update,
  Refresh
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'canvas[baseChart]',
  exportAs: 'base-chart'
})
export class BaseChartDirective<T extends BaseChartMetaConfig>
  implements OnDestroy, OnChanges, OnInit, OnDestroy {
  @Input() public data: T['datasetTypes']['data'];
  @Input() public datasets: T['datasetTypes'][];
  @Input() public labels: Label[];
  @Input() public options: ChartOptions<T> = {};
  @Input() public chartType: T['datasetTypes']['type'];
  @Input() public colors: Color[];
  @Input() public legend: boolean;
  @Input() public plugins: PluginServiceGlobalRegistrationAndOptions<T>[];

  @Output() public chartClick: EventEmitter<{ event?: MouseEvent, active?: {}[] }> = new EventEmitter();
  @Output() public chartHover: EventEmitter<{ event: MouseEvent, active: {}[] }> = new EventEmitter();

  public ctx: string;
  public chart: AngularChart<T>;
  private initFlag = false;

  private subs: Subscription[] = [];

  /**
   * Register a plugin.
   */
  public static registerPlugin<T extends BaseChartMetaConfig>(plugin: PluginServiceGlobalRegistrationAndOptions<T>) {
    AngularChart.plugins.register(plugin);
  }

  public static unregisterPlugin<T extends BaseChartMetaConfig>(plugin: PluginServiceGlobalRegistrationAndOptions<T>) {
    AngularChart.plugins.unregister(plugin);
  }

  public constructor(
    private element: ElementRef,
    private themeService: ThemeService<T>,
  ) { }

  public ngOnInit() {
    this.ctx = this.element.nativeElement.getContext('2d');
    this.initFlag = true;
    if (this.data || this.datasets) {
      this.refresh();
    }
    this.subs.push(this.themeService.colorschemesOptions.subscribe(r => this.themeChanged(r)));
  }

  private themeChanged(options: {}) {
    this.refresh();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.initFlag) {
      let updateRequired = UpdateType.Default;
      const wantUpdate = (x: UpdateType) => {
        updateRequired = x > updateRequired ? x : updateRequired;
      };

      // Check if the changes are in the data or datasets or labels or legend

      if (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets')) {
        if (changes.data) {
          this.updateChartData(changes.data.currentValue);
        } else {
          this.updateChartData(changes.datasets.currentValue);
        }

        wantUpdate(UpdateType.Update);
      }

      if (changes.hasOwnProperty('labels')) {
        this.chart.data.labels = changes.labels.currentValue;

        wantUpdate(UpdateType.Update);
      }

      if (changes.hasOwnProperty('legend')) {
        this.chart.config.options.legend.display = changes.legend.currentValue;
        this.chart.generateLegend();

        wantUpdate(UpdateType.Update);
      }

      if (changes.hasOwnProperty('options')) {
        wantUpdate(UpdateType.Refresh);
      }

      switch (updateRequired as UpdateType) {
        case UpdateType.Update:
          this.update();
          break;
        case UpdateType.Refresh:
        case UpdateType.Default:
          this.refresh();
          break;
      }
    }
  }

  public ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
    this.subs.forEach(x => x.unsubscribe());
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

  public getChartBuilder(ctx: string/*, data:any[], options:any*/): AngularChart<T> {
    const datasets = this.getDatasets();

    const options = Object.assign({}, this.options);
    if (this.legend === false) {
      options.legend = { display: false };
    }
    // hook for onHover and onClick events
    options.hover = options.hover || {};
    if (!options.onHover) {
      options.onHover = (event: MouseEvent, active: {}[]) => {
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

    const mergedOptions = this.smartMerge(options, this.themeService.getColorschemesOptions());

    const chartConfig: ChartConfiguration<T> = {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets
      },
      plugins: this.plugins,
      options: mergedOptions,
    };

    return new AngularChart(ctx, chartConfig);
  }

  smartMerge(options: any, overrides: any, level: number = 0): any {
    if (level === 0) {
      options = _.cloneDeep(options);
    }
    const keysToUpdate = Object.keys(overrides);
    keysToUpdate.forEach(key => {
      if (Array.isArray(overrides[key])) {
        const arrayElements = options[key];
        if (arrayElements) {
          arrayElements.forEach(r => {
            this.smartMerge(r, overrides[key][0], level + 1);
          });
        }
      } else if (typeof (overrides[key]) === 'object') {
        if (!(key in options)) {
          options[key] = {};
        }
        this.smartMerge(options[key], overrides[key], level + 1);
      } else {
        options[key] = overrides[key];
      }
    });
    if (level === 0) {
      return options;
    }
  }

  private isChartDataSetsArray(v: T['datasetTypes']['data'] | Array<T['datasetTypes']>): v is T['datasetTypes'][] {
    const elm = v[0];
    return (typeof (elm) === 'object') && 'data' in elm;
  }

  private isMultiLineLabel(label: Label): label is MultiLineLabel {
    return Array.isArray(label);
  }

  private joinLabel(label: Label): string {
    if (!label) {
      return null;
    }
    if (this.isMultiLineLabel(label)) {
      return label.join(' ');
    } else {
      return label;
    }
  }

  private updateChartData(newDataValues: T['datasetTypes']['data'] | Array<T['datasetTypes']>): void {
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
    } else if (this.isMultiDataSet(newDataValues)) {
      if (newDataValues.length === this.chart.data.datasets.length) {
        this.chart.data.datasets.forEach((dataset, i: number) => {
          dataset.data = newDataValues[i];
        });
      } else {
        this.chart.data.datasets = newDataValues.map((data: number[], index: number) => {
          return { data, label: this.joinLabel(this.labels[index]) || `Label ${index}` };
        });
      }
    } else {
      this.chart.data.datasets[0].data = newDataValues;
    }
    this.chart.data.datasets.forEach((elm, index) => {
      if (this.colors && this.colors[index]) {
        Object.assign(elm, this.colors[index]);
      } else {
        Object.assign(elm, getColors(this.chartType, index, elm.data.length));
      }
    });
  }

  private isSingleDataSet(data: SingleOrMultiDataSet<T>): data is SingleDataSet<T> {
    return !Array.isArray(data[0]);
  }

  private isMultiDataSet(data: SingleOrMultiDataSet<T>): data is MultiDataSet<T> {
    return Array.isArray(data[0]);
  }

  private getDatasets() {
    let datasets: Array<T['datasetTypes']> = void 0;
    // in case if datasets is not provided, but data is present
    if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
      if (this.isMultiDataSet(this.data)) {
        datasets = this.data.map((data, index: number) => {
          return { data, label: this.joinLabel(this.labels[index]) || `Label ${index}` };
        });
      } else {
        datasets = [{ data: this.data, label: `Label 0` }];
      }
    }

    if (this.datasets && this.datasets.length ||
      (datasets && datasets.length)) {
      datasets = (this.datasets || datasets)
        .map((elm: ChartDataSetsUnion, index: number) => {
          const newElm: ChartDataSetsUnion = Object.assign({}, elm);
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
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
    this.chart = this.getChartBuilder(this.ctx/*, data, this.options*/);
  }
}
