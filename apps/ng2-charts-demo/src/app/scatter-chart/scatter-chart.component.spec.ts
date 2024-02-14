import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ScatterChartComponent } from './scatter-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHighlightjs } from '../app.config';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ScatterChartComponent', () => {
  let component: ScatterChartComponent;
  let fixture: ComponentFixture<ScatterChartComponent>;

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
    fixture = TestBed.createComponent(ScatterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
