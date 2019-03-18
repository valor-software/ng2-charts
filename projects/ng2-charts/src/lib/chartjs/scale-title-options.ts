import { ChartColor } from './chart-color';
import { ChartTitlePaddingObject } from './chart-title-padding-object';

// [Axes/Labelling](https://www.chartjs.org/docs/latest/axes/labelling.html)
export interface ScaleTitleOptions {
  display?: boolean;
  labelString?: string;
  lineHeight?: number | string;
  fontColor?: ChartColor;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: string;
  padding: number | ChartTitlePaddingObject;
}
