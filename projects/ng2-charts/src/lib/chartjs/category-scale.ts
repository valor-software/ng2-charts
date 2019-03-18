import { CategoryTickOptions } from './category-tick-options';
import { CartesianScale } from './cartesian-scale';

// [Axes/Cartesian/Category](https://www.chartjs.org/docs/latest/axes/cartesian/category.html)
export interface CategoryScale extends CartesianScale {
  type?: 'category';
  ticks?: CategoryTickOptions;
}
