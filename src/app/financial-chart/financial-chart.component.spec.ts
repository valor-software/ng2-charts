import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialChartComponent } from './financial-chart.component';

describe('FinancialChartComponent', () => {
  let component: FinancialChartComponent;
  let fixture: ComponentFixture<FinancialChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialChartComponent ]
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
