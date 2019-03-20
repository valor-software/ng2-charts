import * as ng2Charts from 'ng2-charts';
import { AppChartMetaConfig } from './app-chart-meta-config';
export { AppChartMetaConfig } from './app-chart-meta-config';
export {
  ChartsModule,
  Color,
  Colors,
  defaultColors,
  ChartType,
  ChartDataSetsBase,
  ChartDataSetsUnion,
  BaseChartMetaConfig,
  ChartMetaConfig,
  LegacyMetaConfig,
  PromiscuousMetaConfig,
  LinearScale,
  LogarithmicScale,
  CategoryScale,
  CartesianScale,
  RadialScale,
  RadialLinearScale,
  ScaleUnion,
  ThemeService,
  BaseChartDirective,
  Label,
} from 'ng2-charts';

export type AngularChart = ng2Charts.AngularChart<AppChartMetaConfig>;
export type ChartOptions = ng2Charts.ChartOptions<AppChartMetaConfig> & AppChartMetaConfig['additionalOptions'];
export type ChartDataSetsBar = ng2Charts.ChartDataSetsBar<AppChartMetaConfig>;
export type ChartDataSetsLine = ng2Charts.ChartDataSetsLine<AppChartMetaConfig>;
export type ChartDataSetsDoughnut = ng2Charts.ChartDataSetsDoughnut<AppChartMetaConfig>;
export type ChartDataSetsRadar = ng2Charts.ChartDataSetsRadar<AppChartMetaConfig>;
export type ChartDataSetsBubble = ng2Charts.ChartDataSetsBubble<AppChartMetaConfig>;
export type ChartDataSetsScatter = ng2Charts.ChartDataSetsScatter<AppChartMetaConfig>;
export type MultiDataSet = ng2Charts.MultiDataSet<AppChartMetaConfig>;
export type SingleDataSet = ng2Charts.SingleDataSet<AppChartMetaConfig>;
