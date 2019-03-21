import { PluginServiceRegistrationOptions } from './plugin-service-registration-options';
import { ChartOptions } from './chart-options';
import { ChartData } from './chart-data';
import { ChartType } from './chart-type';
import { BaseChartMetaConfig } from './base-chart-meta-config';

export interface ChartConfiguration<T extends BaseChartMetaConfig> {
  type?: ChartType<T>;
  data?: ChartData<T>;
  options?: ChartOptions<T>;
  plugins?: Array<PluginServiceRegistrationOptions<T>>;
}
