import {
  Component,
  OnInit,
  Inject,
  Renderer2,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabGroup } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private _selectedTheme = 'lala';
  public get selectedTheme() {
    return this._selectedTheme;
  }
  public set selectedTheme(value) {
    this.renderer.removeClass(this.document.body, this._selectedTheme);
    this._selectedTheme = value;
    this.renderer.addClass(this.document.body, value);
    let options: ChartOptions;
    if (this.selectedTheme === 'ng2-charts-demo-light-theme') {
      options = {};
    } else {
      options = {
        legend: {
          labels: {
            fontColor: 'white',
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'white',
              },
              gridLines: {
                color: 'rgba(255,255,255,0.1)'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'white',
              },
              gridLines: {
                color: 'rgba(255,255,255,0.1)'
              }
            }
          ]
        },
        plugins: {
          datalabels: {
            color: 'white',
          }
        }
      };
    }
    this.themeService.setColorschemesOptions(options);
  }

  @ViewChild('tabGroup') tabGroup: MatTabGroup;
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

  ngOnInit() {
    this.subs.push(
      this.route.fragment.subscribe(r => {
        if (this.tabElements) {
          const index = this.tabLabels.indexOf(r);
          if (index !== -1) {
            this.tabGroup.selectedIndex = index;
          }
        }
      }));
  }

  ngAfterViewInit(): void {
    this.tabLabels = this.tabElements.map(r => r.nativeElement.getAttribute('label').replace(/ /g, ''));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  updateRoute(index: number) {
    const label = this.tabLabels[index];
    this.router.navigate([], { fragment: label });
  }
}
