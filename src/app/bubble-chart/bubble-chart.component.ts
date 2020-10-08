import { Component, OnInit } from '@angular/core';
import { IChartData, IChartOptions } from "chart.js/types/interfaces";

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: [ './bubble-chart.component.scss' ]
})
export class BubbleChartComponent implements OnInit {
  public bubbleChartOptions: IChartOptions<'bubble'> = {
    scales: {
      x: {
        min: 0,
        max: 30,
        ticks: {}
      },
      y: {
        min: 0,
        max: 30,
        ticks: {}
      },
    }
  };
  public bubbleChartType: string = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: IChartData<'bubble'> = {
    labels: [],
    datasets: [ {
      data: [
        { x: 10, y: 10, r: 10 },
        { x: 15, y: 5, r: 15 },
        { x: 26, y: 12, r: 23 },
        { x: 7, y: 8, r: 8 },
      ],
      label: 'Series A',
      backgroundColor: [
        'red',
        'green',
        'blue',
        'purple',
        'yellow',
        'brown',
        'magenta',
        'cyan',
        'orange',
        'pink'
      ],
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    } ]
  };

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

  private rand(max: number): number {
    return Math.trunc(Math.random() * max);
  }

  private randomPoint(maxCoordinate: number): { r: number; x: number; y: number } {
    const x = this.rand(maxCoordinate);
    const y = this.rand(maxCoordinate);
    const r = this.rand(30) + 5;
    return { x, y, r };
  }

  public randomize(): void {
    const numberOfPoints = this.rand(5) + 5;
    this.bubbleChartData.datasets[0].data = Array.apply(null, { length: numberOfPoints }).map(r => this.randomPoint(30));
  }
}
