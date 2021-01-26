import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DefaultDataPoint, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ThemeService<TYPE extends ChartType = any, DATA extends unknown[] = DefaultDataPoint<TYPE>, LABEL = string> {
  private pColorschemesOptions: ChartConfiguration<TYPE, DATA, LABEL>['options'];
  public colorschemesOptions = new BehaviorSubject<ChartOptions<TYPE>>(null);

  constructor() {
  }

  setColorschemesOptions(options: ChartConfiguration<TYPE, DATA, LABEL>['options']): void {
    this.pColorschemesOptions = options;
    this.colorschemesOptions.next(options);
  }

  getColorschemesOptions(): ChartConfiguration<TYPE, DATA, LABEL>['options'] {
    return this.pColorschemesOptions;
  }
}
