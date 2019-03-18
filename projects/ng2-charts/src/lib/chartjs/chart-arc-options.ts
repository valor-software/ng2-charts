import { ChartColor } from './chart-color';
import { AlignType } from './align-type';

// [Configuration/Elements/Arc Configuration]
export interface ChartArcOptions {
  backgroundColor?: ChartColor;
  borderAlign?: AlignType;
  borderColor?: ChartColor;
  borderWidth?: number;
}
