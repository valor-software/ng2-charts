import { InteractionMode } from './interaction-mode';

// [General/Interactions](https://www.chartjs.org/docs/latest/general/interactions/)
export interface ChartHoverOptions {
  mode?: InteractionMode;
  intersect?: boolean;
  axis?: 'x' | 'y' | 'xy';
  animationDuration?: number;
}
