import { Rule, externalSchematic, chain } from '@angular-devkit/schematics';
import { ng2ProcessTree } from './ng2-process-tree';
import { buildMetaConfig } from './build-meta-config';

const newCode = `public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: ChartDataSetsRadar[] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor() { }

  ngOnInit(): void {
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
  ['ChartDataSetsRadar, ChartOptions, ChartType, Label', 'src/app/app-chart-config'],
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ng2ChartsRadar(_options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', _options),
    buildMetaConfig(_options),
    ng2ProcessTree(_options, newCode, newMarkup, newImports)
  ]);
}
