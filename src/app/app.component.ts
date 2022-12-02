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
import { Subscription, filter } from 'rxjs';
import { Chart, ChartOptions } from 'chart.js';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private theme = 'ng2-charts-demo-light-theme';

  public get selectedTheme(): string {
    return this.theme;
  }

  public set selectedTheme(value: string) {
    this.renderer.removeClass(this.document.body, this.theme);
    this.theme = value;
    this.renderer.addClass(this.document.body, value);
    let overrides: ChartOptions;

    if (this.selectedTheme === 'light-theme') {
      overrides = {
        scales: undefined,
        plugins: undefined
      };
    } else {
      overrides = {
        scales: {
          x: {
            ticks: {
              color: 'white'
            },
            grid: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          y: {
            ticks: {
              color: 'white'
            },
            grid: {
              color: 'rgba(255,255,255,0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white'
            },
          },
          datalabels: {
            color: 'white',
          }
        }
      };
    }

    this.themeService.setColorschemesOptions(overrides);
  }

  @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup | undefined;
  @ViewChildren('tab', { read: ElementRef }) tabElements: QueryList<ElementRef> | undefined;
  tabLabels: string[] = [];

  subs: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // For consistent rendering across CI and local envs
    Chart.defaults.set('font', { family: "Arial" })
  }

  ngOnInit(): void {
    this.subs.push(
      this.route.fragment
        .pipe(filter((tabUrl) => !!tabUrl))
        .subscribe((tabUrl: string | null) => {
          if (tabUrl && this.tabElements) {
            const index = this.tabLabels.indexOf(tabUrl);
            if (index && index !== -1 && this.tabGroup) {
              this.tabGroup.selectedIndex = index;
            }
          }
        }));
  }

  ngAfterViewInit(): void {
    if (this.tabElements) {
      this.tabLabels = this.tabElements.map(r => r.nativeElement.getAttribute('label').replace(/ /g, ''));
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }

  updateRoute(index: number): void {
    const label = this.tabLabels[index];
    this.router.navigate([], { fragment: label });
  }
}
