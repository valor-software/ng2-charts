/// <reference path="../tsd.d.ts" />
import {Component, View, bootstrap, NgClass} from 'angular2/angular2';

import {Ng2ChartsConfig, Ng2ChartsTheme} from '../components/index';

let w:any = window;
if (w && w.__theme === 'bs4') {
  Ng2ChartsConfig.theme = Ng2ChartsTheme.BS4;
}


import {ChartsSection} from './components/charts-section';

// import {DemoHeader} from './components/demo-header';

let gettingStarted = require('./getting-started.md');

@Component({
  selector: 'app'
})
@View({
  template: `
  <!--<demo-header>Loading header</demo-header>-->

  <main class="bd-pageheader">
    <div class="container">
      <h1>ng2-charts</h1>
      <p>Native Angular2 directives for Charts</p>
      <a class="btn btn-primary" href="https://github.com/valor-software/ng2-charts">View on GitHub</a>
      <div class="row">
        <!--<div class="col-lg-1"><iframe src="https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-bootstrap&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
        <div class="col-lg-1"><iframe src="https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-bootstrap&type=fork&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>-->
      </div>
    </div>
  </main>

  <div class="container">
    <div class="col-md-12 card card-block panel panel-default">
      <selection>
          <h1>ng2-charts available with:
          <a class="btn btn-default btn-secondary btn-lg" [ng-class]="{active: isBs3}" href="./">Bootstrap 3</a>
          <a class="btn btn-default btn-secondary btn-lg" [ng-class]="{active: !isBs3}" href="./index-bs4.html">Bootstrap 4</a>
          </h1>
      </selection>
    </div>
    <br>
    <section id="getting-started">${gettingStarted}</section>

    <charts-section class="col-md-12"></charts-section>
  </div>

  </div>
  <footer class="footer">
    <div class="container">
      <p class="text-muted text-center"><a href="https://github.com/valor-software/ng2-charts">ng2-charts</a> is maintained by <a href="https://github.com/valor-software">valor-software</a>.</p>
    </div>
  </footer>
  `,
  directives: [
    NgClass,
    // DemoHeader,

    ChartsSection
  ]
})
export class Demo {
  private isBs3:boolean = Ng2ChartsConfig.theme === Ng2ChartsTheme.BS3;
}

bootstrap(Demo);
