import { Rule, SchematicContext, Tree, externalSchematic, chain } from '@angular-devkit/schematics';
import { ng2ProcessTree } from './ng2-process-tree';

const newCode = `public bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 30,
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 30,
        }
      }]
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 10, y: 10, r: 10 },
        { x: 15, y: 5, r: 15 },
        { x: 26, y: 12, r: 23 },
        { x: 7, y: 8, r: 8 },
      ],
      label: 'Series A',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }`;

const newMarkup = `<div style="display: block;">
  <canvas baseChart
    [datasets]="bubbleChartData"
    [options]="bubbleChartOptions"
    [colors]="bubbleChartColors"
    [legend]="bubbleChartLegend"
    [chartType]="bubbleChartType">
  </canvas>
</div>
`;

const newImports: [string, string][] = [
  ['ChartDataSets, ChartOptions, ChartType', 'chart.js'],
  ['Color', 'ng2-charts'],
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ng2ChartsBubble(_options: any): Rule {
  // console.log('options', _options);
  return chain([
    externalSchematic('@schematics/angular', 'component', _options),
    (tree: Tree, _context: SchematicContext) => ng2ProcessTree(tree, _context, _options, newCode, newMarkup, newImports)
  ]);
}
