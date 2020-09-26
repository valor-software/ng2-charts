import { Tree, SchematicsException } from '@angular-devkit/schematics';
import * as ts from 'typescript';
// import { ReplaceChange } from '@schematics/angular/utility/change';

export function readIntoSourceFile(host: Tree, modulePath: string): ts.SourceFile {
  const text = host.read(modulePath);
  if (text === null) {
    throw new SchematicsException(`File ${modulePath} does not exist.`);
  }
  const sourceText = text.toString('utf-8');
  return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}
