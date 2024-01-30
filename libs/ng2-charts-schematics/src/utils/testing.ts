import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';

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
): Promise<UnitTestTree> {
  let tree = await createWorkspace(runner);
  tree = await runner.runExternalSchematic(
    '@schematics/angular',
    'application',
    { name: 'app', standalone: true },
    tree
  );

  return runner.runExternalSchematic(
    '@schematics/angular',
    'application',
    { name: 'second-app', standalone: true },
    tree
  );
}
