import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BubbleChartComponent } from './bubble-chart.component';
import {provideCharts, withDefaultRegisterables} from "ng2-charts";

describe('BubbleChartComponent', () => {
  let component: BubbleChartComponent;
  let fixture: ComponentFixture<BubbleChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideCharts(withDefaultRegisterables())],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
