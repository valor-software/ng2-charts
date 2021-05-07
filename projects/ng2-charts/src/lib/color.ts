// private helper functions
export interface Color {
  backgroundColor?: string | string[];
  borderWidth?: number | number[];
  borderColor?: string | string[];
  borderCapStyle?: string;
  borderDash?: number[];
  borderDashOffset?: number;
  borderJoinStyle?: string;

  pointBorderColor?: string | string[];
  pointBackgroundColor?: string | string[];
  pointBorderWidth?: number | number[];

  pointRadius?: number | number[];
  pointHoverRadius?: number | number[];
  pointHitRadius?: number | number[];

  pointHoverBackgroundColor?: string | string[];
  pointHoverBorderColor?: string | string[];
  pointHoverBorderWidth?: number | number[];
  pointStyle?: string | string[];

  hoverBackgroundColor?: string | string[];
  hoverBorderColor?: string | string[];
  hoverBorderWidth?: number;
}
