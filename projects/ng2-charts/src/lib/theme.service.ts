import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseChartMetaConfig } from './chartjs/base-chart-meta-config';
import { ChartOptions } from './chartjs/chart-options';

@Injectable({
  providedIn: 'root'
})
export class ThemeService<T extends BaseChartMetaConfig> {
  private pColorschemesOptions: ChartOptions<T> = {};
  public colorschemesOptions = new BehaviorSubject<ChartOptions<T>>({});

  constructor() { }

  setColorschemesOptions(options: ChartOptions<T>) {
    this.pColorschemesOptions = options;
    this.colorschemesOptions.next(options);
  }

  getColorschemesOptions(): ChartOptions {
    return this.pColorschemesOptions;
  }
}
