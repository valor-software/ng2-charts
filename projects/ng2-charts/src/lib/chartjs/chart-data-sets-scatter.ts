import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ChartDataSetsLineScatterBase } from './chart-data-sets-line-scatter-base';
import { ChartPointScatter } from './chart-point-scatter';

// [Charts/Scatter](https://www.chartjs.org/docs/latest/charts/scatter.html)
export interface ChartDataSetsScatter<T extends BaseChartMetaConfig> extends ChartDataSetsLineScatterBase<T> {
  type?: 'scatter';
  data: ChartPointScatter[];
}
