import { InjectionToken } from '@angular/core';
import { ChartComponentLike, registerables } from 'chart.js';
import { merge } from 'lodash-es';
import { builtInDefaults } from './get-colors';
import { AnyObject } from 'chart.js/dist/types/basic';

export const NG_CHARTS_CONFIGURATION =
  new InjectionToken<NgChartsConfiguration>('Configuration for ngCharts');

export type NgChartsConfiguration = {
  /**
   * Any registerable that can be used with `Chart.register()`, such as plugins, controllers, scales, and elements.
   */
  registerables?: readonly ChartComponentLike[];

  /**
   * Default configuration that can be used with `defaults.set()`.
   */
  defaults?: AnyObject;
};

/**
 * Provide all the default registerable as defined by Chart.js
 */
export function withDefaultRegisterables(): NgChartsConfiguration {
  return { registerables: registerables };
}

/**
 * Provide predefined default colors (which are exported as `baseColors`), and then, if there are more
 * datasets than colors, colors are generated randomly.
 */
export function withColorGenerator(): NgChartsConfiguration {
  return { defaults: builtInDefaults };
}

/**
 * Provide configuration for ngCharts. In most cases, you have to pass it some registerables. So either
 * `withDefaultRegisterables()`, or a custom list of registerables tailored to your needs to reduce bundle size.
 */
export function provideCharts(
  ...configurations: readonly NgChartsConfiguration[]
) {
  const config: NgChartsConfiguration = merge({}, ...configurations);
  return { provide: NG_CHARTS_CONFIGURATION, useValue: config };
}
