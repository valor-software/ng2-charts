import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { Route, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MarkdownModule } from 'ngx-markdown';

import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from './polar-area-chart/polar-area-chart.component';
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';
import { ChartHostComponent } from './chart-host/chart-host.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { FinancialChartComponent } from './financial-chart/financial-chart.component';

import { LanguageFn } from "highlight.js";
import { FormsModule } from "@angular/forms";

const routes: Route[] = [];

export function hljsLanguages(): { [name: string]: Partial<LanguageFn> } {
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
    FormsModule,
    NgChartsModule,
    MaterialModule,
    HighlightModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    RouterModule.forRoot(routes, {})
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: hljsLanguages()
      }
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
