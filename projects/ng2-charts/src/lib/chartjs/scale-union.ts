import { RadialLinearScale } from './radial-linear-scale';
import { LogarithmicScale } from './logarithmic-scale';
import { LinearScale } from './linear-scale';
import { CategoryScale } from './category-scale';
import { ChartMetaConfig } from './chart-meta-config';
import { TimeScale } from './time-scale';

export type ScaleUnion =
  | CategoryScale<ChartMetaConfig>
  | LinearScale<ChartMetaConfig>
  | LogarithmicScale<ChartMetaConfig>
  | TimeScale<ChartMetaConfig>
  | RadialLinearScale<ChartMetaConfig>
  ;
