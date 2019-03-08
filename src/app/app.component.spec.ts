import { TestBed, async } from '@angular/core/testing';
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
import { HighlightModule } from 'ngx-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    // { name: 'html', func: html },
    // {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}

describe('AppComponent', () => {
  beforeEach(async(() => {
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
      ],
      imports: [
        NoopAnimationsModule,
        ChartsModule,
        MaterialModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
        HighlightModule.forRoot({
          languages: hljsLanguages,
        }),
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
