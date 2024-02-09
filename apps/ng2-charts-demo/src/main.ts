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
import {
  provideCharts,
  withColorGenerator,
  withDefaultRegisterables,
} from 'ng2-charts';

const routes: Route[] = [];

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
    provideCharts(withDefaultRegisterables(), withColorGenerator(), {
      defaults: { responsive: false },
    }),
    highlightProvider,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
