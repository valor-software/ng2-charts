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
import { Chart, DefaultDataPoint, ChartConfiguration, ChartType, ChartEvent } from 'chart.js';
import { assign, merge } from 'lodash-es';
import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'canvas[baseChart]',
  exportAs: 'base-chart'
})
export class BaseChartDirective<TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown> implements OnDestroy, OnChanges {

  @Input() public type: TType;
  @Input() public legend: boolean;
  @Input() public data: ChartConfiguration<TType, TData, TLabel>['data'];
  @Input() public options: ChartConfiguration<TType, TData, TLabel>['options'];
  @Input() public plugins: ChartConfiguration<TType, TData, TLabel>['plugins'];

  @Input() public labels: ChartConfiguration<TType, TData, TLabel>['data']['labels'];
  @Input() public datasets: ChartConfiguration<TType, TData, TLabel>['data']['datasets'];

  @Output() public chartClick: EventEmitter<{ event?: ChartEvent, active?: {}[] }> = new EventEmitter();
  @Output() public chartHover: EventEmitter<{ event: ChartEvent, active: {}[] }> = new EventEmitter();

  public ctx: string;
  public chart: Chart<TType, TData, TLabel>;

  private subs: Subscription[] = [];
  private themeOverrides: ChartConfiguration<TType, TData, TLabel>['options'];

  public constructor(private element: ElementRef, private zone: NgZone, private themeService: ThemeService<TType, TData, TLabel>) {
    this.ctx = element.nativeElement.getContext('2d');
    this.subs.push(this.themeService.colorschemesOptions
      .pipe(distinctUntilChanged())
      .subscribe(r => this.themeChanged(r)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const requireRender = [ 'type' ];

    if (requireRender.some(key => changes.hasOwnProperty(key))) {
      this.render();
    } else {
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

    if (this.ctx) {
      return this.chart = new Chart(this.ctx, this.getChartConfiguration());
    }
  }

  public update(duration?: any): void {
    if (this.chart) {
      this.zone.runOutsideAngular(() => this.chart.update(duration));
    }
  }

  public hideDataset(index: number, hidden: boolean): void {
    if (this.chart) {
      this.chart.getDatasetMeta(index).hidden = hidden;
      this.update();
    }
  }

  public isDatasetHidden(index: number): boolean {
    return this.chart.getDatasetMeta(index).hidden;
  }

  public toBase64Image(): string {
    return this.chart.toBase64Image();
  }

  private themeChanged(options): void {
    this.themeOverrides = options;
    if (this.chart) {
      assign(this.chart.config.options, this.getChartOptions());

      this.update();
    }
  }

  private getChartOptions(): ChartConfiguration<TType, TData, TLabel>['options'] {
    return merge({
        onHover: (event: ChartEvent, active: {}[]) => {
          if (active && !active.length) {
            return;
          }
          this.chartHover.emit({ event, active });
        },
        onClick: (event?: ChartEvent, active?: {}[]) => {
          this.chartClick.emit({ event, active });
        }
      },
      this.themeOverrides,
      this.options,
      {
        legend: {
          display: this.legend
        }
      });
  }

  private getChartConfiguration(): ChartConfiguration<TType, TData, TLabel> {
    return merge({
      type: this.type,
      data: this.data,
      plugins: this.plugins,
      options: this.getChartOptions()
    }, {
      data: {
        labels: this.labels,
        datasets: this.datasets
      }
    });
  }
}
