import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PieChartComponent } from './pie-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHighlightjs } from '../app.config';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

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
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
