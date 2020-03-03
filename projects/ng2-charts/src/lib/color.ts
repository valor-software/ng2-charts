// private helper functions
export interface Color {
  backgroundColor?: string | string[] | CanvasGradient;
  borderWidth?: number | number[];
  borderColor?: string | string[] | CanvasGradient;
  borderCapStyle?: string;
  borderDash?: number[];
  borderDashOffset?: number;
  borderJoinStyle?: string;

  pointBorderColor?: string | string[] | CanvasGradient;
  pointBackgroundColor?: string | string[] | CanvasGradient;
  pointBorderWidth?: number | number[];

  pointRadius?: number | number[];
  pointHoverRadius?: number | number[];
  pointHitRadius?: number | number[];

  pointHoverBackgroundColor?: string | string[] | CanvasGradient;
  pointHoverBorderColor?: string | string[] | CanvasGradient;
  pointHoverBorderWidth?: number | number[];
  pointStyle?: string | string[];

  hoverBackgroundColor?: string | string[] | CanvasGradient;
  hoverBorderColor?: string | string[] | CanvasGradient;
  hoverBorderWidth?: number;
}
