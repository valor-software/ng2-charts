import { BaseChartDirective } from './base-chart.directive';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: '<canvas baseChart></canvas>'
})
class TestComponent {
}

describe('BaseChartDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        BaseChartDirective
      ]
    });
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const directive = fixture.debugElement.query(By.directive(BaseChartDirective));
    expect(directive).toBeTruthy();
  });
});
