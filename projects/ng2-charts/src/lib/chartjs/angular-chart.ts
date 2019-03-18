import { PluginServiceStatic } from './plugin-service-static';
import { ChartConfiguration } from './chart-configuration';
import { ChartData } from './chart-data';
import { ChartOptions } from './chart-options';
import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ChartMetaConfig } from './chart-meta-config';
import { Meta } from './meta';
import { ChartFontOptions } from './chart-font-options';
import { ChartTooltipsStaticConfiguration } from './chart-tooltips-static-configuration';
import { ChartArea } from './chart-area';

require('chart.js');

declare class Chart {
  // tslint:disable-next-line:variable-name
  static readonly Chart: typeof Chart;
  constructor(context, options);
}

// @dynamic
export class AngularChart<T extends BaseChartMetaConfig> extends Chart {
  static pluginService: PluginServiceStatic<ChartMetaConfig>;
  static plugins: PluginServiceStatic<ChartMetaConfig>;
  static defaults: {
    global: ChartOptions<ChartMetaConfig> & ChartFontOptions;
    [key: string]: any;
  };
  static controllers: {
    [key: string]: any;
  };
  static helpers: {
    [key: string]: any;
  };
  /**
   * Tooltip Static Options
   */
  // tslint:disable-next-line:variable-name
  static Tooltip: ChartTooltipsStaticConfiguration;
  constructor(
    context: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
    options: ChartConfiguration<T>) {
    super(context, options as any);
  }
  config: ChartConfiguration<T>;
  data: ChartData<T>;
  destroy: () => {};
  update: (duration?: any, lazy?: any) => {};
  render: (duration?: any, lazy?: any) => {};
  stop: () => {};
  resize: () => {};
  clear: () => {};
  toBase64Image: () => string;
  generateLegend: () => {};
  getElementAtEvent: (e: any) => [{}];
  getElementsAtEvent: (e: any) => Array<{}>;
  getDatasetAtEvent: (e: any) => Array<{}>;
  getDatasetMeta: (index: number) => Meta<T>;
  ctx: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement | null;
  chartArea: ChartArea;
}
