import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ChartDataSetsLineScatterBase } from './chart-data-sets-line-scatter-base';

// [Charts/Line](https://www.chartjs.org/docs/latest/charts/line.html)
// tslint:disable-next-line no-empty-interface
export interface ChartDataSetsLine<T extends BaseChartMetaConfig> extends ChartDataSetsLineScatterBase<T> {
  type?: 'line';
}
