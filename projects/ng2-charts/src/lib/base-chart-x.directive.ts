import { Directive, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'canvas[baseChartx]',
  exportAs: 'base-chart-x'
})
export class BaseChartDirectiveX implements OnInit {
  ngOnInit(): void {
    
  }
}
