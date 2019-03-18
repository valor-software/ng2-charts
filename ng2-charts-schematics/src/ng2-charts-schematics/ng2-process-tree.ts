import {
  SchematicContext,
  Tree,
  SchematicsException,
  Rule,
} from '@angular-devkit/schematics';
import {
  getSourceNodes,
  findNodes,
  insertImport,
  addImportToModule
} from '@schematics/angular/utility/ast-utils';
// import { parseName } from '@schematics/angular/utility/parse-name';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { readIntoSourceFile } from './read-into-source-file';
import * as ts from 'typescript';
import { InsertChange } from '@schematics/angular/utility/change';
import { buildDefaultPath, getProject } from '@schematics/angular/utility/project';
import { getProjectTargetOptions } from "@angular/cdk/schematics";
import { getAppModulePath } from "@schematics/angular/utility/ng-ast-utils";

export function ng2ProcessTree(
  _options: any,
  newCode: string,
  newMarkup: string,
  newImports: [string, string][] = []): Rule {

  return (tree: Tree, _context: SchematicContext) => {
    if (!_options.project) {
      throw new SchematicsException('Option (project) is required.');
    }
    const project = getProject(tree, _options.project);

    if (_options.path === undefined) {
      _options.path = buildDefaultPath(project);
    }

    if (!_options.module) {
      _options.module = findModuleFromOptions(tree, _options);
    }

    const codeAction = tree.actions.filter(r => r.path.endsWith('.component.ts'))[0];
    const markupActions = tree.actions.filter(r => r.path.endsWith('.component.html'));
    const codeSource = readIntoSourceFile(tree, codeAction.path);
    const nodes = getSourceNodes(codeSource);
    const classNodes = nodes.filter(r => findNodes(r, ts.SyntaxKind.ClassDeclaration).length);
    const classDecl = findNodes(classNodes[0], ts.SyntaxKind.ClassDeclaration)[0] as ts.ClassDeclaration;
    const changes = newImports.map(([a, b]) => insertImport(codeSource, codeAction.path, a, b));
    if (_options.module) {
      const recorder1 = tree.beginUpdate(_options.module);
      const moduleSource = readIntoSourceFile(tree, _options.module);
      const addImport = addImportToModule(moduleSource, _options.module, 'ChartsModule', 'src/app/app-chart-config');
      for (const change of addImport) {
        if (change instanceof InsertChange) {
          recorder1.insertLeft(change.pos, change.toAdd);
        }
      }
      tree.commitUpdate(recorder1);
    }
    let inlineTemplate = false;
    if (classDecl.decorators) {
      const recorder2 = tree.beginUpdate(codeAction.path);
      const decorator = classDecl.decorators[0];
      const literal = findNodes(decorator.expression, ts.SyntaxKind.ObjectLiteralExpression)[0] as ts.ObjectLiteralExpression;
      let template: ts.PropertyAssignment;
      template = literal.properties.filter(r => ts.isPropertyAssignment(r) &&
        ts.isIdentifier(r.name) &&
        r.name.escapedText === 'template')[0] as ts.PropertyAssignment;
      if (template) {
        const newNode = ts.createStringLiteral('`' + newMarkup + '`');
        const start = template.initializer.getStart();
        const end = template.initializer.getEnd();
        recorder2.remove(start, end - start);
        recorder2.insertLeft(start, newNode.text);
        inlineTemplate = true;
      }
      tree.commitUpdate(recorder2);
    }
    if (!inlineTemplate && markupActions.length) {
      const markupAction = markupActions[0];
      tree.overwrite(markupAction.path, newMarkup);
    }
    const recorder3 = tree.beginUpdate(codeAction.path);
    const start2 = classDecl.members[0].getStart();
    const end2 = classDecl.members[classDecl.members.length - 1].getEnd();
    recorder3.remove(start2, end2 - start2);
    recorder3.insertLeft(start2, newCode);
    for (const change of changes) {
      if (change instanceof InsertChange) {
        recorder3.insertLeft(change.pos, change.toAdd);
      }
    }
    tree.commitUpdate(recorder3);
    return tree;
  };
}
