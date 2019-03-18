import { ChartMetaConfig } from './chart-meta-config';
import { ChartDataSetsLine } from './chart-data-sets-line';
import { ChartDataSetsBar } from './chart-data-sets-bar';
import { ChartDataSetsRadar } from './chart-data-sets-radar';
import { ChartDataSetsDoughnut } from './chart-data-sets-doughnut';
import { ChartDataSetsPolarArea } from './chart-data-sets-polar-area';
import { ChartDataSetsBubble } from './chart-data-sets-bubble';
import { ChartDataSetsScatter } from './chart-data-sets-scatter';

export type ChartDataSetsUnion =
  | ChartDataSetsLine<ChartMetaConfig>
  | ChartDataSetsBar<ChartMetaConfig>
  | ChartDataSetsRadar<ChartMetaConfig>
  | ChartDataSetsDoughnut<ChartMetaConfig>
  | ChartDataSetsPolarArea<ChartMetaConfig>
  | ChartDataSetsBubble<ChartMetaConfig>
  | ChartDataSetsScatter<ChartMetaConfig>;
