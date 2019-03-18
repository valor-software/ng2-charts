import { CartesianScale } from './cartesian-scale';
import { LinearTickOptions } from './linear-tick-options';

// [Axes/Cartesian/Linear](https://www.chartjs.org/docs/latest/axes/cartesian/linear.html)
export interface LinearScale extends CartesianScale {
  type?: 'linear';
  ticks?: LinearTickOptions;
}
