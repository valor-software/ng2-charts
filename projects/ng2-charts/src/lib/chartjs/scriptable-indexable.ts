import { BaseChartMetaConfig } from './base-chart-meta-config';
import { Scriptable } from './scriptable';
import { Indexable } from './indexable';
export type ScriptableIndexable<T, T2 extends BaseChartMetaConfig> = Indexable<T> | Scriptable<T, T2>;
