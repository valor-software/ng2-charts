import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ScriptableIndexable } from './scriptable-indexable';
import { ChartColor } from './chart-color';
import { AlignType } from './align-type';
import { ChartDataSetsBase } from './chart-data-sets-base';

// [Charts/Doughnut & Pie](https://www.chartjs.org/docs/latest/charts/doughnut.html)
export interface ChartDataSetsDoughnut<T extends BaseChartMetaConfig> extends ChartDataSetsBase {
  type?: 'doughnut' | 'pie';
  backgroundColor?: ScriptableIndexable<ChartColor, T>;
  borderAlign?: ScriptableIndexable<AlignType, T>;
  borderColor?: ScriptableIndexable<ChartColor, T>;
  borderWidth?: ScriptableIndexable<number, T>;
  data: number[];
  hoverBackgroundColor?: ScriptableIndexable<ChartColor, T>;
  hoverBorderColor?: ScriptableIndexable<ChartColor, T>;
  hoverBorderWidth?: ScriptableIndexable<number, T>;
  weight?: number;
}
