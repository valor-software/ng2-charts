import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { Schema } from './schema';
import * as messages from './messages';
import { addPackageToPackageJson } from '../utils/package-config';

const NG2_CHARTS_VERSION = '5.0.0';
const CHARTJS_VERSION = '4.3.0';

/**
 * This is executed when `ng add @ng-bootstrap/ng-bootstrap` is run.
 * It installs all dependencies in the 'package.json' and runs 'ng-add-setup-project' schematic.
 */
export default function ngAdd(options: Schema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    // Checking that project exists
    const { project } = options;
    if (project) {
      const workspace = await getWorkspace(tree);
      const projectWorkspace = workspace.projects.get(project);

      if (!projectWorkspace) {
        throw new SchematicsException(messages.noProject(project));
      }
    }

    addPackageToPackageJson(tree, 'ng2-charts', `^${NG2_CHARTS_VERSION}`);
    addPackageToPackageJson(tree, 'chart.js', `^${CHARTJS_VERSION}`);

    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [
      context.addTask(new NodePackageInstallTask()),
    ]);
  };
}
