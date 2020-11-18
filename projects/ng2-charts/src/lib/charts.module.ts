import { NgModule } from '@angular/core';
import { BaseChartDirectiveX } from './base-chart-x.directive';
import { BaseChartDirective } from './base-chart.directive';

@NgModule({
  declarations: [
    BaseChartDirective,
    BaseChartDirectiveX,
  ],
  imports: [
  ],
  exports: [
    BaseChartDirective,
    BaseChartDirectiveX,
  ]
})
export class ChartsModule { }
