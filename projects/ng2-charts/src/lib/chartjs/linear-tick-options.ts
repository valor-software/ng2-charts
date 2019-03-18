import { CartesianTickOptions } from './cartesian-tick-options';

export interface LinearTickOptions extends CartesianTickOptions {
  beginAtZero?: boolean;
  min?: number;
  max?: number;
  maxTicksLimit?: number;
  precision?: number;
  stepSize?: number;
  suggestedMin?: number;
  suggestedMax?: number;
}
