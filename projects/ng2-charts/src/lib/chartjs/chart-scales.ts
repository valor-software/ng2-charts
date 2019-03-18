import { BaseChartMetaConfig } from './base-chart-meta-config';
import { PositionType } from './position-type';
import { BaseTickOptions } from './base-tick-options';
import { GridLineOptions } from './grid-line-options';
import { ScaleTitleOptions } from './scale-title-options';
import { ScaleType } from './scale-type';

// [Axes](https://www.chartjs.org/docs/latest/axes/)
export interface ChartScales<T extends BaseChartMetaConfig> {
  gridLines?: GridLineOptions;
  scaleLabel?: ScaleTitleOptions;
  ticks?: BaseTickOptions;
  xAxes?: Array<T['scaleTypes']>;
  yAxes?: Array<T['scaleTypes']>;
  /**
   * Undocumented
   */
  position?: PositionType | string;
  display?: boolean;
  offset?: boolean;
  /**
   * @deprecated Not found in js
   */
  type?: ScaleType | string;
}
