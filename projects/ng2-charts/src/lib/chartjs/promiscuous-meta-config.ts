import { BaseChartMetaConfig } from './base-chart-meta-config';

export interface PromiscuousMetaConfig extends BaseChartMetaConfig {
  datasetTypes: {
    [key: string]: any;
  };
  pluginOptions: {};
  scaleTypes: {};
  additionalOptions: { [key: string]: any };
}
