import { ChartSize } from './chart-size';
import { BaseChartMetaConfig } from './base-chart-meta-config';
import { AngularChart } from './angular-chart';

export interface PluginServiceRegistrationOptions<T extends BaseChartMetaConfig> {
  beforeInit?: (chartInstance: AngularChart<T>, options?: any) => void;
  afterInit?: (chartInstance: AngularChart<T>, options?: any) => void;
  beforeUpdate?: (chartInstance: AngularChart<T>, options?: any) => void;
  afterUpdate?: (chartInstance: AngularChart<T>, options?: any) => void;
  beforeLayout?: (chartInstance: AngularChart<T>, options?: any) => void;
  afterLayout?: (chartInstance: AngularChart<T>, options?: any) => void;
  beforeDatasetsUpdate?: (chartInstance: AngularChart<T>, options?: any) => void;
  afterDatasetsUpdate?: (chartInstance: AngularChart<T>, options?: any) => void;
  beforeDatasetUpdate?: (chartInstance: AngularChart<T>, options?: any) => void;
  afterDatasetUpdate?: (chartInstance: AngularChart<T>, options?: any) => void;
  // tslint:disable-next-line:max-line-length
  // This is called at the start of a render. It is only called once, even if the animation will run for a number of frames. Use beforeDraw or afterDraw
  // to do something on each animation frame
  beforeRender?: (chartInstance: AngularChart<T>, options?: any) => void;
  afterRender?: (chartInstance: AngularChart<T>, options?: any) => void;
  // Easing is for animation
  beforeDraw?: (chartInstance: AngularChart<T>, easing: string, options?: any) => void;
  afterDraw?: (chartInstance: AngularChart<T>, easing: string, options?: any) => void;
  // Before the datasets are drawn but after scales are drawn
  beforeDatasetsDraw?: (chartInstance: AngularChart<T>, easing: string, options?: any) => void;
  afterDatasetsDraw?: (chartInstance: AngularChart<T>, easing: string, options?: any) => void;
  beforeDatasetDraw?: (chartInstance: AngularChart<T>, easing: string, options?: any) => void;
  afterDatasetDraw?: (chartInstance: AngularChart<T>, easing: string, options?: any) => void;
  // Called before drawing the `tooltip`. If any plugin returns `false`,
  // the tooltip drawing is cancelled until another `render` is triggered.
  beforeTooltipDraw?: (chartInstance: AngularChart<T>, tooltipData?: any, options?: any) => void;
  // Called after drawing the `tooltip`. Note that this hook will not,
  // be called if the tooltip drawing has been previously cancelled.
  afterTooltipDraw?: (chartInstance: AngularChart<T>, tooltipData?: any, options?: any) => void;
  // Called when an event occurs on the chart
  beforeEvent?: (chartInstance: AngularChart<T>, event: Event, options?: any) => void;
  afterEvent?: (chartInstance: AngularChart<T>, event: Event, options?: any) => void;
  resize?: (chartInstance: AngularChart<T>, newChartSize: ChartSize, options?: any) => void;
  destroy?: (chartInstance: AngularChart<T>) => void;
  /** @deprecated since version 2.5.0. Use `afterLayout` instead. */
  afterScaleUpdate?: (chartInstance: AngularChart<T>, options?: any) => void;
}
