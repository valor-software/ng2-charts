import { BaseTickOptions } from './base-tick-options';

// [Axes/Cartesian/Tick Configuration](https://www.chartjs.org/docs/latest/axes/cartesian/#tick-configuration)
export interface CartesianTickOptions extends BaseTickOptions {
  autoSkip?: boolean;
  autoSkipPadding?: number;
  labelOffset?: number;
  maxRotation?: number;
  minRotation?: number;
  mirror?: boolean;
  padding?: number;
}
