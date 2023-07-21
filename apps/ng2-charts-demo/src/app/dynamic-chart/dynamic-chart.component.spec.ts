import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicChartComponent } from './dynamic-chart.component';
import { NgChartsModule } from 'ng2-charts';

describe('DynamicChartComponent', () => {
  let component: DynamicChartComponent;
  let fixture: ComponentFixture<DynamicChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicChartComponent],
      imports: [NgChartsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
