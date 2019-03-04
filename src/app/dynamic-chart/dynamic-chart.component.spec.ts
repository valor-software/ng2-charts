import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicChartComponent } from './dynamic-chart.component';
import { ChartsModule } from 'ng2-charts';

describe('DynamicChartComponent', () => {
  let component: DynamicChartComponent;
  let fixture: ComponentFixture<DynamicChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicChartComponent],
      imports: [
        ChartsModule,
      ],
    })
      .compileComponents();
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
