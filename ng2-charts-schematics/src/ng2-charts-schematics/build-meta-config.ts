import { strings } from '@angular-devkit/core';
import {
  SchematicContext,
  Tree,
  SchematicsException,
  url,
  apply,
  applyTemplates,
  Rule,
  move,
  mergeWith,
} from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { buildDefaultPath, getProject } from '@schematics/angular/utility/project';
import { dirname, normalize } from '@angular-devkit/core';

export function buildMetaConfig(_options: any): Rule {

  return (tree: Tree, _context: SchematicContext) => {
    if (!_options.project) {
      throw new SchematicsException('Option (project) is required.');
    }
    const project = getProject(tree, _options.project);

    if (_options.path === undefined) {
      _options.path = buildDefaultPath(project);
    }

    _options.module = findModuleFromOptions(tree, _options);

    const parsedPath = parseName(dirname(normalize(_options.module)), 'not applicable');
    _options.metaname = parsedPath.name;
    _options.metapath = parsedPath.path;

    const metaConfigExists = tree.exists('/src/app/app-chart-config.ts');

    if (metaConfigExists) {
      return tree;
    }

    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...strings,
        'if-flat': (s: string) => _options.flat ? '' : s,
        ..._options,
      }),
      move(parsedPath.path),
    ]);

    return mergeWith(templateSource);
    // return undefined;
  };
}
