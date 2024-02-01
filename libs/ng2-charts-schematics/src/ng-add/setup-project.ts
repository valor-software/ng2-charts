import { chain, Rule } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { addChartsProviderToMain } from './steps/add-ng2-charts-provider';

/**
 * Sets up a project with all required to run ng-bootstrap.
 * This is run after 'package.json' was patched and all dependencies installed
 */
export default function ngAddSetupProject(options: Schema): Rule {
  return chain([addChartsProviderToMain(options)]);
}
