import { BaseChartMetaConfig } from './base-chart-meta-config';
import { AngularChart } from './angular-chart';

export interface OptionContext<T extends BaseChartMetaConfig> {
  chart?: AngularChart<T>;
  dataIndex?: number;
  dataset?: T['datasetTypes'];
  datasetIndex?: number;
}
