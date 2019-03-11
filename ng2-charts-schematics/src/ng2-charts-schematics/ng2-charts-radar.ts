import { Rule, SchematicContext, Tree, externalSchematic, chain } from '@angular-devkit/schematics';
import { ng2ProcessTree } from './ng2-process-tree';

const newCode = `public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor() { }

  ngOnInit() {
  }`;

const newMarkup = `<div style="display: block;">
  <canvas baseChart
    [datasets]="radarChartData"
    [options]="radarChartOptions"
    [labels]="radarChartLabels"
    [chartType]="radarChartType">
  </canvas>
</div>
`;

const newImports: [string, string][] = [
  ['ChartDataSets, ChartOptions, ChartType', 'chart.js'],
  ['Label', 'ng2-charts'],
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ng2ChartsRadar(_options: any): Rule {
  // console.log('options', _options);
  return chain([
    externalSchematic('@schematics/angular', 'component', _options),
    (tree: Tree, _context: SchematicContext) => ng2ProcessTree(tree, _context, newCode, newMarkup, newImports)
  ]);
}
