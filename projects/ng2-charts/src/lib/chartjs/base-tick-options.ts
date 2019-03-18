import { ChartColor } from './chart-color';
import { MajorTickOptions } from './major-tick-options';
import { MinorTickOptions } from './minor-tick-options';

// [Axes/Styling/Tick Configuration](https://www.chartjs.org/docs/latest/axes/styling.html#tick-configuration)
export interface BaseTickOptions {
  callback?: (value: any, index: any, values: any) => string | number;
  display?: boolean;
  fontColor?: ChartColor;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: string;
  lineHeight?: number | string;
  reverse?: boolean;
  minor?: MinorTickOptions;
  major?: MajorTickOptions;
}
