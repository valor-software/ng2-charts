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
import { Chart, ChartConfiguration, ChartEvent } from 'chart.js';

import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import assign from 'lodash-es/assign';
import merge from 'lodash-es/merge';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'canvas[baseChart]',
  exportAs: 'base-chart'
})
export class BaseChartDirective implements OnDestroy, OnChanges {

  @Input() public type: ChartConfiguration['type'];
  @Input() public legend: boolean;
  @Input() public data: ChartConfiguration['data'];
  @Input() public options?: ChartConfiguration['options'];
  @Input() public plugins?: ChartConfiguration['plugins'];

  @Input() public labels?: ChartConfiguration['data']['labels'];
  @Input() public datasets?: ChartConfiguration['data']['datasets'];

  @Output() public chartClick: EventEmitter<{ event?: ChartEvent, active?: {}[] }> = new EventEmitter();
  @Output() public chartHover: EventEmitter<{ event: ChartEvent, active: {}[] }> = new EventEmitter();

  public ctx: string;
  public chart: Chart;

  private subs: Subscription[] = [];
  private themeOverrides: ChartConfiguration['options'];

  public constructor(private element: ElementRef, private zone: NgZone, private themeService: ThemeService) {
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

  public render(): Chart {
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

  private getChartOptions(): ChartConfiguration['options'] {
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

  private getChartConfiguration(): ChartConfiguration {
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
