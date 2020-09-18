import { Rule, externalSchematic, chain } from '@angular-devkit/schematics';
import { ng2ProcessTree } from './ng2-process-tree';
import { buildMetaConfig } from './build-meta-config';

const newCode = `public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSetsBar[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor() { }

  ngOnInit(): void {
  }`;

const newMarkup = `<div style="display: block;">
  <canvas baseChart
    [datasets]="barChartData"
    [labels]="barChartLabels"
    [options]="barChartOptions"
    [plugins]="barChartPlugins"
    [legend]="barChartLegend"
    [chartType]="barChartType">
  </canvas>
</div>
`;

const newImports: [string, string][] = [
  ['ChartDataSetsBar, ChartOptions, ChartType, Label', 'src/app/app-chart-config'],
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ng2ChartsBar(_options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', _options),
    buildMetaConfig(_options),
    ng2ProcessTree(_options, newCode, newMarkup, newImports)
  ]);
}
