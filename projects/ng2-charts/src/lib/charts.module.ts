import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart, ChartConfiguration,
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
import { builtInDefaults } from './get-colors';
import merge from 'lodash-es/merge';
import { ThemeService } from './theme.service';

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
export class ChartsModule {
  constructor(@Optional() @SkipSelf() parentModule?: ChartsModule) {
    if (parentModule) {
      throw new Error(
        'ChartsModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(config?: Pick<ChartConfiguration, 'plugins'> & {defaults: any}): ModuleWithProviders<ChartsModule> {
    Chart.register(config?.plugins || []);

    const ngChartsDefaults = merge(builtInDefaults, config?.defaults || {});

    defaults.set(ngChartsDefaults);

    return {
      ngModule: ChartsModule,
      providers: [ ThemeService ]
    };
  }
}
