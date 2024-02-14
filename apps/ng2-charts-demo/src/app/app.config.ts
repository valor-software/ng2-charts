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
import {
  provideCharts,
  withColorGenerator,
  withDefaultRegisterables,
} from 'ng2-charts';
import { ApplicationConfig, Provider } from '@angular/core';

import AnnotationPlugin from 'chartjs-plugin-annotation';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,
} from 'chartjs-chart-financial';

const routes: Route[] = [];

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
    provideMarkdown({ loader: HttpClient }),
    provideAnimations(),
    provideCharts(
      withColorGenerator(),
      withDefaultRegisterables(
        CandlestickController,
        CandlestickElement,
        OhlcController,
        OhlcElement,
        DataLabelsPlugin,
        AnnotationPlugin,
      ),
    ),
    provideHighlightjs(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
  ],
};
