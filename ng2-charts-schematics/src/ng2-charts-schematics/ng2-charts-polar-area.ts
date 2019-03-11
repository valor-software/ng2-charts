import { Rule, SchematicContext, Tree, externalSchematic, chain } from '@angular-devkit/schematics';
import { ng2ProcessTree } from './ng2-process-tree';

const newCode = `public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor() { }

  ngOnInit() {
  }`;

const newMarkup = `<div style="display: block;">
  <canvas baseChart
    [data]="polarAreaChartData"
    [labels]="polarAreaChartLabels"
    [legend]="polarAreaLegend"
    [chartType]="polarAreaChartType">
  </canvas>
</div>
`;

const newImports: [string, string][] = [
  ['ChartType', 'chart.js'],
  ['Label, SingleDataSet', 'ng2-charts'],
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ng2ChartsPolarArea(_options: any): Rule {
  // console.log('options', _options);
  return chain([
    externalSchematic('@schematics/angular', 'component', _options),
    (tree: Tree, _context: SchematicContext) => ng2ProcessTree(tree, _context, newCode, newMarkup, newImports)
  ]);
}
