import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {NgClass} from 'angular2/common';

import {ChartsSectionComponent} from './components/charts-section';
import {DemoHeaderComponent} from './components/demo-header';
import {global} from 'angular2/src/facade/lang';
let gettingStarted = require('./getting-started.md');

@Component({
  selector: 'app',
  template: `
  <demo-header>Loading header</demo-header>

  <main class="bd-pageheader">
    <div class="container">
      <h1>ng2-charts</h1>
      <p>Native Angular2 directives for Charts</p>
      <a class="btn btn-primary" href="https://github.com/valor-software/ng2-charts">View on GitHub</a>
      <div class="row">
      <div class="col-lg-1"><iframe src="https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-charts&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
      <div class="col-lg-1"><iframe src="https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-charts&type=fork&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
      </div>
    </div>
  </main>

  <div class="container">
    <section id="getting-started">${gettingStarted}</section>

    <charts-section class="col-md-12"></charts-section>
  </div>

  <footer class="footer">
    <div class="container">
      <p class="text-muted text-center"><a href="https://github.com/valor-software/ng2-charts">ng2-charts</a> is maintained by <a href="https://github.com/valor-software">valor-software</a>.</p>
    </div>
  </footer>
  `,
  directives: [
    NgClass,
    DemoHeaderComponent,
    ChartsSectionComponent
  ]
})
export class DemoComponent {
  public constructor() {
    console.log('global', global as any);
  }
}

bootstrap(DemoComponent);
