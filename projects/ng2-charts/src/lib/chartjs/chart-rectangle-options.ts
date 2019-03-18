import { ChartColor } from './chart-color';

// [Configuration/Elements/Rectangle Configuration](https://www.chartjs.org/docs/latest/configuration/elements.html#rectangle-configuration)
export interface ChartRectangleOptions {
  backgroundColor?: ChartColor;
  borderWidth?: number;
  borderColor?: ChartColor;
  borderSkipped?: string;
}
