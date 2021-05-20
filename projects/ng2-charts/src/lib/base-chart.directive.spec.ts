import { BaseChartDirective } from './base-chart.directive';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Chart, registerables } from "chart.js";

@Component({
  template: '<canvas baseChart' +
    ' [datasets]="datasets"' +
    ' [labels]="labels"></canvas>'
})
class TestComponent {
  public datasets: any[] = []
  public labels: string[] = []
}

describe('BaseChartDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let element: TestComponent;
  let directive: BaseChartDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        BaseChartDirective
      ]
    });

    Chart.register(...registerables);

    fixture = TestBed.createComponent(TestComponent);
    element = fixture.componentInstance;
    directive = fixture.debugElement.query(By.directive(BaseChartDirective))
      .injector.get(BaseChartDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();

    fixture.detectChanges();

    expect(directive.chart).toBeDefined();
  });

  it('should trigger an update when labels or datasets change', () => {
    fixture.detectChanges();

    element.labels = [ 'Answers' ]

    fixture.detectChanges();

    expect(directive.chart?.data.labels?.length).toBe(1);
    expect(directive.chart?.data.labels).toEqual(element.labels);

    element.datasets = [ {
      data: [ 42 ]
    } ]

    fixture.detectChanges();

    expect(directive.chart?.data.datasets?.length).toBe(1);
    expect(directive.chart?.data.datasets).toEqual(element.datasets);
  });

});
