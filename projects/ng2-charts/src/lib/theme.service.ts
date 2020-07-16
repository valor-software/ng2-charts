import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private pColorschemesOptions: ChartOptions = {};
  public colorschemesOptions = new BehaviorSubject<ChartOptions>({});

  constructor() { }

  setColorschemesOptions(options: ChartOptions): void {
    this.pColorschemesOptions = options;
    this.colorschemesOptions.next(options);
  }

  getColorschemesOptions(): ChartOptions {
    return this.pColorschemesOptions;
  }
}
