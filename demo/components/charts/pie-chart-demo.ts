import { Component } from '@angular/core';

// webpack html imports
let template = require('./pie-chart-demo.html');

@Component({
  selector: 'pie-chart-demo',
  template: template
})
export class PieChartDemoComponent {
  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
