import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ThemeService } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private pSelectedTheme = 'lala';
  public get selectedTheme() {
    return this.pSelectedTheme;
  }
  public set selectedTheme(value) {
    this.renderer.removeClass(this.document.body, this.pSelectedTheme);
    this.pSelectedTheme = value;
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
        }
      };
    }
    this.themeService.setColorschemesOptions(options);
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private themeService: ThemeService) {
    this.selectedTheme = 'ng2-charts-demo-dark-theme';
  }

  ngOnInit() { }
}
