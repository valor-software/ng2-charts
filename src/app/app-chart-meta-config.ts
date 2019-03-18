import { ChartMetaConfig, BaseChartMetaConfig } from 'chart.js';

export interface AppChartMetaConfig extends BaseChartMetaConfig {
  datasetTypes: ChartMetaConfig['datasetTypes'];
  pluginOptions: {
    datalabels: any;
  };
}
