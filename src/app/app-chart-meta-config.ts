import * as ng2Charts from 'ng2-charts';

export interface AppChartMetaConfig extends ng2Charts.BaseChartMetaConfig {
  datasetTypes: ng2Charts.ChartMetaConfig['datasetTypes'];
  scaleTypes: ng2Charts.ChartMetaConfig['scaleTypes'];
  pluginOptions: {
    datalabels?: any;
  };
  additionalOptions: {
    annotation?: any;
  };
}
