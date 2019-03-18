import { PositionType } from './position-type';
import { ChartColor } from './chart-color';

// [Configuration/Title](https://www.chartjs.org/docs/latest/configuration/title.html)
export interface ChartTitleOptions {
  display?: boolean;
  position?: PositionType;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: ChartColor;
  fontStyle?: string;
  padding?: number;
  lineHeight?: number | string;
  text?: string | string[];
  /**
   * Undocumented
   */
  fullWidth?: boolean;
  weight?: number;
}
