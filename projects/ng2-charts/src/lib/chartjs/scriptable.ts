import { BaseChartMetaConfig } from './base-chart-meta-config';
import { OptionContext } from './option-context';

// [General/Options](https://www.chartjs.org/docs/latest/general/options.html)
export type Scriptable<T, T2 extends BaseChartMetaConfig> = T | ((context: OptionContext<T2>) => T);
