import { BaseChartDirective } from './base-chart.directive';
import { ElementRef, NgZone } from '@angular/core';
import { ThemeService } from './theme.service';

describe('BaseChartDirective', () => {
  it('should create an instance', () => {
    const directive = new BaseChartDirective(null as ElementRef, null as ThemeService, null as NgZone);
    expect(directive).toBeTruthy();
  });
});
