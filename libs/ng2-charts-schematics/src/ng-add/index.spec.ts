import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createTestApp } from '../utils/testing';
import * as messages from './messages';

describe(`ng add 'ng2-charts'`, () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner(
      'schematics',
      require.resolve('../collection.json')
    );
    appTree = await createTestApp(runner);
  });

  it(`should add missing dependencies to 'package.json'`, async () => {
    const tree = await runner.runSchematic('ng-add', {}, appTree);
    const content = tree.get('/package.json')?.content?.toString() as string;
    expect(content).toBeTruthy();
    const { dependencies } = JSON.parse(content);

    expect(dependencies['ng2-charts']).toBeTruthy();
    expect(dependencies['chart.js']).toBeTruthy();
  });

  it(`should report when specified 'project' is not found`, async () => {
    let message = '';
    try {
      await runner.runSchematic('ng-add', { project: 'test' }, appTree);
    } catch (e) {
      message = (e as Error).message;
    } finally {
      expect(message).toBe(messages.noProject('test'));
    }
  });
});
