import { CommonScale } from './common-scale';
import { ScaleType } from './scale-type';
import { CartesianTickOptions } from './cartesian-tick-options';
import { GridLineOptions } from './grid-line-options';
import { ScaleTitleOptions } from './scale-title-options';

// [Axes/Cartesian](https://www.chartjs.org/docs/latest/axes/cartesian/)
export interface CartesianScale extends CommonScale {
  type?: ScaleType | string;
  position?: string;
  offset?: boolean;
  gridLines?: GridLineOptions;
  scaleLabel?: ScaleTitleOptions;
  ticks?: CartesianTickOptions;
}
