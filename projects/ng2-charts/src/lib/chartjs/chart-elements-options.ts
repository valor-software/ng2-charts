import { ChartArcOptions } from './chart-arc-options';
import { ChartRectangleOptions } from './chart-rectangle-options';
import { ChartLineOptions } from './chart-line-options';
import { ChartPointOptions } from './chart-point-options';

// [Configuration/Elements](https://www.chartjs.org/docs/latest/configuration/elements.html)
export interface ChartElementsOptions {
  point?: ChartPointOptions;
  line?: ChartLineOptions;
  arc?: ChartArcOptions;
  rectangle?: ChartRectangleOptions;
}
