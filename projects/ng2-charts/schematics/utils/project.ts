import { workspaces } from '@angular-devkit/core';
import { SchematicsException } from '@angular-devkit/schematics';

/**
 * Resolves options for the build target of the given project
 */
export function getProjectTargetOptions(project: workspaces.ProjectDefinition, buildTarget: string) {
  const buildTargetObject = project.targets.get(buildTarget);
  if (buildTargetObject && buildTargetObject.options) {
    return buildTargetObject.options;
  }

  throw new SchematicsException(`Cannot determine project target configuration for: ${ buildTarget }.`);
}
