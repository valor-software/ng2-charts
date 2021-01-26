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
import assign from 'lodash-es/assign';
import merge from 'lodash-es/merge';
import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'canvas[baseChart]',
  exportAs: 'base-chart'
})
export class BaseChartDirective<TYPE extends ChartType,
  DATA extends unknown[] = DefaultDataPoint<TYPE>,
  LABEL = string | string[]> implements OnDestroy, OnChanges {

  @Input() public type: TYPE;
  @Input() public legend: boolean;
  @Input() public data: ChartConfiguration<TYPE, DATA, LABEL>['data'];
  @Input() public options: ChartConfiguration<TYPE, DATA, LABEL>['options'];
  @Input() public plugins: ChartConfiguration<TYPE, DATA, LABEL>['plugins'];

  @Input() public labels: ChartConfiguration<TYPE, DATA, LABEL>['data']['labels'];
  @Input() public datasets: ChartConfiguration<TYPE, DATA, LABEL>['data']['datasets'];

  @Output() public chartClick: EventEmitter<{ event?: ChartEvent, active?: {}[] }> = new EventEmitter();
  @Output() public chartHover: EventEmitter<{ event: ChartEvent, active: {}[] }> = new EventEmitter();

  public ctx: string;
  public chart: Chart<TYPE, DATA, LABEL>;

  private subs: Subscription[] = [];
  private themeOverrides: ChartConfiguration<TYPE, DATA, LABEL>['options'];

  public constructor(private element: ElementRef, private zone: NgZone, private themeService: ThemeService<TYPE, DATA, LABEL>) {
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

  public render(): Chart<TYPE, DATA, LABEL> {
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

  private getChartOptions(): ChartConfiguration<TYPE, DATA, LABEL>['options'] {
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
      this.options,
      this.themeOverrides,
      {
        legend: {
          display: this.legend
        }
      });
  }

  private getChartConfiguration(): ChartConfiguration<TYPE, DATA, LABEL> {
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
