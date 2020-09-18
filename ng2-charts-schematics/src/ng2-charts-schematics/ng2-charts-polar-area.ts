import { Rule, externalSchematic, chain } from '@angular-devkit/schematics';
import { ng2ProcessTree } from './ng2-process-tree';
import { buildMetaConfig } from './build-meta-config';

const newCode = `public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor() { }

  ngOnInit(): void {
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
  ['ChartType, Label, SingleDataSet', 'src/app/app-chart-config'],
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ng2ChartsPolarArea(_options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', _options),
    buildMetaConfig(_options),
    ng2ProcessTree(_options, newCode, newMarkup, newImports)
  ]);
}
