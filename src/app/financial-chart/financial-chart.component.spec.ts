import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MarkdownModule } from 'ngx-markdown';
import { HighlightModule } from 'ngx-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

import { FinancialChartComponent } from './financial-chart.component';
import { ChartsModule } from 'ng2-charts';

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    // { name: 'html', func: html },
    // {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}

describe('FinancialChartComponent', () => {
  let component: FinancialChartComponent;
  let fixture: ComponentFixture<FinancialChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialChartComponent],
      imports: [
        HttpClientModule,
        ChartsModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
        HighlightModule.forRoot({
          languages: hljsLanguages,
        }),
      ],
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
