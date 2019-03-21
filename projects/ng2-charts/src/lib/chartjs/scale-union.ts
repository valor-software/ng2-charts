import { RadialLinearScale } from './radial-linear-scale';
import { LogarithmicScale } from './logarithmic-scale';
import { LinearScale } from './linear-scale';
import { CategoryScale } from './category-scale';
import { TimeOptions } from './time-options';
import { ChartMetaConfig } from './chart-meta-config';

export type ScaleUnion =
  | CategoryScale<ChartMetaConfig>
  | LinearScale<ChartMetaConfig>
  | LogarithmicScale<ChartMetaConfig>
  | TimeOptions<ChartMetaConfig>
  | RadialLinearScale<ChartMetaConfig>
  ;
