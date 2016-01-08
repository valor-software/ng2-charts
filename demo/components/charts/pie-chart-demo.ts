import {Component, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';

import {CHART_DIRECTIVES} from '../../../ng2-charts';

// webpack html imports
let template = require('./pie-chart-demo.html');

@Component({
  selector: 'pie-chart-demo',
  template: template,
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class PieChartDemo {

  constructor() {
    console.log('pie demo');
  }

  // events
  chartClicked(e:any) {
    console.log(e);
  }

  chartHovered(e:any) {
    console.log(e);
  }

  // Pie
  private pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  private pieChartData = [300, 500, 100];
  private pieChartType = 'Pie';

}
