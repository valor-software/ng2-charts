import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleChartComponent } from './bubble-chart.component';
import { ChartsModule } from 'ng2-charts';

describe('BubbleChartComponent', () => {
  let component: BubbleChartComponent;
  let fixture: ComponentFixture<BubbleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BubbleChartComponent],
      imports: [
        ChartsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
