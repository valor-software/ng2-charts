import { ChartColor } from './chart-color';

export interface MinorTickOptions {
  callback?: (value: any, index: any, values: any) => string | number;
  fontColor?: ChartColor;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: string;
  lineHeight?: number | string;
}
