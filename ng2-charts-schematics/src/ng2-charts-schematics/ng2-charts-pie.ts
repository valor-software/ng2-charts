import { Rule, SchematicContext, Tree, externalSchematic, chain } from '@angular-devkit/schematics';
import { ng2ProcessTree } from './ng2-process-tree';

const newCode = `public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }`;

const newMarkup = `<div style="display: block;">
  <canvas baseChart
    [data]="pieChartData"
    [labels]="pieChartLabels"
    [chartType]="pieChartType"
    [options]="pieChartOptions"
    [plugins]="pieChartPlugins"
    [legend]="pieChartLegend">
  </canvas>
</div>
`;

const newImports: [string, string][] = [
  ['ChartOptions, ChartType', 'chart.js'],
  ['Label, SingleDataSet', 'ng2-charts'],
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ng2ChartsPie(_options: any): Rule {
  // console.log('options', _options);
  return chain([
    externalSchematic('@schematics/angular', 'component', _options),
    (tree: Tree, _context: SchematicContext) => ng2ProcessTree(tree, _context, _options, newCode, newMarkup, newImports)
  ]);
}
