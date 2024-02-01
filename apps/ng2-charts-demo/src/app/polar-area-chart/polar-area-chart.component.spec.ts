import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PolarAreaChartComponent } from './polar-area-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

describe('PolarAreaChartComponent', () => {
  let component: PolarAreaChartComponent;
  let fixture: ComponentFixture<PolarAreaChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideCharts(withDefaultRegisterables())],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
