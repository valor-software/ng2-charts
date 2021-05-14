import { dirname, normalize, strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  mergeWith,
  move,
  Rule,
  SchematicsException,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { Schema } from './schema';
import { getAppModulePath, getProjectTargetOptions } from '@angular/cdk/schematics';

export function buildMetaConfig(options: Schema): Rule {

  return async (tree: Tree) => {

    const workspace = await getWorkspace(tree);
    const projectName = options.project || (workspace.extensions.defaultProject as string);
    const project = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(`Unable to find project '${ project }' in the workspace`);
    }
    const buildOptions = getProjectTargetOptions(project, 'build');

    const modulePath = getAppModulePath(tree, (buildOptions.main as string));

    const parsedPath = parseName(dirname(normalize(modulePath)), 'not applicable');
    // const metaname = parsedPath.name;
    // const metapath = parsedPath.path;

    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...strings,
        'if-flat': (s: string) => options.flat ? '' : s,
        ...options,
      }),
      move(parsedPath.path),
    ]);

    const recorder = tree.beginUpdate(modulePath);

    mergeWith(templateSource);

    tree.commitUpdate(recorder);
  };
}
