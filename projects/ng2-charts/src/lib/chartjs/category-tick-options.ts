import { CartesianTickOptions } from './cartesian-tick-options';

export interface CategoryTickOptions extends CartesianTickOptions {
  labels?: string[];
  min?: string;
  max?: string;
}
