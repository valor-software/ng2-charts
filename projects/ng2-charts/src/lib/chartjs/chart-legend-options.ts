import { BaseChartMetaConfig } from './base-chart-meta-config';
import { ChartLegendLabelItem } from './chart-legend-label-item';
import { ChartLegendLabelOptions } from './chart-legend-label-options';
import { PositionType } from './position-type';

// [Configuration/Legend](https://www.chartjs.org/docs/latest/configuration/legend.html)
export interface ChartLegendOptions<T extends BaseChartMetaConfig> {
  display?: boolean;
  position?: PositionType;
  fullWidth?: boolean;
  onClick?: (event: MouseEvent, legendItem: ChartLegendLabelItem) => void;
  onHover?: (event: MouseEvent, legendItem: ChartLegendLabelItem) => void;
  onLeave?: (event: MouseEvent, legendItem: ChartLegendLabelItem) => void;
  reverse?: boolean;
  labels?: ChartLegendLabelOptions<T>;
}
