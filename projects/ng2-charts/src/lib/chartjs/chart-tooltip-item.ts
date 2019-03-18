// [Configuration/Tooltip/Tooltip Item Interface](https://www.chartjs.org/docs/latest/configuration/tooltip.html#tooltip-item-interface)
export interface ChartTooltipItem {
  label?: string;
  value?: string;
  xLabel?: string;
  yLabel?: string;
  datasetIndex?: number;
  index?: number;
  x?: number;
  y?: number;
}
