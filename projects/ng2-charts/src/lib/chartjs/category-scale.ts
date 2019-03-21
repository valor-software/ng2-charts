import { CategoryTickOptions } from './category-tick-options';
import { CartesianScale } from './cartesian-scale';
import { BaseChartMetaConfig } from './base-chart-meta-config';

// [Axes/Cartesian/Category](https://www.chartjs.org/docs/latest/axes/cartesian/category.html)
export interface CategoryScale<T extends BaseChartMetaConfig> extends CartesianScale<T> {
  type?: 'category' | string;
  ticks?: CategoryTickOptions;
}
