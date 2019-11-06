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
  DoCheck,
} from '@angular/core';
import * as chartJs from 'chart.js';
import { getColors } from './get-colors';
import { Color } from './color';
import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash-es';

export type SingleDataSet = (number[] | chartJs.ChartPoint[]);
export type MultiDataSet = (number[] | chartJs.ChartPoint[])[];
export type SingleOrMultiDataSet = SingleDataSet | MultiDataSet;

export type PluginServiceGlobalRegistrationAndOptions = chartJs.PluginServiceGlobalRegistration & chartJs.PluginServiceRegistrationOptions;
export type SingleLineLabel = string;
export type MultiLineLabel = string[];
export type Label = SingleLineLabel | MultiLineLabel;

interface OldState {
  dataExists: boolean;
  dataLength: number;
  datasetsExists: boolean;
  datasetsLength: number;
  datasetsDataObjects: any[];
  datasetsDataLengths: number[];
  colorsExists: boolean;
  colors: Color[];
  labelsExist: boolean;
  labels: Label[];
  legendExists: boolean;
  legend: {
    position?: string;
  };
}

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
export class BaseChartDirective implements OnDestroy, OnChanges, OnInit, OnDestroy, DoCheck {
  @Input() public data: SingleOrMultiDataSet;
  @Input() public datasets: chartJs.ChartDataSets[];
  @Input() public labels: Label[];
  @Input() public options: chartJs.ChartOptions = {};
  @Input() public chartType: chartJs.ChartType;
  @Input() public colors: Color[];
  @Input() public legend: boolean;
  @Input() public plugins: PluginServiceGlobalRegistrationAndOptions[];

  @Output() public chartClick: EventEmitter<{ event?: MouseEvent, active?: {}[] }> = new EventEmitter();
  @Output() public chartHover: EventEmitter<{ event: MouseEvent, active: {}[] }> = new EventEmitter();

  public ctx: string;
  public chart: Chart;

  private old: OldState = {
    dataExists: false,
    dataLength: 0,
    datasetsExists: false,
    datasetsLength: 0,
    datasetsDataObjects: [],
    datasetsDataLengths: [],
    colorsExists: false,
    colors: [],
    labelsExist: false,
    labels: [],
    legendExists: false,
    legend: {},
  };

  private subs: Subscription[] = [];

  /**
   * Register a plugin.
   */
  public static registerPlugin(plugin: PluginServiceGlobalRegistrationAndOptions) {
    chartJs.Chart.plugins.register(plugin);
  }

  public static unregisterPlugin(plugin: PluginServiceGlobalRegistrationAndOptions) {
    chartJs.Chart.plugins.unregister(plugin);
  }

  public constructor(
    private element: ElementRef,
    private themeService: ThemeService,
  ) { }

  public ngOnInit() {
    this.ctx = this.element.nativeElement.getContext('2d');
    this.refresh();
    this.subs.push(this.themeService.colorschemesOptions.subscribe(r => this.themeChanged(r)));
  }

  private themeChanged(options: {}) {
    this.refresh();
  }

  ngDoCheck(): void {
    if (!this.chart) {
      return;
    }
    let updateRequired = UpdateType.Default;
    const wantUpdate = (x: UpdateType) => {
      updateRequired = x > updateRequired ? x : updateRequired;
    };

    if (!!this.data !== this.old.dataExists) {
      this.propagateDataToDatasets(this.data);

      this.old.dataExists = !!this.data;

      wantUpdate(UpdateType.Update);
    }

    if (this.data && this.data.length !== this.old.dataLength) {
      this.old.dataLength = this.data && this.data.length || 0;

      wantUpdate(UpdateType.Update);
    }

    if (!!this.datasets !== this.old.datasetsExists) {
      this.old.datasetsExists = !!this.datasets;

      wantUpdate(UpdateType.Update);
    }

    if (this.datasets && this.datasets.length !== this.old.datasetsLength) {
      this.old.datasetsLength = this.datasets && this.datasets.length || 0;

      wantUpdate(UpdateType.Update);
    }

    if (this.datasets && this.datasets.filter((x, i) => x.data !== this.old.datasetsDataObjects[i]).length) {
      this.old.datasetsDataObjects = this.datasets.map(x => x.data);

      wantUpdate(UpdateType.Update);
    }

    if (this.datasets && this.datasets.filter((x, i) => x.data.length !== this.old.datasetsDataLengths[i]).length) {
      this.old.datasetsDataLengths = this.datasets.map(x => x.data.length);

      wantUpdate(UpdateType.Update);
    }

    if (!!this.colors !== this.old.colorsExists) {
      this.old.colorsExists = !!this.colors;

      this.updateColors();

      wantUpdate(UpdateType.Update);
    }

    // This smells of inefficiency, might need to revisit this
    if (this.colors && this.colors.filter((x, i) => !this.colorsEqual(x, this.old.colors[i])).length) {
      this.old.colors = this.colors.map(x => this.copyColor(x));

      this.updateColors();

      wantUpdate(UpdateType.Update);
    }

    if (!!this.labels !== this.old.labelsExist) {
      this.old.labelsExist = !!this.labels;

      wantUpdate(UpdateType.Update);
    }

    if (this.labels && this.labels.filter((x, i) => !this.labelsEqual(x, this.old.labels[i])).length) {
      this.old.labels = this.labels.map(x => this.copyLabel(x));

      wantUpdate(UpdateType.Update);
    }

    if (!!this.options.legend !== this.old.legendExists) {
      this.old.legendExists = !!this.options.legend;

      wantUpdate(UpdateType.Refresh);
    }

    if (this.options.legend && this.options.legend.position !== this.old.legend.position) {
      this.old.legend.position = this.options.legend.position;

      wantUpdate(UpdateType.Refresh);
    }

    switch (updateRequired as UpdateType) {
      case UpdateType.Default:
        break;
      case UpdateType.Update:
        this.update();
        break;
      case UpdateType.Refresh:
        this.refresh();
        break;
    }
  }

  copyLabel(a: Label): Label {
    if (Array.isArray(a)) {
      return [...a];
    }
    return a;
  }

  labelsEqual(a: Label, b: Label) {
    return true
      && Array.isArray(a) === Array.isArray(b)
      && (Array.isArray(a) || a === b)
      && (!Array.isArray(a) || a.length === b.length)
      && (!Array.isArray(a) || a.filter((x, i) => x !== b[i]).length === 0)
      ;
  }

  copyColor(a: Color): Color {
    const rc: Color = {
      backgroundColor: a.backgroundColor,
      borderWidth: a.borderWidth,
      borderColor: a.borderColor,
      borderCapStyle: a.borderCapStyle,
      borderDash: a.borderDash,
      borderDashOffset: a.borderDashOffset,
      borderJoinStyle: a.borderJoinStyle,
      pointBorderColor: a.pointBorderColor,
      pointBackgroundColor: a.pointBackgroundColor,
      pointBorderWidth: a.pointBorderWidth,
      pointRadius: a.pointRadius,
      pointHoverRadius: a.pointHoverRadius,
      pointHitRadius: a.pointHitRadius,
      pointHoverBackgroundColor: a.pointHoverBackgroundColor,
      pointHoverBorderColor: a.pointHoverBorderColor,
      pointHoverBorderWidth: a.pointHoverBorderWidth,
      pointStyle: a.pointStyle,
      hoverBackgroundColor: a.hoverBackgroundColor,
      hoverBorderColor: a.hoverBorderColor,
      hoverBorderWidth: a.hoverBorderWidth,
    };

    return rc;
  }

  colorsEqual(a: Color, b: Color) {
    if (!a !== !b) {
      return false;
    }
    return !a || true
      && (a.backgroundColor === b.backgroundColor)
      && (a.borderWidth === b.borderWidth)
      && (a.borderColor === b.borderColor)
      && (a.borderCapStyle === b.borderCapStyle)
      && (a.borderDash === b.borderDash)
      && (a.borderDashOffset === b.borderDashOffset)
      && (a.borderJoinStyle === b.borderJoinStyle)
      && (a.pointBorderColor === b.pointBorderColor)
      && (a.pointBackgroundColor === b.pointBackgroundColor)
      && (a.pointBorderWidth === b.pointBorderWidth)
      && (a.pointRadius === b.pointRadius)
      && (a.pointHoverRadius === b.pointHoverRadius)
      && (a.pointHitRadius === b.pointHitRadius)
      && (a.pointHoverBackgroundColor === b.pointHoverBackgroundColor)
      && (a.pointHoverBorderColor === b.pointHoverBorderColor)
      && (a.pointHoverBorderWidth === b.pointHoverBorderWidth)
      && (a.pointStyle === b.pointStyle)
      && (a.hoverBackgroundColor === b.hoverBackgroundColor)
      && (a.hoverBorderColor === b.hoverBorderColor)
      && (a.hoverBorderWidth === b.hoverBorderWidth)
      ;
  }

  updateColors() {
    this.datasets.forEach((elm, index) => {
      if (this.colors && this.colors[index]) {
        Object.assign(elm, this.colors[index]);
      } else {
        Object.assign(elm, getColors(this.chartType, index, elm.data.length), { ...elm });
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    let updateRequired = UpdateType.Default;
    const wantUpdate = (x: UpdateType) => {
      updateRequired = x > updateRequired ? x : updateRequired;
    };

    // Check if the changes are in the data or datasets or labels or legend

    if (changes.hasOwnProperty('data') && changes.data.currentValue) {
      this.propagateDataToDatasets(changes.data.currentValue);

      wantUpdate(UpdateType.Update);
    }

    if (changes.hasOwnProperty('datasets') && changes.datasets.currentValue) {
      this.propagateDatasetsToData(changes.datasets.currentValue);

      wantUpdate(UpdateType.Update);
    }

    if (changes.hasOwnProperty('labels')) {
      if (this.chart) {
        this.chart.data.labels = changes.labels.currentValue;
      }

      wantUpdate(UpdateType.Update);
    }

    if (changes.hasOwnProperty('legend')) {
      if (this.chart) {
        this.chart.config.options.legend.display = changes.legend.currentValue;
        this.chart.generateLegend();
      }

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

  public ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
    this.subs.forEach(x => x.unsubscribe());
  }

  public update(duration?: any, lazy?: any) {
    if (this.chart) {
      return this.chart.update(duration, lazy);
    }
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

  public getChartConfiguration(): chartJs.ChartConfiguration {
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

    const mergedOptions = this.smartMerge(options, this.themeService.getColorschemesOptions());

    const chartConfig: chartJs.ChartConfiguration = {
      type: this.chartType,
      data: {
        labels: this.labels || [],
        datasets
      },
      plugins: this.plugins,
      options: mergedOptions,
    };

    return chartConfig;
  }

  public getChartBuilder(ctx: string/*, data:any[], options:any*/): Chart {
    const chartConfig = this.getChartConfiguration();
    return new chartJs.Chart(ctx, chartConfig);
  }

  smartMerge(options: any, overrides: any, level: number = 0): any {
    if (level === 0) {
      options = cloneDeep(options);
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

  private propagateDatasetsToData(datasets: chartJs.ChartDataSets[]) {
    this.data = this.datasets.map(r => r.data);
    if (this.chart) {
      this.chart.data.datasets = datasets;
    }
    this.updateColors();
  }

  private propagateDataToDatasets(newDataValues: SingleOrMultiDataSet): void {
    if (this.isMultiDataSet(newDataValues)) {
      if (this.datasets && newDataValues.length === this.datasets.length) {
        this.datasets.forEach((dataset, i: number) => {
          dataset.data = newDataValues[i];
        });
      } else {
        this.datasets = newDataValues.map((data: number[], index: number) => {
          return { data, label: this.joinLabel(this.labels[index]) || `Label ${index}` };
        });
        if (this.chart) {
          this.chart.data.datasets = this.datasets;
        }
      }
    } else {
      if (!this.datasets) {
        this.datasets = [{ data: newDataValues }];
        if (this.chart) {
          this.chart.data.datasets = this.datasets;
        }
      } else {
        this.datasets[0].data = newDataValues;
        this.datasets.splice(1); // Remove all elements but the first
      }
    }
    this.updateColors();
  }

  private isMultiDataSet(data: SingleOrMultiDataSet): data is MultiDataSet {
    return Array.isArray(data[0]);
  }

  private getDatasets() {
    if (!this.datasets && !this.data) {
      throw new Error(`ng-charts configuration error, data or datasets field are required to render chart ${this.chartType}`);
    }

    // If `datasets` is defined, use it over the `data` property.
    if (this.datasets) {
      this.propagateDatasetsToData(this.datasets);
      return this.datasets;
    }

    if (this.data) {
      this.propagateDataToDatasets(this.data);
      return this.datasets;
    }
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
    if (this.ctx) {
      this.chart = this.getChartBuilder(this.ctx/*, data, this.options*/);
    }
  }
}
