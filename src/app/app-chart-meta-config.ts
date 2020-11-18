import { DateTime } from 'luxon';
import * as ng2Charts from 'ng2-charts';

// Edit this file, for any extensions to chart.js.

export interface FinancialDataPoint {
  t: DateTime;
  o: number;
  h: number;
  l: number;
  c: number;
}

export interface FinancialDataSet extends ng2Charts.ChartDataSetsBase {
  type?: 'candlestick' | 'ohlc';
  label: string;
  data: FinancialDataPoint[];
  barThickness: number;
}

export interface FinancialLinearScale extends ng2Charts.LinearScale<ng2Charts.ChartMetaConfig> {
  type?: 'financialLinear';
}

export interface AppChartMetaConfig extends ng2Charts.BaseChartMetaConfig {
  datasetTypes: ng2Charts.ChartMetaConfig['datasetTypes'] | FinancialDataSet;
  scaleTypes: ng2Charts.ChartMetaConfig['scaleTypes'] | FinancialLinearScale;
  pluginOptions: {
    datalabels?: any;
  };
  additionalOptions: {
    annotation?: any;
  };
}
