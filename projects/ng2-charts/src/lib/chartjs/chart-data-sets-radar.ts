import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ScriptableIndexable } from './scriptable-indexable';
import { ChartColor } from './chart-color';
import { JoinStyleType } from './join-style-type';
import { PointStyle } from './point-style';
import { ChartDataSetsBase } from './chart-data-sets-base';
import { ChartPointImageType } from './chart-point-image-type';
import { FillType } from './fill-type';
import { CapStyleType } from './cap-style-type';

// [Charts/Radar](https://www.chartjs.org/docs/latest/charts/radar.html)
export interface ChartDataSetsRadar<T extends BaseChartMetaConfig> extends ChartDataSetsBase {
  type?: 'radar';
  backgroundColor?: ChartColor;
  borderCapStyle?: CapStyleType;
  borderColor?: ChartColor;
  borderDash?: number[];
  borderDashOffset?: number;
  borderJoinStyle?: JoinStyleType;
  borderWidth?: number;
  fill?: FillType;
  label?: string;
  lineTension?: number;
  pointBackgroundColor?: ScriptableIndexable<ChartColor, T>;
  pointBorderColor?: ScriptableIndexable<ChartColor, T>;
  pointBorderWidth?: ScriptableIndexable<number, T>;
  pointHitRadius?: ScriptableIndexable<number, T>;
  pointHoverBackgroundColor?: ScriptableIndexable<ChartColor, T>;
  pointHoverBorderColor?: ScriptableIndexable<ChartColor, T>;
  pointHoverBorderWidth?: ScriptableIndexable<number, T>;
  pointHoverRadius?: ScriptableIndexable<number, T>;
  pointRadius?: ScriptableIndexable<number, T>;
  pointRotation?: ScriptableIndexable<number, T>;
  pointStyle?: ScriptableIndexable<PointStyle | ChartPointImageType, T>;
  data: number[];
}
