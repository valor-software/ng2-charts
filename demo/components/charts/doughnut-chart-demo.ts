import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';

import {CHART_DIRECTIVES} from '../../../ng2-charts';

// webpack html imports
let template = require('./doughnut-chart-demo.html');

@Component({
  selector: 'doughnut-chart-demo',
  template: template,
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class DoughnutChartDemo {

  constructor() {
    console.log('doughnut demo');
  }

  // events
  chartClicked(e:any) {
    console.log(e);
  }

  chartHovered(e:any) {
    console.log(e);
  }

  // Doughnut
  private doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  private doughnutChartData = [350, 450, 100];
  private doughnutChartType = 'Doughnut';

}
