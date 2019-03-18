import { BaseChartMetaConfig } from './base-chart-meta-config';
import { MetaData } from './meta-data';

export interface Meta<T extends BaseChartMetaConfig> {
  type: T['datasetTypes']['type'];
  data: Array<MetaData<T>>;
  dataset?: T['datasetTypes'];
  controller: {
    [key: string]: any;
  };
  hidden?: boolean;
  total?: string;
  xAxisID?: string;
  yAxisID?: string;
  '$filler'?: {
    [key: string]: any;
  };
}
