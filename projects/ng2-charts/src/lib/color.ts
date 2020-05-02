import { ChartColor } from 'chart.js';

// private helper functions
export interface Color {
  backgroundColor?: ChartColor;
  borderWidth?: number | number[];
  borderColor?: ChartColor;
  borderCapStyle?: string;
  borderDash?: number[];
  borderDashOffset?: number;
  borderJoinStyle?: string;
  pointBorderColor?: ChartColor;
  pointBackgroundColor?: ChartColor;
  pointBorderWidth?: number | number[];
  pointRadius?: number | number[];
  pointHoverRadius?: number | number[];
  pointHitRadius?: number | number[];
  pointHoverBackgroundColor?: ChartColor;
  pointHoverBorderColor?: ChartColor;
  pointHoverBorderWidth?: number | number[];
  pointStyle?: ChartColor;
  hoverBackgroundColor?: ChartColor;
  hoverBorderColor?: ChartColor;
  hoverBorderWidth?: number;
}
