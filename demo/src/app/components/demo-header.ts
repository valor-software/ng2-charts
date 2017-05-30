import { Component } from '@angular/core';

let components = [
  {name: 'Line Chart', href: 'lineChart'},
  {name: 'Bar Chart', href: 'barChart'},
  {name: 'Doughnut Chart', href: 'doughnutChart'},
  {name: 'Radar Chart', href: 'radarChart'},
  {name: 'Pie Chart', href: 'pieChart'},
  {name: 'Polar Area Chart', href: 'polarAreaChart'},
  {name: 'Dynamic Chart', href: 'baseChart'}
];

@Component({
  selector: 'demo-header',
  template: `
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
            <a role="button" class="nav-link dropdown-toggle" dropdownToggle>Directives <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li *ngFor="let comp of components">
               <a class="dropdown-item" href="{{prefix}}#{{comp.href}}">{{comp.name}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <nav class="visible-xs hidden-md-up">
        <ul class="nav nav-pills nav-stacked scrollable-menu" [collapse]="!isCollapsed" (click)="isCollapsed = !isCollapsed; true">
          <li *ngFor="let comp of components" class="nav-item">
            <a class="dropdown-item" href="{{prefix}}#{{comp.href}}">{{comp.name}}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>`
})
export class DemoHeaderComponent {
  isCollapsed: boolean;
  public components:Array<any> = components;
  public prefix:string = '';
}
