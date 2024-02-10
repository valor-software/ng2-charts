import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideRouter, Route } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { LanguageFn } from 'highlight.js';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LandingComponent } from './app/landing/landing.component';
import { LineChartComponent } from './app/line-chart/line-chart.component';
import { BarChartComponent } from './app/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './app/doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './app/radar-chart/radar-chart.component';
import { PieChartComponent } from './app/pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from './app/polar-area-chart/polar-area-chart.component';
import { BubbleChartComponent } from './app/bubble-chart/bubble-chart.component';
import { ScatterChartComponent } from './app/scatter-chart/scatter-chart.component';
import { DynamicChartComponent } from './app/dynamic-chart/dynamic-chart.component';
import { FinancialChartComponent } from './app/financial-chart/financial-chart.component';

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

function hljsLanguages(): { [name: string]: Partial<LanguageFn> } {
  return {
    typescript: () => import('highlight.js/lib/languages/typescript'),
    xml: () => import('highlight.js/lib/languages/xml'),
  };
}

if (environment.production) {
  enableProdMode();
}

export const highlightProvider = {
  provide: HIGHLIGHT_OPTIONS,
  useValue: {
    coreLibraryLoader: () => import('highlight.js/lib/core'),
    languages: hljsLanguages(),
  },
} as const;

bootstrapApplication(AppComponent, {
  providers: [
    provideMarkdown({ loader: HttpClient }),
    provideAnimations(),
    provideCharts(withDefaultRegisterables(), {
      defaults: {
        // For consistent rendering across CI and local envs
        font: { family: 'Arial' },
      },
    }),
    highlightProvider,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
