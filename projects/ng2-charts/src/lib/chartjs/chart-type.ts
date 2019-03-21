import { BaseChartMetaConfig } from './base-chart-meta-config';

export type ChartType<T extends BaseChartMetaConfig> = T['datasetTypes']['type'];
