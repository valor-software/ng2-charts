import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DoughnutChartComponent } from './doughnut-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHighlightjs } from '../app.config';

describe('DoughnutChartComponent', () => {
  let component: DoughnutChartComponent;
  let fixture: ComponentFixture<DoughnutChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHighlightjs(),
        provideNoopAnimations(),
        provideCharts(withDefaultRegisterables()),
      ],
    }).compileComponents();
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
