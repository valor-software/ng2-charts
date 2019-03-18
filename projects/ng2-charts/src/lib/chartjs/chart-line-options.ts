import { ChartColor } from './chart-color';
import { FillType } from './fill-type';

// [Configuration/Elements/Line Configuration](https://www.chartjs.org/docs/latest/configuration/elements.html#line-configuration)
export interface ChartLineOptions {
  tension?: number;
  backgroundColor?: ChartColor;
  borderWidth?: number;
  borderColor?: ChartColor;
  borderCapStyle?: string;
  borderDash?: any[];
  borderDashOffset?: number;
  borderJoinStyle?: string;
  capBezierPoints?: boolean;
  fill?: FillType;
  stepped?: boolean;
  /**
   * Undocumented
   */
  cubicInterpolationMode?: 'default' | 'monotone';
}
