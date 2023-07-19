import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

import { Schema } from '../schema';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import * as messages from '../messages';
import {
  getProjectFromWorkspace,
  getProjectMainFile,
} from '@angular/cdk/schematics';

const MODULE_NAME = 'NgChartsModule';
const PACKAGE_NAME = 'ng2-charts';

/**
 * Patches main application module by adding 'NgbModule' import
 */
export function addChartsModuleToAppModule(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const projectName =
      options.project || (workspace.extensions['defaultProject'] as string);
    const project = getProjectFromWorkspace(workspace, options.project);

    if (!project) {
      throw new SchematicsException(messages.noProject(projectName));
    }

    const modulePath = getAppModulePath(host, getProjectMainFile(project));

    const text = host.read(modulePath);
    if (text === null) {
      throw new SchematicsException(`File '${modulePath}' does not exist.`);
    }

    const source = ts.createSourceFile(
      modulePath,
      text.toString('utf-8'),
      ts.ScriptTarget.Latest,
      true
    );

    const changes = addImportToModule(
      source,
      modulePath,
      MODULE_NAME,
      PACKAGE_NAME
    );

    const recorder = host.beginUpdate(modulePath);
    for (const change of changes) {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(recorder);
  };
}
