import {Tree} from '@angular-devkit/schematics';
import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import {getFileContent} from '@schematics/angular/utility/test';

import {createTestApp} from '../utils/testing';
import * as messages from './messages';


describe(`ng add 'ng2-charts'`, () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
    appTree = await createTestApp(runner);
  });

  it(`should add missing dependencies to 'package.json'`, async () => {
    const tree = await runner.runSchematicAsync('ng-add', {}, appTree).toPromise();
    const {dependencies} = JSON.parse(getFileContent(tree, '/package.json'));

    expect(dependencies['ng2-charts']).toBeDefined('ng2-charts should be installed');
    expect(dependencies['chart.js']).toBeDefined('chart.js should be installed');
  });

  it(`should report when specified 'project' is not found`, async () => {
    let message = '';
    try {
      await runner.runSchematicAsync('ng-add', {project: 'test'}, appTree).toPromise();
    } catch (e: any) {
      message = e.message;
    } finally {
      expect(message).toBe(messages.noProject('test'));
    }
  });
});
