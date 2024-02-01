import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChartHostComponent } from './chart-host.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { highlightProvider } from '../../main';

describe('ChartHostComponent', () => {
  let component: ChartHostComponent;
  let fixture: ComponentFixture<ChartHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [highlightProvider],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
