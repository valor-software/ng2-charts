import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartComponent } from './doughnut-chart.component';
import { NgChartsModule } from 'ng2-charts';

describe('DoughnutChartComponent', () => {
  let component: DoughnutChartComponent;
  let fixture: ComponentFixture<DoughnutChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DoughnutChartComponent],
      imports: [
        NgChartsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
