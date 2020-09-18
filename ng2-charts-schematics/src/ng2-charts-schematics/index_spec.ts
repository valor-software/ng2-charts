import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

let runner: SchematicTestRunner;
let appTree: Tree;

function createWorkspace(runner: SchematicTestRunner): Promise<UnitTestTree> {
  return runner
    .runExternalSchematicAsync('@schematics/angular', 'workspace', {
      name: 'workspace',
      version: '10.0.0',
      newProjectRoot: 'projects'
    })
    .toPromise();
}

/**
 * Creates a sample workspace with two applications: 'app' (default) and 'second-app'
 */
export async function createTestApp(runner: SchematicTestRunner, appOptions = {}): Promise<UnitTestTree> {
  let tree = await createWorkspace(runner);

  return runner
    .runExternalSchematicAsync('@schematics/angular', 'application', { name: 'app', ...appOptions }, tree)
    .toPromise();
}

describe('ng2-charts-schematics', () => {

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
    appTree = await createTestApp(runner);
  });

  it('works', async () => {
    const tree = await runner.runSchematicAsync('line', { name: 'test-chart', project: 'app' }, appTree).toPromise();

    expect(tree.files.length).toBeGreaterThan(0);
  });
});
