import { SchematicsException } from '@angular-devkit/schematics';
import { ProjectDefinition } from "@angular-devkit/core/src/workspace";

/**
 * Resolves options for the build target of the given project
 */
export function getProjectTargetOptions(project: ProjectDefinition, buildTarget: string): any {
  const buildTargetObject = project.targets.get(buildTarget);
  if (buildTargetObject && buildTargetObject.options) {
    return buildTargetObject.options;
  }

  throw new SchematicsException(`Cannot determine project target configuration for: ${ buildTarget }.`);
}
