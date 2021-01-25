import { Component, OnInit, ViewChild } from '@angular/core';
import { IChartData, IChartOptions, IChartType, IEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: [ './dynamic-chart.component.scss' ]
})
export class DynamicChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'>;

  public barChartOptions: IChartOptions<'bar'> = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    legend: { display: true },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { x: {}, y: {} },
  };
  public barChartLabels: string[] = [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ];
  public barChartType: IChartType = 'bar';

  public barChartData: IChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: IEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: IEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
