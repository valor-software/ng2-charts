import { chain, noop, Rule } from '@angular-devkit/schematics';
import { buildComponent } from '@angular/cdk/schematics';
import { addChartsModulesToModule } from '../../utils/project';
import { Schema } from "../schema";

export default function (options: Schema): Rule {
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
