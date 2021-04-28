import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DefaultDataPoint, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private pColorschemesOptions: ChartOptions;
  public colorschemesOptions: BehaviorSubject<any> = new BehaviorSubject<ChartOptions>(null);

  constructor() {
  }

  setColorschemesOptions(options: ChartConfiguration['options']): void {
    this.pColorschemesOptions = options;
    this.colorschemesOptions.next(options);
  }

  getColorschemesOptions(): ChartConfiguration['options'] {
    return this.pColorschemesOptions;
  }
}
