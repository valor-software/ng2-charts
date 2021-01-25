import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DefaultDataPoint, IChartConfiguration, IChartOptions, IChartType } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ThemeService<TYPE extends IChartType = any, DATA extends unknown[] = DefaultDataPoint<TYPE>, LABEL = string> {
  private pColorschemesOptions: IChartConfiguration<TYPE, DATA, LABEL>['options'];
  public colorschemesOptions = new BehaviorSubject<IChartOptions<TYPE>>(null);

  constructor() {
  }

  setColorschemesOptions(options: IChartConfiguration<TYPE, DATA, LABEL>['options']): void {
    this.pColorschemesOptions = options;
    this.colorschemesOptions.next(options);
  }

  getColorschemesOptions(): IChartConfiguration<TYPE, DATA, LABEL>['options'] {
    return this.pColorschemesOptions;
  }
}
