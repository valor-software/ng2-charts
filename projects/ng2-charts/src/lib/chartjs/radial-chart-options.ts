import { ChartOptions } from './chart-options';
import { BaseChartMetaConfig } from './base-chart-meta-config';
import { RadialLinearScale } from './radial-linear-scale';

// [Charts/Radar/Scale Options](https://www.chartjs.org/docs/latest/charts/radar.html#scale-options)
export interface RadialChartOptions<T extends BaseChartMetaConfig> extends ChartOptions<T> {
  scale?: RadialLinearScale;
}
