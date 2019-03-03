import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { DataSeries, chartColors } from './models/data-series';
import * as annotationsPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        id: 'Oil',
        type: 'linear',
        ticks: {
          min: 50,
          max: 150,
        },
        scaleLabel: {
          display: true,
          labelString: 'Oil',
        },
      }, {
        id: 'Water',
        type: 'linear',
        position: 'right',
        ticks: {
          min: 0,
          max: 30,
        },
        scaleLabel: {
          display: true,
          labelString: 'Water',
        },
      }]
    },
    tooltips: {
      mode: 'index',
      position: 'nearest',
      intersect: false,
    },
    animation: {
      duration: 0,
    },
    hover: {
      intersect: false,
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'Oil',
          value: '122',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'Caution - 122\u00b0F'
          }
        },
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'Oil',
          value: '131',
          yAxisID: 'Oil',
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Warning - 131\u00b0F'
          }
        },
        {
          type: 'box',
          yScaleID: 'Oil',
          yMin: 104,
          yMax: 120.2,
          backgroundColor: 'rgba(0,255,0,0.15)',
          borderColor: 'rgba(0,255,0,0.05)',
          borderWidth: 0,
        },
        {
          type: 'box',
          yScaleID: 'Water',
          yMin: 9,
          yMax: 12,
          backgroundColor: 'rgba(70,70,255,0.15)',
          borderColor: 'rgba(70,70,255,0.05)',
          borderWidth: 0,
        },
      ]
    }
  };
  public barChartLabels: string[] = [];
  public barChartData = [];
  public barChartDataTemp = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartColors;

  @ViewChild(BaseChartDirective) ch: BaseChartDirective;

  dataSeries: DataSeries[] = [
    {
      index: 0,
      axisId: 'Oil',
      colorName: 'orange',
      label: 'Oil Temp.',
      units: 'fahrenheit',
      activeInBypassMode: true,
    },
    {
      index: 1,
      axisId: 'Water',
      colorName: 'green',
      label: 'Water Temp.',
      units: 'celsius',
      activeInBypassMode: true,
    },
  ];

  constructor() {
    BaseChartDirective.registerPlugin(annotationsPlugin);
    this.refreshDataSeries();
  }

  ngOnInit() { }

  refreshDataSeries() {
    // This is an ugly hack in ng2-charts, line colors will not work without this:
    this.barChartColors = this.dataSeries.map(r => ({
      backgroundColor: chartColors[r.colorName]
    }));

    this.barChartData = this.dataSeries.map(r => ({
      data: [],
      label: r.label,
      yAxisID: r.axisId,
      pointRadius: 3,
      pointBorderWidth: 1,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 2,
      pointHitRadius: 1,
      borderWidth: r.axisId === 'Oil' ? 4 : 1,
      fill: false,
      borderColor: chartColors[r.colorName], // ...and this...
    }));

    this.barChartDataTemp = this.dataSeries.map(r => ({
      data: [],
      label: r.label,
    }));

    this.barChartLabels = [
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00'
    ];

    this.barChartData[0].data = [
      50, 65, 68, 89, 92, 99, 108, 122, 130
    ];

    this.barChartData[1].data = [
      5, 13, 15.6, 16.2, 18.4, 19.8, 22, 24.4, 26
    ];
  }
}
