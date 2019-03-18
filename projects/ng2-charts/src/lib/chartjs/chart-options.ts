import { AngularChart } from './angular-chart';
import { ChartScales } from './chart-scales';
import { ChartElementsOptions } from './chart-elements-options';
import { ChartTooltipOptions } from './chart-tooltip-options';
import { ChartTitleOptions } from './chart-title-options';
import { ChartLegendOptions } from './chart-legend-options';
import { ChartAnimationOptions } from './chart-animation-options';
import { ChartHoverOptions } from './chart-hover-options';
import { ChartLayoutOptions } from './chart-layout-options';
import { ChartSize } from './chart-size';
import { BaseChartMetaConfig } from './base-chart-meta-config';

export interface ChartOptions<T extends BaseChartMetaConfig> {
  // [General/Responsive](https://www.chartjs.org/docs/latest/general/responsive.html#configuration-options)
  responsive?: boolean;
  responsiveAnimationDuration?: number;
  maintainAspectRatio?: boolean;
  aspectRatio?: number;
  onResize?: (this: AngularChart<T>, newSize: ChartSize) => void;
  // [General/Pixel Ratio](https://www.chartjs.org/docs/latest/general/device-pixel-ratio.html#configuration-options)
  devicePixelRatio?: number;
  // [General/Interactions/Events](https://www.chartjs.org/docs/latest/general/interactions/events.html#events)
  events?: string[];
  onHover?: (this: AngularChart<T>, event: MouseEvent, activeElements: Array<{}>) => any; // todo: fix signature
  onClick?: (event?: MouseEvent, activeElements?: Array<{}>) => any; // todo: fix signature
  // [Configuration/Animations](https://www.chartjs.org/docs/latest/configuration/animations.html)
  animation?: ChartAnimationOptions<T>;
  // [Configuration/Layout](https://www.chartjs.org/docs/latest/configuration/layout.html)
  layout?: ChartLayoutOptions;
  // [Configuration/Legend](https://www.chartjs.org/docs/latest/configuration/legend.html)
  legend?: ChartLegendOptions<T>;
  // [Configuration/Legend/HTML Legends](https://www.chartjs.org/docs/latest/configuration/legend.html#html-legends)
  legendCallback?: (chart: AngularChart<T>) => string;
  // [Configuration/Title](https://www.chartjs.org/docs/latest/configuration/title.html)
  title?: ChartTitleOptions;
  // [Configuration/Tooltip](https://www.chartjs.org/docs/latest/configuration/tooltip.html)
  tooltips?: ChartTooltipOptions<T>;
  hover?: ChartHoverOptions;
  elements?: ChartElementsOptions;
  scales?: ChartScales<T>;
  showLines?: boolean;
  spanGaps?: boolean;
  cutoutPercentage?: number;
  circumference?: number;
  rotation?: number;
  plugins?: T['pluginOptions'];
}
