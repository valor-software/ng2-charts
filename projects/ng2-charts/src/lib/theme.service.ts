import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DefaultDataPoint, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ThemeService<TType extends ChartType = any, TData = DefaultDataPoint<TType>, TLabel = string> {
  private pColorschemesOptions: ChartOptions<TType>;
  public colorschemesOptions: BehaviorSubject<any> = new BehaviorSubject<ChartOptions<TType>>(null);

  constructor() {
  }

  setColorschemesOptions(options: ChartConfiguration<TType, TData, TLabel>['options']): void {
    this.pColorschemesOptions = options;
    this.colorschemesOptions.next(options);
  }

  getColorschemesOptions(): ChartConfiguration<TType, TData, TLabel>['options'] {
    return this.pColorschemesOptions;
  }
}
