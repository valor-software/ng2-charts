import { CartesianScale } from './cartesian-scale';
import { LinearTickOptions } from './linear-tick-options';
import { BaseChartMetaConfig } from './base-chart-meta-config';

// [Axes/Cartesian/Linear](https://www.chartjs.org/docs/latest/axes/cartesian/linear.html)
export interface LinearScale<T extends BaseChartMetaConfig> extends CartesianScale<T> {
  type?: 'linear' | string;
  ticks?: LinearTickOptions;
}
