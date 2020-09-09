import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from './polar-area-chart/polar-area-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';
import { ChartHostComponent } from './chart-host/chart-host.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { ChartsModule } from 'ng2-charts';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { FinancialChartComponent } from './financial-chart/financial-chart.component';

export function hljsLanguages(): { [name: string]: () => Promise<any> } {
  return {
    typescript: () => import('highlight.js/lib/languages/typescript'),
    // html: import('highlight.js/lib/languages/html'),
    // scss: import('highlight.js/lib/languages/scss'),
    xml: () => import('highlight.js/lib/languages/xml')
  };
}

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LineChartComponent,
        BarChartComponent,
        PieChartComponent,
        PolarAreaChartComponent,
        RadarChartComponent,
        DynamicChartComponent,
        DoughnutChartComponent,
        BubbleChartComponent,
        ScatterChartComponent,
        ChartHostComponent,
        FinancialChartComponent,
      ],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        ChartsModule,
        MaterialModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
        HighlightModule,
      ],
      providers: [ {
        provide: HIGHLIGHT_OPTIONS,
        useValue: {
          languages: hljsLanguages()
        }
      } ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
