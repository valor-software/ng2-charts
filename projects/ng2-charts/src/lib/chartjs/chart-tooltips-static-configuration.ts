import { ChartTooltipPositioner } from './chart-tooltip-positioner';

// [Configuration/Tooltip/Position Modes](https://www.chartjs.org/docs/latest/configuration/tooltip.html#position-modes)
export interface ChartTooltipsStaticConfiguration {
  positioners: {
    [mode: string]: ChartTooltipPositioner;
  };
}
