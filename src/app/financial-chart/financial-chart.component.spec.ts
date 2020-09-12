import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MarkdownModule } from 'ngx-markdown';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

import { FinancialChartComponent } from './financial-chart.component';
import { ChartsModule } from 'ng2-charts';

export function hljsLanguages(): { [name: string]: () => Promise<any> } {
  return {
    typescript: () => import('highlight.js/lib/languages/typescript'),
    // html: import('highlight.js/lib/languages/html'),
    // scss: import('highlight.js/lib/languages/scss'),
    xml: () => import('highlight.js/lib/languages/xml')
  };
}

describe('FinancialChartComponent', () => {
  let component: FinancialChartComponent;
  let fixture: ComponentFixture<FinancialChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ FinancialChartComponent ],
        imports: [
          HttpClientModule,
          ChartsModule,
          MarkdownModule.forRoot({ loader: HttpClient }),
          HighlightModule,
        ],
        providers: [ {
          provide: HIGHLIGHT_OPTIONS,
          useValue: {
            coreLibraryLoader: () => import('highlight.js/lib/highlight'),
            languages: hljsLanguages()
          }
        } ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
