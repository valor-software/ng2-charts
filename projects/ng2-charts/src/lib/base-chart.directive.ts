import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartEvent,
  ChartType,
  DefaultDataPoint,
  Plugin
} from 'chart.js';

import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { merge } from 'lodash-es';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'canvas[baseChart]',
  exportAs: 'base-chart',
})
export class BaseChartDirective<TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown> implements OnDestroy, OnChanges {

  @Input() public type: ChartConfiguration<TType, TData, TLabel>['type'] = 'bar' as TType;
  @Input() public legend?: boolean;
  @Input() public data?: ChartConfiguration<TType, TData, TLabel>['data'];
  @Input() public options: ChartConfiguration<TType, TData, TLabel>['options'];
  @Input() public plugins: Plugin<TType>[] = [];

  @Input() public labels?: ChartConfiguration<TType, TData, TLabel>['data']['labels'];
  @Input() public datasets?: ChartConfiguration<TType, TData, TLabel>['data']['datasets'];

  @Output() public chartClick: EventEmitter<{ event?: ChartEvent, active?: {}[] }> = new EventEmitter();
  @Output() public chartHover: EventEmitter<{ event: ChartEvent, active: {}[] }> = new EventEmitter();

  public ctx: string;
  public chart?: Chart<TType, TData, TLabel>;

  private subs: Subscription[] = [];
  private themeOverrides: ChartConfiguration['options'] = {};

  public constructor(element: ElementRef, private zone: NgZone, private themeService: ThemeService) {
    this.ctx = element.nativeElement.getContext('2d');
    this.subs.push(this.themeService.colorschemesOptions
      .pipe(distinctUntilChanged())
      .subscribe(r => this.themeChanged(r)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const requireRender = [ 'type' ];
    const propertyNames = Object.getOwnPropertyNames(changes);

    if (propertyNames.some(key => requireRender.includes(key)) ||
      propertyNames.every(key => changes[key].isFirstChange())
    ) {
      this.render();
    } else {
      const config = this.getChartConfiguration();

      // Using assign to avoid changing the original object reference
      if (this.chart) {
        Object.assign(this.chart.config.data, config.data);
        if (this.chart.config.plugins) {
          Object.assign(this.chart.config.plugins, config.plugins);
        }
        if (this.chart.config.options) {
          Object.assign(this.chart.config.options, config.options);
        }
      }

      this.update();
    }
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
    this.subs.forEach(s => s.unsubscribe());
  }

  public render(): Chart<TType, TData, TLabel> {
    if (this.chart) {
      this.chart.destroy();
    }

    return this.zone.runOutsideAngular(() => this.chart = new Chart(this.ctx, this.getChartConfiguration()));
  }

  public update(duration?: any): void {
    if (this.chart) {
      this.zone.runOutsideAngular(() => this.chart?.update(duration));
    }
  }

  public hideDataset(index: number, hidden: boolean): void {
    if (this.chart) {
      this.chart.getDatasetMeta(index).hidden = hidden;
      this.update();
    }
  }

  public isDatasetHidden(index: number): boolean | undefined {
    return this.chart?.getDatasetMeta(index)?.hidden;
  }

  public toBase64Image(): string | undefined {
    return this.chart?.toBase64Image();
  }

  private themeChanged(options: ChartConfiguration['options']): void {
    this.themeOverrides = options;
    if (this.chart) {
      if (this.chart.config.options) {
        Object.assign(this.chart.config.options, this.getChartOptions());
      }

      this.update();
    }
  }

  private getChartOptions(): ChartConfiguration<TType, TData, TLabel>['options'] {
    return merge({
        onHover: (event: ChartEvent, active: {}[]) => {
          if (!this.chartHover.observed && !this.chartHover.observers?.length) {
            return;
          }

          this.zone.run(() => this.chartHover.emit({ event, active }));
        },
        onClick: (event?: ChartEvent, active?: {}[]) => {
          if (!this.chartClick.observed && !this.chartClick.observers?.length) {
            return;
          }

          this.zone.run(() => this.chartClick.emit({ event, active }));
        }
      },
      this.themeOverrides,
      this.options,
      {
        plugins: {
          legend: {
            display: this.legend
          }
        }
      });
  }

  private getChartConfiguration(): ChartConfiguration<TType, TData, TLabel> {
    return {
      type: this.type,
      data: this.getChartData(),
      options: this.getChartOptions(),
      plugins: this.plugins
    };
  }

  private getChartData(): ChartConfiguration<TType, TData, TLabel>['data'] {
    return this.data ? this.data : {
      labels: this.labels || [],
      datasets: this.datasets || []
    }
  }
}
