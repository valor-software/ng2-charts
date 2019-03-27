import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialChartComponent } from './financial-chart.component';
import { ChartsModule } from 'ng2-charts';

describe('FinancialChartComponent', () => {
  let component: FinancialChartComponent;
  let fixture: ComponentFixture<FinancialChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialChartComponent],
      imports: [
        ChartsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
