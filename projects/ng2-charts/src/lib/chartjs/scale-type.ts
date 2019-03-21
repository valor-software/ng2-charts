import { BaseChartMetaConfig } from './base-chart-meta-config';

export type ScaleType<T extends BaseChartMetaConfig> = T['scaleTypes']['type'];
