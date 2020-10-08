import { BaseChartDirective } from './base-chart.directive';
import { ElementRef } from '@angular/core';

describe('BaseChartDirective', () => {
  it('should create an instance', () => {
    const directive = new BaseChartDirective(null as ElementRef);
    expect(directive).toBeTruthy();
  });
});
