import { Component, OnInit, ViewChild } from '@angular/core';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { IChartData, IChartOptions, IChartType } from "chart.js/types/interfaces";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: [ './pie-chart.component.scss' ]
})
export class PieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'>;

  // Pie
  public pieChartOptions: IChartOptions<'pie'> = {
    responsive: true,
    legend: {
      display: true,
      position: 'top',
    },
    // plugins: {
    //   datalabels: {
    //     formatter: (value, ctx) => {
    //       const label = ctx.chart.data.labels[ctx.dataIndex];
    //       return label;
    //     },
    //   },
    // }
  };
  public pieChartData: IChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ],
    datasets: [ {
      data: [ 300, 500, 100 ],
      backgroundColor: [ 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)' ],
    } ]
  };
  public pieChartType: IChartType = 'pie';
  public pieChartLegend: boolean = true;
  public pieChartPlugins = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = [ 'hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny' ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = Array.apply(null, { length: 3 }).map(_ => randomWord());

    this.chart.update();
  }

  addSlice(): void {
    this.pieChartData.labels.push([ 'Line 1', 'Line 2', 'Line 3' ]);
    this.pieChartData.datasets[0].data.push(400);

    this.chart.update();
  }

  removeSlice(): void {
    this.pieChartData.labels.pop();
    this.pieChartData.datasets[0].data.pop();

    this.chart.update();
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';

    this.chart.render();
  }

  toggleLegend() {
    this.pieChartOptions.legend.display = !this.pieChartOptions.legend.display;

    this.chart.render();
  }
}
