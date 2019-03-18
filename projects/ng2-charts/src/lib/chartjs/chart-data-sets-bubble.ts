import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ScriptableIndexable } from './scriptable-indexable';
import { ChartColor } from './chart-color';
import { PointStyle } from './point-style';
import { ChartPointBubble } from './chart-point-bubble';
import { ChartDataSetsBase } from './chart-data-sets-base';

// [Charts/Bubble](https://www.chartjs.org/docs/latest/charts/bubble.html)
export interface ChartDataSetsBubble<T extends BaseChartMetaConfig> extends ChartDataSetsBase {
  type?: 'bubble';
  backgroundColor?: ScriptableIndexable<ChartColor, T>;
  borderColor?: ScriptableIndexable<ChartColor, T>;
  borderWidth?: ScriptableIndexable<number, T>;
  data: ChartPointBubble[];
  hoverBackgroundColor?: ScriptableIndexable<ChartColor, T>;
  hoverBorderColor?: ScriptableIndexable<ChartColor, T>;
  hoverBorderWidth?: ScriptableIndexable<number, T>;
  hoverRadius?: ScriptableIndexable<number, T>;
  hitRadius?: ScriptableIndexable<number, T>;
  label?: string;
  pointStyle?: ScriptableIndexable<PointStyle, T>;
  rotation?: ScriptableIndexable<number, T>;
  radius?: ScriptableIndexable<number, T>;
}
