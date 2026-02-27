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
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Chart,
  ChartConfiguration,
  ChartEvent,
  ChartType,
  DefaultDataPoint,
  defaults,
  Plugin,
  UpdateMode,
} from 'chart.js';
import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { merge } from 'lodash-es';
import {
  NG_CHARTS_CONFIGURATION,
  NgChartsConfiguration,
} from './ng-charts.provider';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'canvas[baseChart]',
  exportAs: 'base-chart',
  standalone: true,
})
export class BaseChartDirective<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown,
>
  implements OnDestroy, OnChanges
{
  @Input() public type: ChartConfiguration<TType, TData, TLabel>['type'] =
    'bar' as TType;
  @Input() public legend?: boolean;
  @Input() public data?: ChartConfiguration<TType, TData, TLabel>['data'];
  @Input() public options: ChartConfiguration<TType, TData, TLabel>['options'];
  @Input() public plugins: Plugin<TType>[] = [];

  @Input() public labels?: ChartConfiguration<
    TType,
    TData,
    TLabel
  >['data']['labels'];
  @Input() public datasets?: ChartConfiguration<
    TType,
    TData,
    TLabel
  >['data']['datasets'];

  @Output() public chartClick: EventEmitter<{
    event?: ChartEvent;
    active?: object[];
  }> = new EventEmitter();
  @Output() public chartHover: EventEmitter<{
    event: ChartEvent;
    active: object[];
  }> = new EventEmitter();

  public ctx: CanvasRenderingContext2D | null = null;
  public chart?: Chart<TType, TData, TLabel>;

  private subs: Subscription[] = [];
  private themeOverrides: ChartConfiguration['options'] = {};
  private element = inject(ElementRef);
  private zone = inject(NgZone);
  private themeService = inject(ThemeService);
  private config = inject(NG_CHARTS_CONFIGURATION, { optional: true }) as
    | NgChartsConfiguration
    | undefined;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  public constructor() {
    if (this.config?.registerables) {
      Chart.register(...this.config.registerables);
    }

    if (this.config?.defaults) {
      defaults.set(this.config.defaults);
    }

    // Only get canvas context in browser environment
    if (this.isBrowser) {
      this.ctx = this.element.nativeElement.getContext('2d');
    }

    this.subs.push(
      this.themeService.colorschemesOptions
        .pipe(distinctUntilChanged())
        .subscribe((r) => this.themeChanged(r)),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isBrowser) {
      return; // Skip chart operations in SSR
    }

    const requireRender = ['type'];
    const propertyNames = Object.getOwnPropertyNames(changes);

    if (
      propertyNames.some((key) => requireRender.includes(key)) ||
      propertyNames.every((key) => changes[key].isFirstChange())
    ) {
      this.render();
    } else {
      // For legend changes, we need to update the chart options and re-render
      if (this.chart && changes['legend']) {
        const config = this.getChartConfiguration();
        if (config.options) {
          this.chart.options = config.options;
        }
        this.update();
      } else if (this.chart) {
        const config = this.getChartConfiguration();

        // Using assign to avoid changing the original object reference
        if (config.data && this.chart.config.data) {
          Object.assign(this.chart.config.data, config.data);
        }
        if (config.plugins && this.chart.config.plugins) {
          Object.assign(this.chart.config.plugins, config.plugins);
        }
        if (config.options && this.chart.config.options) {
          Object.assign(this.chart.config.options, config.options);
        }

        this.update();
      }
    }
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
    this.subs.forEach((s) => s.unsubscribe());
  }

  public render(): Chart<TType, TData, TLabel> | undefined {
    if (!this.isBrowser || !this.ctx) {
      return undefined;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    return this.zone.runOutsideAngular(
      () =>
        (this.chart = new Chart(
          this.ctx as CanvasRenderingContext2D,
          this.getChartConfiguration(),
        )),
    );
  }

  public update(mode?: UpdateMode): void {
    if (this.chart && this.isBrowser) {
      this.zone.runOutsideAngular(() => this.chart?.update(mode));
    }
  }

  public hideDataset(index: number, hidden: boolean): void {
    if (this.chart && this.isBrowser) {
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

  private getChartOptions(): ChartConfiguration<
    TType,
    TData,
    TLabel
  >['options'] {
    const baseOptions = {
      onHover: (event: ChartEvent, active: object[]) => {
        if (!this.chartHover.observed && !this.chartHover.observers?.length) {
          return;
        }

        this.zone.run(() => this.chartHover.emit({ event, active }));
      },
      onClick: (event?: ChartEvent, active?: object[]) => {
        if (!this.chartClick.observed && !this.chartClick.observers?.length) {
          return;
        }

        this.zone.run(() => this.chartClick.emit({ event, active }));
      },
    };

    const legendOptions = {
      plugins: {
        legend: {
          display: this.legend,
        },
      },
    };

    return merge(
      baseOptions,
      this.themeOverrides || {},
      this.options || {},
      legendOptions,
    ) as ChartConfiguration<TType, TData, TLabel>['options'];
  }

  private getChartConfiguration(): ChartConfiguration<TType, TData, TLabel> {
    return {
      type: this.type,
      data: this.getChartData(),
      options: this.getChartOptions(),
      plugins: this.plugins,
    };
  }

  private getChartData(): ChartConfiguration<TType, TData, TLabel>['data'] {
    return this.data
      ? this.data
      : {
          labels: this.labels || [],
          datasets: this.datasets || [],
        };
  }
}
