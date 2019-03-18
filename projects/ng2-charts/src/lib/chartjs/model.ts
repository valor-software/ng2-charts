export interface Model {
  backgroundColor: string;
  borderColor: string;
  borderWidth?: number;
  controlPointNextX: number;
  controlPointNextY: number;
  controlPointPreviousX: number;
  controlPointPreviousY: number;
  hitRadius: number;
  pointStyle: string;
  radius: string;
  skip?: boolean;
  steppedLine?: undefined;
  tension: number;
  x: number;
  y: number;
  base: number;
  head: number;
}
