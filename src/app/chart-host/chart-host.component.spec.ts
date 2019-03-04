import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHostComponent } from './chart-host.component';
import { HighlightModule } from 'ngx-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { MaterialModule } from '../material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    // { name: 'html', func: html },
    // {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}

describe('ChartHostComponent', () => {
  let component: ChartHostComponent;
  let fixture: ComponentFixture<ChartHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartHostComponent ],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        HighlightModule.forRoot({
          languages: hljsLanguages,
        }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
