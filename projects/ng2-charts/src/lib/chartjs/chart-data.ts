import { BaseChartMetaConfig } from './base-chart-meta-config';

export interface ChartData<T extends BaseChartMetaConfig> {
  labels?: Array<string | string[]>;
  xLabels?: string[];
  yLabels?: string[];
  datasets?: Array<T['datasetTypes']>;
}
