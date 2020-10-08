import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { IChartOptions } from "chart.js";
import { filter } from "rxjs/operators";
import { ThemeService } from "ng2-charts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private theme;

  public get selectedTheme(): string {
    return this.theme;
  }

  public set selectedTheme(value) {
    this.renderer.removeClass(this.document.body, this.theme);
    this.theme = value;
    this.renderer.addClass(this.document.body, value);
    let overrides: IChartOptions;
    if (this.selectedTheme === 'ng2-charts-demo-light-theme') {
      overrides = {};
    } else {
      overrides = {
        legend: {
          labels: {
            font: {
              color: 'white'
            }
          }
        },
        scales: {
          x:
            {
              ticks: {
                font: {
                  color: 'white'
                }
              },
              gridLines: {
                color: 'rgba(255,255,255,0.1)'
              }
            },
          y:
            {
              ticks: {
                font: {
                  color: 'white'
                },
              },
              gridLines: {
                color: 'rgba(255,255,255,0.1)'
              }
            }

        },
        // plugins: {
        //   datalabels: {
        //     color: 'white',
        //   }
        // }
      };
    }
    this.themeService.setColorschemesOptions(overrides);
  }

  @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup;
  @ViewChildren('tab', { read: ElementRef }) tabElements: QueryList<ElementRef>;
  tabLabels: string[];

  subs: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.selectedTheme = 'ng2-charts-demo-light-theme';
  }

  ngOnInit(): void {
    this.subs.push(
      this.route.fragment
        .pipe(filter(Boolean))
        .subscribe((tabUrl: string) => {
          if (this.tabElements) {
            const index = this.tabLabels.indexOf(tabUrl);
            if (index !== -1) {
              this.tabGroup.selectedIndex = index;
            }
          }
        }));
  }

  ngAfterViewInit(): void {
    this.tabLabels = this.tabElements.map(r => r.nativeElement.getAttribute('label').replace(/ /g, ''));
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }

  updateRoute(index: number): void {
    const label = this.tabLabels[index];
    this.router.navigate([], { fragment: label });
  }
}
