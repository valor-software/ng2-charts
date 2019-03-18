import { CartesianScale } from './cartesian-scale';
import { LogarithmicTickOptions } from './logarithmic-tick-options';

// [Axes/Cartesian/Logarithmic](https://www.chartjs.org/docs/latest/axes/cartesian/logarithmic.html)
export interface LogarithmicScale extends CartesianScale {
  type?: 'logarithmic';
  ticks?: LogarithmicTickOptions;
}
