import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ChartAnimationObject } from './chart-animation-object';
import { EasingFunction } from './easing-function';

// [Configuration/Animations](https://www.chartjs.org/docs/latest/configuration/animations.html)
export interface ChartAnimationOptions<T extends BaseChartMetaConfig> {
  duration?: number;
  easing?: EasingFunction;
  onProgress?: (animation: ChartAnimationObject<T>) => void;
  onComplete?: (animation: ChartAnimationObject<T>) => void;
  /**
   * Undocumented (used in doughnut, pie and polar area chart types)
   */
  animateRotate?: boolean;
  animateScale?: boolean;
}
