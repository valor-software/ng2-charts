import { provideRouter, Route } from '@angular/router';
import { LanguageFn } from 'highlight.js';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { provideMarkdown } from 'ngx-markdown';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  Provider,
} from '@angular/core';

import AnnotationPlugin from 'chartjs-plugin-annotation';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,
} from 'chartjs-chart-financial';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from './polar-area-chart/polar-area-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';
import { FinancialChartComponent } from './financial-chart/financial-chart.component';
import { LandingComponent } from './landing/landing.component';

const routes: Route[] = [
  {
    path: 'line',
    component: LineChartComponent,
  },
  {
    path: 'bar',
    component: BarChartComponent,
  },
  {
    path: 'doughnut',
    component: DoughnutChartComponent,
  },
  {
    path: 'radar',
    component: RadarChartComponent,
  },
  {
    path: 'pie',
    component: PieChartComponent,
  },
  {
    path: 'polar-area',
    component: PolarAreaChartComponent,
  },
  {
    path: 'bubble',
    component: BubbleChartComponent,
  },
  {
    path: 'scatter',
    component: ScatterChartComponent,
  },
  {
    path: 'dynamic',
    component: DynamicChartComponent,
  },
  {
    path: 'financial',
    component: FinancialChartComponent,
  },
  { path: '', component: LandingComponent },
];

const hljsLanguages = (): { [name: string]: Partial<LanguageFn> } => ({
  typescript: () => import('highlight.js/lib/languages/typescript'),
  xml: () => import('highlight.js/lib/languages/xml'),
});

export const provideHighlightjs = (): Provider[] => [
  {
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: hljsLanguages(),
    },
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideMarkdown({ loader: HttpClient }),
    provideAnimations(),
    provideCharts(
      withDefaultRegisterables(
        CandlestickController,
        CandlestickElement,
        OhlcController,
        OhlcElement,
        DataLabelsPlugin,
        AnnotationPlugin,
      ),
      {
        defaults: {
          // For consistent rendering across CI and local envs
          font: { family: 'Arial' },
        },
      },
    ),
    provideHighlightjs(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
  ],
};
