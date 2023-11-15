import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';

let appTree: Tree;

function createWorkspace(runner: SchematicTestRunner): Promise<UnitTestTree> {
  return runner.runExternalSchematic('@schematics/angular', 'workspace', {
    name: 'workspace',
    version: '10.0.0',
    newProjectRoot: 'projects',
  });
}

/**
 * Creates a sample workspace with two applications: 'app' (default) and 'second-app'
 */
export async function createTestApp(
  runner: SchematicTestRunner,
  appOptions = {}
): Promise<UnitTestTree> {
  const tree = await createWorkspace(runner);

  return runner.runExternalSchematic(
    '@schematics/angular',
    'application',
    { name: 'app', ...appOptions },
    tree
  );
}

describe('ng2-charts-schematics', () => {
  let runner: SchematicTestRunner;

  beforeEach(async () => {
    runner = new SchematicTestRunner(
      'schematics',
      require.resolve('../collection.json')
    );
    appTree = await createTestApp(runner);
  });

  it('works', async () => {
    const tree = await runner
      .runSchematic(
        'line',
        { name: 'test-chart', project: 'app' },
        appTree
      );

    expect(tree?.files.length).toBeGreaterThan(0);
  });
});
