import { BaseChartMetaConfig } from './base-chart-meta-config';
import { EasingFunction } from './easing-function';
import { AngularChart } from './angular-chart';

// [Configuration/Animations/Animation Callbacks](https://www.chartjs.org/docs/latest/configuration/animations.html#animation-callbacks)
export interface ChartAnimationObject<T extends BaseChartMetaConfig> {
  chart?: AngularChart<T>;
  currentStep?: number;
  numSteps?: number;
  easing?: EasingFunction;
  render?: (arg: any) => void;
  onAnimationProgress?: (animation: ChartAnimationObject<T>) => void;
  onAnimationComplete?: (animation: ChartAnimationObject<T>) => void;
}
