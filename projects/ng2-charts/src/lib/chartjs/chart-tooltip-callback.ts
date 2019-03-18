import { ChartData } from './chart-data';
import { BaseChartMetaConfig } from './base-chart-meta-config';
import { AngularChart } from './angular-chart';
import { ChartTooltipItem } from './chart-tooltip-item';
import { ChartTooltipLabelColor } from './chart-tooltip-label-color';

// [Configurations/Tooltip/Tooltip Callbacks]
export interface ChartTooltipCallback<T extends BaseChartMetaConfig> {
  beforeTitle?: (item: ChartTooltipItem[], data: ChartData<T>) => string | string[];
  title?: (item: ChartTooltipItem[], data: ChartData<T>) => string | string[];
  afterTitle?: (item: ChartTooltipItem[], data: ChartData<T>) => string | string[];
  beforeBody?: (item: ChartTooltipItem[], data: ChartData<T>) => string | string[];
  beforeLabel?: (tooltipItem: ChartTooltipItem, data: ChartData<T>) => string | string[];
  label?: (tooltipItem: ChartTooltipItem, data: ChartData<T>) => string | string[];
  labelColor?: (tooltipItem: ChartTooltipItem, chart: AngularChart<T>) => ChartTooltipLabelColor;
  labelTextColor?: (tooltipItem: ChartTooltipItem, chart: AngularChart<T>) => string;
  afterLabel?: (tooltipItem: ChartTooltipItem, data: ChartData<T>) => string | string[];
  afterBody?: (item: ChartTooltipItem[], data: ChartData<T>) => string | string[];
  beforeFooter?: (item: ChartTooltipItem[], data: ChartData<T>) => string | string[];
  footer?: (item: ChartTooltipItem[], data: ChartData<T>) => string | string[];
  afterFooter?: (item: ChartTooltipItem[], data: ChartData<T>) => string | string[];
}
