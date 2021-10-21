import { Injectable, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  ChartComponentLike,
  ChartConfiguration,
  defaults,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  TimeSeriesScale,
  Title,
  Tooltip
} from 'chart.js';
import { merge } from "lodash-es";
import { builtInDefaults } from "./get-colors";

Chart.register(
  Title, Tooltip, Filler, Legend,
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  BarController, BarElement,
  DoughnutController, ArcElement,
  RadarController, RadialLinearScale,
  PieController,
  PolarAreaController,
  BubbleController,
  ScatterController,
  TimeSeriesScale);

@NgModule({
  imports: [],
  declarations: [ BaseChartDirective ],
  exports: [ BaseChartDirective ]
})
export class NgChartsModule {

  constructor(@Optional() config?: NgChartsConfiguration) {
    if (config?.plugins)
      Chart.register(config?.plugins);

    const ngChartsDefaults = merge(builtInDefaults, config?.defaults || {});

    defaults.set(ngChartsDefaults);
  }

  public static forRoot(config?: Pick<ChartConfiguration, 'plugins'> & { defaults: any }): ModuleWithProviders<NgChartsModule> {
    return {
      ngModule: NgChartsModule,
      providers: [
        { provide: NgChartsConfiguration, useValue: config }
      ]
    };
  }
}

@Injectable({ providedIn: 'root' })
export class NgChartsConfiguration {
  public plugins?: ChartComponentLike;
  public defaults?: any;
}
