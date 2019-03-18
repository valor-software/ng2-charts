import { ChartDataSetsUnion } from './chart-data-sets-union';
import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ScaleUnion } from './scale-union';

export class ChartMetaConfig extends BaseChartMetaConfig {
  datasetTypes: ChartDataSetsUnion;
  scaleTypes: ScaleUnion;
  pluginOptions: never;
  additionalOptions: never;
}
