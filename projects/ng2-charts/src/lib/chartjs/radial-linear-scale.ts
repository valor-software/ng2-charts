import { RadialScale } from './radial-scale';
import { GridLineOptions } from './grid-line-options';
import { PointLabelOptions } from './point-label-options';
import { AngleLineOptions } from './angle-line-options';
import { RadialLinearTickOptions } from './radial-linear-tick-options';
import { BaseChartMetaConfig } from './base-chart-meta-config';

// [Axes/Radial/Linear](https://www.chartjs.org/docs/latest/axes/radial/linear.html)
export interface RadialLinearScale<T extends BaseChartMetaConfig> extends RadialScale<T> {
  type?: 'radialLinear' | string;
  angleLines?: AngleLineOptions;
  gridLines?: GridLineOptions;
  pointLabels?: PointLabelOptions;
  ticks?: RadialLinearTickOptions;
}
