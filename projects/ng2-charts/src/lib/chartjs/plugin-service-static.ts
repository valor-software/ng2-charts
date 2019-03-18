import { PluginServiceRegistrationOptions } from './plugin-service-registration-options';
import { PluginServiceGlobalRegistration } from './plugin-service-global-registration';
import { BaseChartMetaConfig } from './base-chart-meta-config';

export declare class PluginServiceStatic<T extends BaseChartMetaConfig> {
  register(plugin: PluginServiceGlobalRegistration & PluginServiceRegistrationOptions<T>): void;
  unregister(plugin: PluginServiceGlobalRegistration & PluginServiceRegistrationOptions<T>): void;
}
