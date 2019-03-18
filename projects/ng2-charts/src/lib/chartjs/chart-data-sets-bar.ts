import { BaseChartMetaConfig } from './base-chart-meta-config';
import { Indexable } from './indexable';
import { ScriptableIndexable } from './scriptable-indexable';
import { PositionType } from './position-type';
import { ChartColor } from './chart-color';
import { ChartDataSetsBase } from './chart-data-sets-base';
import { ChartPointBarTimeX } from './chart-point-bar-time-x';
import { ChartPointBarTimeT } from './chart-point-bar-time-t';
import { ChartPointBarNumeric } from './chart-point-bar-numeric';
import { ChartBorderWidth } from './chart-border-width';
import { Optional } from './optional';

// [Charts/Bar](https://www.chartjs.org/docs/latest/charts/bar.html)
export interface ChartDataSetsBar<T extends BaseChartMetaConfig> extends ChartDataSetsBase {
  type?: 'bar';
  backgroundColor?: ScriptableIndexable<ChartColor, T>;
  borderColor?: ScriptableIndexable<ChartColor, T>;
  borderSkipped?: ScriptableIndexable<PositionType | boolean, T>;
  borderWidth?: ScriptableIndexable<number | ChartBorderWidth, T>;
  data: Array<Optional<number>> | ChartPointBarNumeric[] | ChartPointBarTimeT[] | ChartPointBarTimeX[];
  hoverBackgroundColor?: Indexable<ChartColor>;
  hoverBorderColor?: Indexable<ChartColor>;
  hoverBorderWidth?: Indexable<number>;
  label?: string;
  xAxisID?: string;
  yAxisID?: string;
  stack?: string;
}
