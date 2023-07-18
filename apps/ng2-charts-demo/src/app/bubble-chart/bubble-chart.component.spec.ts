import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleChartComponent } from './bubble-chart.component';
import { NgChartsModule } from 'ng2-charts';

describe('BubbleChartComponent', () => {
  let component: BubbleChartComponent;
  let fixture: ComponentFixture<BubbleChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BubbleChartComponent],
      imports: [NgChartsModule],
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
