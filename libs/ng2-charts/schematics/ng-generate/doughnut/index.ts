import { chain, noop, Rule } from '@angular-devkit/schematics';
import { buildComponent } from '@angular/cdk/schematics';
import { addChartsModulesToModule } from '../../utils/project';

export default function (options: any): Rule {
  return chain([
    buildComponent(
      { ...options },
      {
        template:
          './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html.template',
        stylesheet:
          './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__style__.template',
      }
    ),
    options.skipImport ? noop() : addChartsModulesToModule(options),
  ]);
}
