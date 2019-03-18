import { ChartColor } from './chart-color';

export interface PointLabelOptions {
  callback?: (arg: any) => any;
  fontColor?: ChartColor;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: string;
}
