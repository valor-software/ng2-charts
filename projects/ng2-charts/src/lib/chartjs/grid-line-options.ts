import { ChartColor } from './chart-color';

// [Axes/Styling](https://www.chartjs.org/docs/latest/axes/styling.html#grid-line-configuration)
export interface GridLineOptions {
  display?: boolean;
  circular?: boolean;
  color?: ChartColor;
  borderDash?: number[];
  borderDashOffset?: number;
  lineWidth?: number | number[];
  drawBorder?: boolean;
  drawOnChartArea?: boolean;
  drawTicks?: boolean;
  tickMarkLength?: number;
  zeroLineWidth?: number;
  zeroLineColor?: ChartColor;
  zeroLineBorderDash?: number[];
  zeroLineBorderDashOffset?: number;
  offsetGridLines?: boolean;
}
