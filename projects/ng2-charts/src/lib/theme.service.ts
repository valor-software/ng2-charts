import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChartOptions, BaseChartMetaConfig, ChartMetaConfig } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ThemeService<T extends BaseChartMetaConfig = ChartMetaConfig> {
  private pColorschemesOptions: ChartOptions<T> = {};
  public colorschemesOptions = new BehaviorSubject<ChartOptions<T>>({});

  constructor() { }

  setColorschemesOptions(options: ChartOptions<T>) {
    this.pColorschemesOptions = options;
    this.colorschemesOptions.next(options);
  }

  getColorschemesOptions() {
    return this.pColorschemesOptions;
  }
}
