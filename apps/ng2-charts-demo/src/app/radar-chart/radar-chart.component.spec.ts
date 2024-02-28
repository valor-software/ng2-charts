import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RadarChartComponent } from './radar-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHighlightjs } from '../app.config';

describe('RadarChartComponent', () => {
  let component: RadarChartComponent;
  let fixture: ComponentFixture<RadarChartComponent>;

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
    fixture = TestBed.createComponent(RadarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
