import { RadialLinearScale } from './radial-linear-scale';
import { LogarithmicScale } from './logarithmic-scale';
import { LinearScale } from './linear-scale';
import { CategoryScale } from './category-scale';
import { TimeOptions } from './time-options';

export type ScaleUnion = CategoryScale | LinearScale | LogarithmicScale | TimeOptions | RadialLinearScale;
