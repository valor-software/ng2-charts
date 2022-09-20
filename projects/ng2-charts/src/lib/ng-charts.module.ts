import { Injectable, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';
import { Chart, registerables, ChartComponentLike, Defaults, defaults } from 'chart.js';
import { merge } from "lodash-es";
import { builtInDefaults } from "./get-colors";

@Injectable({ providedIn: 'root' })
export class NgChartsConfiguration {
  public plugins?: ChartComponentLike[];
  public defaults?: Partial<Defaults>;
  public generateColors = true;
}

Chart.register(...registerables);

@NgModule({
  imports: [],
  declarations: [ BaseChartDirective ],
  exports: [ BaseChartDirective ]
})
export class NgChartsModule {

  constructor(@Optional() config?: NgChartsConfiguration) {
    if (config?.plugins)
      Chart.register(...config?.plugins);

    const ngChartsDefaults = merge(config?.generateColors ? builtInDefaults : {}, config?.defaults || {});

    defaults.set(ngChartsDefaults);
  }

  public static forRoot(config?: NgChartsConfiguration): ModuleWithProviders<NgChartsModule> {
    return {
      ngModule: NgChartsModule,
      providers: [
        { provide: NgChartsConfiguration, useValue: config }
      ]
    };
  }
}
