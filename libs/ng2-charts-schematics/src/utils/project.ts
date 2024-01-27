import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import {
  addModuleImportToModule,
  findModuleFromOptions, getProjectFromWorkspace, getProjectMainFile,
  isStandaloneApp
} from '@angular/cdk/schematics';
import { Schema } from '../ng-generate/schema';
import { TargetDefinition } from '@schematics/angular/utility';
import { getWorkspace } from '@schematics/angular/utility/workspace';

/**
 * Resolves options for the build target of the given project
 */
export function getProjectTargetOptions(
  project: ProjectDefinition,
  buildTarget: string
): TargetDefinition['options'] {
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
export function addChartsModulesToModule( options: Schema) {
  return async (host: Tree) => {

    // If the `--standalone` flag isn't passed and there isn't a default, infer based on the project.
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    if (isStandaloneApp(host, getProjectMainFile(project)))
      return;

    const modulePath = (await findModuleFromOptions(host, options))!;
    addModuleImportToModule(host, modulePath, 'NgChartsModule', 'ng2-charts');
  };
}
