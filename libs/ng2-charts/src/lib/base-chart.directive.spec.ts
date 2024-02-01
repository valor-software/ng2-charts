import { BaseChartDirective } from './base-chart.directive';
import { provideCharts, withDefaultRegisterables } from './ng-charts.provider';
import { By } from '@angular/platform-browser';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { ChartData, ChartDataset } from 'chart.js';

@Component({
  template:
    '<canvas baseChart' +
    ' [data]="data"' +
    ' [datasets]="datasets"' +
    ' [labels]="labels"' +
    ' (chartClick)="click()"' +
    ' (chartHover)="hover()"></canvas>',
  standalone: true,
  imports: [BaseChartDirective],
})
class TestComponent {
  public data?: ChartData;
  public datasets?: ChartDataset[];
  public labels?: string[];
  public click = jest.fn();
  public hover = jest.fn();
}

describe('BaseChartDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let element: TestComponent;
  let directive: BaseChartDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideCharts(withDefaultRegisterables())],
    });

    fixture = TestBed.createComponent(TestComponent);
    element = fixture.componentInstance;
    directive = fixture.debugElement
      .query(By.directive(BaseChartDirective))
      .injector.get(BaseChartDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();

    fixture.detectChanges();

    expect(directive.chart).toBeDefined();
  });

  it('should trigger an update when labels or datasets change', () => {
    fixture.detectChanges();

    element.labels = ['Answers'];

    fixture.detectChanges();

    expect(directive.chart?.data.labels?.length).toBe(1);
    expect(directive.chart?.data.labels).toEqual(element.labels);

    element.datasets = [
      {
        data: [42],
      },
    ];

    fixture.detectChanges();

    expect(directive.chart?.data.datasets?.length).toBe(1);
    expect(directive.chart?.data.datasets).toEqual(element.datasets);
  });

  it('should not merge labels when updating data', () => {
    fixture.detectChanges();

    element.data = {
      labels: ['Answers'],
      datasets: [],
    };

    fixture.detectChanges();

    expect(directive.chart?.data.labels?.length).toBe(1);
    expect(directive.chart?.data.labels).toEqual(element.data.labels);

    element.data = {
      labels: ['Life', 'Universe', 'Everything'],
      datasets: [],
    };

    fixture.detectChanges();

    expect(directive.chart?.data.labels?.length).toBe(3);
    expect(
      directive.chart?.data?.labels && directive.chart?.data?.labels[0],
    ).not.toEqual('Answers');
  });

  it('should emit when the chart is clicked', fakeAsync(() => {
    fixture.detectChanges();

    const canvas = fixture.nativeElement.querySelector('canvas');

    const event = new MouseEvent(
      // "click",
      'chartClick',
      {
        clientX: canvas.getBoundingClientRect().left + 50,
        clientY: canvas.getBoundingClientRect().top + 50,
      },
    );

    canvas.dispatchEvent(event);

    tick(25);

    expect(element.click).toHaveBeenCalled();
  }));

  it('should emit when the chart is hovered', fakeAsync(() => {
    fixture.detectChanges();

    const canvas = fixture.nativeElement.querySelector('canvas');

    const event = new MouseEvent(
      // "mousemove",
      'chartHover',
      {
        clientX: canvas.getBoundingClientRect().left + 50,
        clientY: canvas.getBoundingClientRect().top + 50,
      },
    );

    canvas.dispatchEvent(event);

    tick(25);

    expect(element.hover).toHaveBeenCalled();
  }));
});
