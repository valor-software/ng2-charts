import { ChartColor } from './chart-color';

// [Axes/Radial/Linear/Angle Line Options](https://www.chartjs.org/docs/latest/axes/radial/linear.html#angle-line-options)
export interface AngleLineOptions {
  display?: boolean;
  color?: ChartColor;
  lineWidth?: number;
  borderDash?: number[];
  borderDashOffset?: number;
}
