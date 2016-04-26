import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {Collapse, DROPDOWN_DIRECTIVES, Ng2BootstrapConfig, Ng2BootstrapTheme} from 'ng2-bootstrap/ng2-bootstrap';

let components = [
  { name: 'Line Chart', href: 'lineChart' },
  { name: 'Bar Chart', href: 'barChart' },
  { name: 'Radar Chart', href: 'radarChart' },
  { name: 'Pie Chart', href: 'pieChart' },
  { name: 'Polar Area Chart', href: 'polarAreaChart' },
  { name: 'Doughnut Chart', href: 'doughnutChart' },
  { name: 'Dynamic Chart', href: 'baseChart' }
];

let template = `
    <header class="navbar navbar-default navbar-fixed-top navbar-inner bg-faded">
    <div class="container">
      <div class="navbar-header hidden-md-up">
        <button type="button" class="navbar-toggle navbar-toggler pull-right" (click)="isCollapsed = !isCollapsed">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand visible-xs" href="{{prefix}}#">ng2-charts</a>
      </div>
      <nav class="hidden-xs hidden-xs-down">
        <ul class="nav navbar-nav">
          <li class="nav-item"><a href="{{prefix}}#top" role="button" class="navbar-brand">ng2-charts</a></li>
          <li class="nav-item dropdown" dropdown>
            <a role="button" class="nav-link dropdown-toggle" dropdown-toggle>Directives <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li *ngFor="#comp of components">
               <a class="dropdown-item" href="{{prefix}}#{{comp.href}}">{{comp.name}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <nav class="visible-xs hidden-md-up">
        <ul class="nav nav-pills nav-stacked scrollable-menu" [collapse]="!isCollapsed" (click)="isCollapsed = !isCollapsed; true">
          <li *ngFor="#comp of components" class="nav-item">
            <a class="dropdown-item" href="{{prefix}}#{{comp.href}}">{{comp.name}}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>`;

@Component({
  selector: 'demo-header',
  template: template,
  directives: [
    NgFor,
    Collapse,
    DROPDOWN_DIRECTIVES
  ]
})
export class DemoHeader {
  public components:Array<any> = components;
  public prefix:string;

  public constructor() {
    this.prefix = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS4 ? 'index-bs4.html' : '';
  }
}
