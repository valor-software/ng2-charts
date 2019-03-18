import { CartesianTickOptions } from './cartesian-tick-options';

// [Axes/Cartesian/Time/Ticks Source](https://www.chartjs.org/docs/latest/axes/cartesian/time.html#ticks-source)
export interface TimeTickOptions extends CartesianTickOptions {
  source?: 'auto' | 'data' | 'labels';
}
