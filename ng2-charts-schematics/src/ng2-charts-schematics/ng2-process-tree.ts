import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { getSourceNodes, findNodes, insertImport } from '@schematics/angular/utility/ast-utils';
import { readIntoSourceFile } from './read-into-source-file';
import * as ts from 'typescript';
import { InsertChange } from '@schematics/angular/utility/change';

export function ng2ProcessTree(
  tree: Tree,
  _context: SchematicContext,
  newCode: string,
  newMarkup: string,
  newImports: [string, string][] = []) {
  const codeAction = tree.actions.filter(r => r.path.endsWith('.component.ts'))[0];
  const markupActions = tree.actions.filter(r => r.path.endsWith('.component.html'));
  const codeSource = readIntoSourceFile(tree, codeAction.path);
  const nodes = getSourceNodes(codeSource);
  const classNodes = nodes.filter(r => findNodes(r, ts.SyntaxKind.ClassDeclaration).length);
  const classDecl = findNodes(classNodes[0], ts.SyntaxKind.ClassDeclaration)[0] as ts.ClassDeclaration;
  let inlineTemplate = false;
  let template: ts.PropertyAssignment;
  const changes = newImports.map(([a, b]) => insertImport(codeSource, codeAction.path, a, b));
  const recorder = tree.beginUpdate(codeAction.path);
  if (classDecl.decorators) {
    const decorator = classDecl.decorators[0];
    const literal = findNodes(decorator.expression, ts.SyntaxKind.ObjectLiteralExpression)[0] as ts.ObjectLiteralExpression;
    template = literal.properties.filter(r => ts.isPropertyAssignment(r) &&
      ts.isIdentifier(r.name) &&
      r.name.escapedText === 'template')[0] as ts.PropertyAssignment;
    if (template) {
      const newNode = ts.createStringLiteral('`' + newMarkup + '`');
      const start = template.initializer.getStart();
      const end = template.initializer.getEnd();
      recorder.remove(start, end - start);
      recorder.insertLeft(start, newNode.text);
      inlineTemplate = true;
    }
  }
  if (!inlineTemplate && markupActions.length) {
    const markupAction = markupActions[0];
    tree.overwrite(markupAction.path, newMarkup);
  }
  const start2 = classDecl.members[0].getStart();
  const end2 = classDecl.members[classDecl.members.length - 1].getEnd();
  recorder.remove(start2, end2 - start2);
  recorder.insertLeft(start2, newCode);
  for (const change of changes) {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  }
  tree.commitUpdate(recorder);
  return tree;
}
