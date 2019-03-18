import { ChartColor } from './chart-color';
import { PointStyle } from './point-style';
// [Configuration/Elements/Point Configuration](https://www.chartjs.org/docs/latest/configuration/elements.html#point-configuration)
export interface ChartPointOptions {
  radius?: number;
  pointStyle?: PointStyle;
  rotation?: number;
  backgroundColor?: ChartColor;
  borderWidth?: number;
  borderColor?: ChartColor;
  hitRadius?: number;
  hoverRadius?: number;
  hoverBorderWidth?: number;
}
