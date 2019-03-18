import { CapStyleType } from './cap-style-type';
import { PointStyle } from './point-style';
import { JoinStyleType } from './join-style-type';

// [Configuration/Legend/Legend Item Interface](https://www.chartjs.org/docs/latest/configuration/legend.html#legend-item-interface)
export interface ChartLegendItem {
  text?: string;
  fillStyle?: string;
  hidden?: boolean;
  lineCap?: CapStyleType;
  lineDash?: number[];
  lineDashOffset?: number;
  lineJoin?: JoinStyleType;
  lineWidth?: number;
  strokeStyle?: string;
  pointStyle?: PointStyle;
}
