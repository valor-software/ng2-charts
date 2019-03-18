import { CartesianTickOptions } from './cartesian-tick-options';

export interface LogarithmicTickOptions extends CartesianTickOptions {
  min?: number;
  max?: number;
}
