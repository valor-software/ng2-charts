import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createTestApp } from '../utils/testing';

['app', 'second-app'].forEach((projectName) => {
  describe(`ng-add-project-setup, 'project=${projectName}'`, () => {
    let runner: SchematicTestRunner;
    let log: string[] = [];

    beforeEach(() => {
      log = [];
      runner = new SchematicTestRunner(
        'schematics',
        require.resolve('../collection.json')
      );
      runner.logger.subscribe(({ message }) => log.push(message));
    });

    it(`should add ng2-charts module`, async () => {
      let tree = await createTestApp(runner);
      const appModulePath = `projects/${projectName}/src/app/app.module.ts`;
      let actualAppModulePath = tree.read(appModulePath)?.toString();

      expect(actualAppModulePath).not.toContain('NgChartsModule');

      tree = await runner.runSchematic(
        'ng-add-setup-project',
        projectName ? { project: projectName } : {},
        tree
      );
      actualAppModulePath = tree.read(appModulePath)?.toString();
      expect(actualAppModulePath).toContain('NgChartsModule');
    });
  });
});
