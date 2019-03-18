import { Model } from './model';
import { AngularChart } from './angular-chart';
import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ChartScales } from './chart-scales';

export interface MetaData<T extends BaseChartMetaConfig> {
  _chart: AngularChart<T>;
  _datasetIndex: number;
  _index: number;
  _model: Model;
  _start?: any;
  _view: Model;
  _xScale: ChartScales<T>;
  _yScale: ChartScales<T>;
  hidden?: boolean;
}
