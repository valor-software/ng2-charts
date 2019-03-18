import { RadialScale } from './radial-scale';
import { GridLineOptions } from './grid-line-options';
import { PointLabelOptions } from './point-label-options';
import { AngleLineOptions } from './angle-line-options';
import { RadialLinearTickOptions } from './radial-linear-tick-options';

// [Axes/Radial/Linear](https://www.chartjs.org/docs/latest/axes/radial/linear.html)
export interface RadialLinearScale extends RadialScale {
  angleLines?: AngleLineOptions;
  gridLines?: GridLineOptions;
  pointLabels?: PointLabelOptions;
  ticks?: RadialLinearTickOptions;
}
