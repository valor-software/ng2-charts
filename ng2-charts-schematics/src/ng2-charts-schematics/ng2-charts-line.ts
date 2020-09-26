import { Rule, SchematicContext, Tree, externalSchematic, chain } from '@angular-devkit/schematics';
import { ng2ProcessTree } from './ng2-process-tree';

const newCode = `public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }`;

const newMarkup = `<div style="display: block;">
  <canvas baseChart width="400" height="400"
    [datasets]="lineChartData"
    [labels]="lineChartLabels"
    [options]="lineChartOptions"
    [colors]="lineChartColors"
    [legend]="lineChartLegend"
    [chartType]="lineChartType"
    [plugins]="lineChartPlugins">
  </canvas>
</div>
`;

const newImports: [string, string][] = [
  ['ChartDataSets, ChartOptions, ChartType', 'chart.js'],
  ['Color, Label', 'ng2-charts'],
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ng2ChartsLine(_options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', _options),
    (tree: Tree, _context: SchematicContext) => ng2ProcessTree(tree, _context, _options, newCode, newMarkup, newImports)
  ]);
}
