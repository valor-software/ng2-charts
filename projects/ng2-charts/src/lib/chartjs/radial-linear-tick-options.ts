import { ChartColor } from './chart-color';
import { RadialTickOptions } from './radial-tick-options';

// [Axes/Radial/Linear/Tick Options](https://www.chartjs.org/docs/latest/axes/radial/linear.html#tick-options)
export interface RadialLinearTickOptions extends RadialTickOptions {
  backdropColor?: ChartColor;
  backdropPaddingX?: number;
  backdropPaddingY?: number;
  beginAtZero?: boolean;
  min?: number;
  max?: number;
  maxTicksLimit?: number;
  precision?: number;
  stepSize?: number;
  suggestedMin?: number;
  suggestedMax?: number;
  showLabelBackdrop?: boolean;
}
