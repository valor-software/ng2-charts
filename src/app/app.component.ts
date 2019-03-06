import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {
    this.selectedTheme = 'ng2-charts-demo-light-theme';
  }

  ngOnInit() { }
}
