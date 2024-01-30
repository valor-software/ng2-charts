import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { Schema } from '../schema';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import * as messages from '../messages';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { addRootProvider } from '@schematics/angular/utility';

const PACKAGE_NAME = 'ng2-charts';

/**
 * Patches `app.config.ts` by adding our provider
 */
export function addChartsProviderToMain(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const projectName =
      options.project || (workspace.extensions['defaultProject'] as string);
    const project = getProjectFromWorkspace(workspace, options.project);

    if (!project) {
      throw new SchematicsException(messages.noProject(projectName));
    }

    return addRootProvider(projectName, ({ code, external }) => {
      return code`${external('provideCharts', PACKAGE_NAME)}(${external('withDefaultRegisterables', PACKAGE_NAME)}())`;
    });
  };
}
