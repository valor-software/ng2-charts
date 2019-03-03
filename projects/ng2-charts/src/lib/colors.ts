import { Color } from './color';

// pie | doughnut
export interface Colors extends Color {
  data?: number[];
  label?: string;
}
