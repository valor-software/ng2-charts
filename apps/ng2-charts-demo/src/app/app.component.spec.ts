import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMarkdown } from 'ngx-markdown';
import { RouterTestingModule } from '@angular/router/testing';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [
        provideMarkdown(),
        provideCharts(withDefaultRegisterables(DataLabelsPlugin)),
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
