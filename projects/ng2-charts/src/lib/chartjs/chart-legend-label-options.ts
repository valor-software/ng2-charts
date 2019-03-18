import { ChartData } from './chart-data';
import { BaseChartMetaConfig } from './base-chart-meta-config';
import { AngularChart } from './angular-chart';
import { ChartLegendLabelItem } from './chart-legend-label-item';
import { ChartColor } from './chart-color';

// tslint:disable-next-line:max-line-length
// [Configuration/Legend/Legend Label Configuration](https://www.chartjs.org/docs/latest/configuration/legend.html#legend-label-configuration)
export interface ChartLegendLabelOptions<T extends BaseChartMetaConfig> {
  boxWidth?: number;
  fontSize?: number;
  fontStyle?: string;
  fontColor?: ChartColor;
  fontFamily?: string;
  padding?: number;
  generateLabels?: (chart: AngularChart<T>) => ChartLegendLabelItem[];
  filter?: (legendItem: ChartLegendLabelItem, data: ChartData<T>) => boolean;
  usePointStyle?: boolean;
}
