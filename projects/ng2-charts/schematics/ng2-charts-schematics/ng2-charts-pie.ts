import { Rule, externalSchematic, chain } from '@angular-devkit/schematics';
import { ng2ProcessTree } from './ng2-process-tree';
import { buildMetaConfig } from './build-meta-config';

const newCode = `public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }`;

const newMarkup = `<div style="display: block;">
  <canvas baseChart
    [data]="pieChartData"
    [labels]="pieChartLabels"
    [type]="pieChartType"
    [options]="pieChartOptions"
    [plugins]="pieChartPlugins"
    [legend]="pieChartLegend">
  </canvas>
</div>
`;

const newImports: [string, string][] = [
  ['ChartOptions, ChartType, Label, SingleDataSet', 'src/app/app-chart-config'],
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ng2ChartsPie(_options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', _options),
    buildMetaConfig(_options),
    ng2ProcessTree(_options, newCode, newMarkup, newImports)
  ]);
}
