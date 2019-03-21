import { CartesianScale } from './cartesian-scale';
import { LogarithmicTickOptions } from './logarithmic-tick-options';
import { BaseChartMetaConfig } from './base-chart-meta-config';

// [Axes/Cartesian/Logarithmic](https://www.chartjs.org/docs/latest/axes/cartesian/logarithmic.html)
export interface LogarithmicScale<T extends BaseChartMetaConfig> extends CartesianScale<T> {
  type?: 'logarithmic' | string;
  ticks?: LogarithmicTickOptions;
}
