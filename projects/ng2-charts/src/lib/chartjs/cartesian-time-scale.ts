import { CartesianScale } from './cartesian-scale';
import { TimeTickOptions } from './time-tick-options';
import { TimeOptions } from './time-options';

// [Axes/Cartesian/Time](https://www.chartjs.org/docs/latest/axes/cartesian/time.html)
export interface CartesianTimeScale extends CartesianScale {
  adapters?: any; // todo: find a better type;
  distribution?: 'linear' | 'series';
  bounds?: 'data' | 'ticks';
  time?: TimeOptions;
  ticks?: TimeTickOptions;
}
