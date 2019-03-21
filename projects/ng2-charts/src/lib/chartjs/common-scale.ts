import { BaseTickOptions } from './base-tick-options';
import { GridLineOptions } from './grid-line-options';
import { ChartScaleCallbacks } from './chart-scale-callbacks';
import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ScaleType } from './scale-type';

export interface CommonScale<T extends BaseChartMetaConfig> extends ChartScaleCallbacks {
  id?: string;
  type?: ScaleType<T>;
  display?: boolean;
  weight?: number;
  // [Charts/Line/Stacked Area Chart](https://www.chartjs.org/docs/latest/charts/line.html#stacked-area-chart)
  // [Charts/Bar/Stacked Bar Chart](https://www.chartjs.org/docs/latest/charts/bar.html#stacked-bar-chart)
  stacked?: boolean;
  // [Charts/Bar/Scale Configuration](https://www.chartjs.org/docs/latest/charts/bar.html#scale-configuration)
  barPercentage?: number;
  categoryPercentage?: number;
  barThickness?: number | 'flex';
  maxBarThickness?: number;
  minBarLength?: number;
  ticks?: BaseTickOptions;
  gridLines?: GridLineOptions;
}
