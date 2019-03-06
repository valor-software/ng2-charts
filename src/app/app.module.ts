import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';

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
import { HighlightModule } from 'ngx-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    // { name: 'html', func: html },
    // {name: 'scss', func: scss},
    { name: 'xml', func: xml }
  ];
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
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    HighlightModule.forRoot({
      languages: hljsLanguages,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    BaseChartDirective.unregisterPlugin(pluginDataLabels);
  }
}
