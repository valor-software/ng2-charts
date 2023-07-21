import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import {
  addModuleImportToModule,
  findModuleFromOptions,
} from '@angular/cdk/schematics';
import { Schema } from '../ng-generate/schema';

/**
 * Resolves options for the build target of the given project
 */
export function getProjectTargetOptions(
  project: ProjectDefinition,
  buildTarget: string
): any {
  const buildTargetObject = project.targets.get(buildTarget);
  if (buildTargetObject && buildTargetObject.options) {
    return buildTargetObject.options;
  }

  throw new SchematicsException(
    `Cannot determine project target configuration for: ${buildTarget}.`
  );
}

/**
 * Adds the required modules to the relative module.
 */
export function addChartsModulesToModule(options: Schema) {
  return async (host: Tree) => {
    const modulePath = (await findModuleFromOptions(host, options))!;
    addModuleImportToModule(host, modulePath, 'NgChartsModule', 'ng2-charts');
  };
}
