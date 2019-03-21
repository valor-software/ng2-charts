import { CartesianScale } from './cartesian-scale';
import { TimeTickOptions } from './time-tick-options';
import { TimeOptions } from './time-options';
import { BaseChartMetaConfig } from './base-chart-meta-config';

// [Axes/Cartesian/Time](https://www.chartjs.org/docs/latest/axes/cartesian/time.html)
export interface TimeScale<T extends BaseChartMetaConfig> extends CartesianScale<T> {
  type?: 'time' | string;
  adapters?: any; // todo: find a better type;
  distribution?: 'linear' | 'series';
  bounds?: 'data' | 'ticks';
  time?: TimeOptions;
  ticks?: TimeTickOptions;
}
