import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChartHostComponent } from './chart-host.component';
import {
  NoopAnimationsModule,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { provideHighlightjs } from '../app.config';

describe('ChartHostComponent', () => {
  let component: ChartHostComponent;
  let fixture: ComponentFixture<ChartHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ChartHostComponent, NoopAnimationsModule],
      providers: [provideNoopAnimations(), provideHighlightjs()],
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
