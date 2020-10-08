import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';
import {
  Arc,
  BarController,
  BubbleController,
  CategoryScale,
  Chart,
  defaults,
  DoughnutController,
  Filler,
  Legend,
  Line,
  LinearScale,
  LineController,
  PieController,
  Point,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  Rectangle,
  ScatterController, TimeSeriesScale,
  Title,
  Tooltip
} from "chart.js";
import { builtInDefaults } from "./get-colors";
import { merge } from "lodash-es";
import { ThemeService } from "./theme.service";

Chart.register(
  Title, Tooltip, Filler, Legend,
  LineController, Line, Point, LinearScale, CategoryScale,
  BarController, Rectangle,
  DoughnutController, Arc,
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

  public static forRoot(config?): ModuleWithProviders<ChartsModule> {
    Chart.register(config.plugins || []);

    console.log('register');

    const ngChartsDefaults = merge(builtInDefaults, config.defaults);

    defaults.set('', ngChartsDefaults);

    return {
      ngModule: ChartsModule,
      providers: [ ThemeService ]
    }
  }
}
