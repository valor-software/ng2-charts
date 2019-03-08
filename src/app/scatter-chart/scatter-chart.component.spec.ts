import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterChartComponent } from './scatter-chart.component';
import { ChartsModule } from 'ng2-charts';

describe('ScatterChartComponent', () => {
  let component: ScatterChartComponent;
  let fixture: ComponentFixture<ScatterChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScatterChartComponent],
      imports: [
        ChartsModule,
      ],
    })
      .compileComponents();
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
