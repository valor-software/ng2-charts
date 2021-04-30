import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createTestApp } from '../utils/testing';

[ 'app', 'second-app' ].forEach(projectName => {
  describe(`ng-add-project-setup, 'project=${ projectName }'`, () => {

    let runner: SchematicTestRunner;
    let log: string[] = [];

    beforeEach(() => {
      log = [];
      runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
      runner.logger.subscribe(({ message }) => log.push(message));
    });

    it(`should add ng2-charts module`, async () => {
      let tree = await createTestApp(runner);
      const appModulePath = `projects/${ projectName }/src/app/app.module.ts`;

      expect(tree.read(appModulePath) !.toString()).not.toContain('ChartsModule');

      tree = await runner.runSchematicAsync('ng-add-setup-project', projectName ? { project: projectName } : {}, tree)
        .toPromise();
      expect(tree.read(appModulePath) !.toString()).toContain('ChartsModule');
    });

  });
});
