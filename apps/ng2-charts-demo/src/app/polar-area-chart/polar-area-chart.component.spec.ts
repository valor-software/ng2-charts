import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PolarAreaChartComponent } from './polar-area-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHighlightjs } from '../app.config';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PolarAreaChartComponent', () => {
  let component: PolarAreaChartComponent;
  let fixture: ComponentFixture<PolarAreaChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        provideHighlightjs(),
        provideCharts(withDefaultRegisterables()),
      ],
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
