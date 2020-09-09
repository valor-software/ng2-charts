import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BaseChartDirective, ChartsModule, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from './polar-area-chart/polar-area-chart.component';
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';
import { ChartHostComponent } from './chart-host/chart-host.component';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { FinancialChartComponent } from './financial-chart/financial-chart.component';

const routes: Route[] = [];

export function hljsLanguages(): { [name: string]: () => Promise<any> } {
  return {
    typescript: () => import('highlight.js/lib/languages/typescript'),
    // html: import('highlight.js/lib/languages/html'),
    // scss: import('highlight.js/lib/languages/scss'),
    xml: () => import('highlight.js/lib/languages/xml')
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    DynamicChartComponent,
    ChartHostComponent,
    BubbleChartComponent,
    ScatterChartComponent,
    FinancialChartComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: hljsLanguages()
      }
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {
    BaseChartDirective.unregisterPlugin(ChartDataLabels);
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }
}
