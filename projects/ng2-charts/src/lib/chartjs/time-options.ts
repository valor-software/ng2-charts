import { CartesianScale } from './cartesian-scale';
import { TimeUnit } from './time-unit';
import { TimeDisplayFormat } from './time-display-format';
import { BaseChartMetaConfig } from './base-chart-meta-config';

// [Axes/Cartesian/Time/Configuration Options](https://www.chartjs.org/docs/latest/axes/cartesian/time.html#configuration-options)
export interface TimeOptions<T extends BaseChartMetaConfig> extends CartesianScale<T> {
  type?: 'time' | string;
  displayFormats?: TimeDisplayFormat;
  isoWeekday?: boolean;
  max?: any; // todo: need a better type
  min?: any; // todo: need a better type
  parser?: string | ((arg: any) => any); // todo: need better types
  round?: TimeUnit;
  tooltipFormat?: string;
  unit?: TimeUnit;
  stepSize?: number;
  minUnit?: TimeUnit;
  /**
   * Undocumented
   */
  unitStepSize?: number;
}
