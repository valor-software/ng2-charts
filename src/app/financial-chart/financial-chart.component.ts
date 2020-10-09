import { Component, OnInit, ViewChild } from '@angular/core';
import 'dist/chartjs-chart-financial/chartjs-chart-financial';
// import 'chartjs-adapter-luxon';
import { BaseChartDirective } from 'ng2-charts';
import { DateTime } from 'luxon';
import { IChartOptions } from 'chart.js';

@Component({
  selector: 'app-financial-chart',
  templateUrl: './financial-chart.component.html',
  styleUrls: [ './financial-chart.component.css' ]
})
export class FinancialChartComponent implements OnInit {
  barCount = 60;
  initialDateStr = '01 Apr 2017 00:00 Z';

  public financialChartData = [
    {
      label: 'CHRT - Chart.js Corporation',
      data: this.getRandomData(this.initialDateStr, this.barCount),
      barThickness: 10
    }
  ];
  public financialChartOptions: IChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public financialChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public financialChartLegend = true;
  public financialChartType = 'candlestick';
  public financialChartPlugins = [];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective<'line'>;

  constructor() {
  }

  ngOnInit(): void {
  }

  randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  randomBar(date: DateTime, lastClose: number): { c: number; t: DateTime; h: number; l: number; o: number } {
    const open = this.randomNumber(lastClose * 0.95, lastClose * 1.05);
    const close = this.randomNumber(open * 0.95, open * 1.05);
    const high = this.randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
    const low = this.randomNumber(Math.min(open, close) * 0.9, Math.min(open, close));
    return {
      t: date,
      o: open,
      h: high,
      l: low,
      c: close
    };
  }

  getRandomData(dateStr: string, count: number): { c: number; t: DateTime; h: number; l: number; o: number }[] {
    let date = DateTime.fromRFC2822(dateStr);
    const data = [ this.randomBar(date, 30) ];
    while (data.length < count) {
      date = date.plus({ days: 1 });
      if (date.weekday <= 5) {
        data.push(this.randomBar(date, data[data.length - 1].c));
      }
    }
    return data;
  }

  update(): void {
    // candlestick vs ohlc
    this.financialChartType = this.financialChartType === 'candlestick' ? 'ohlc' : 'candlestick';
  }
}
