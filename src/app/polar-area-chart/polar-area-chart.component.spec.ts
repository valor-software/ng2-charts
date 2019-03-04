import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarAreaChartComponent } from './polar-area-chart.component';
import { ChartsModule } from 'ng2-charts';

describe('PolarAreaChartComponent', () => {
  let component: PolarAreaChartComponent;
  let fixture: ComponentFixture<PolarAreaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolarAreaChartComponent],
      imports: [
        ChartsModule,
      ],
    })
      .compileComponents();
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
