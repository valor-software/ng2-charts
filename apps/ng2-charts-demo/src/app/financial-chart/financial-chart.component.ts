import { Component, ViewChild } from '@angular/core';
import 'chartjs-adapter-date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { enUS } from 'date-fns/locale';
import { add, parseISO } from 'date-fns';
import {
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,
} from 'chartjs-chart-financial';
import { MatButton } from '@angular/material/button';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-financial-chart',
  templateUrl: './financial-chart.component.html',
  standalone: true,
  imports: [MarkdownComponent, MatButton, BaseChartDirective],
})
export class FinancialChartComponent {
  barCount = 60;
  initialDateStr = '2017-04-01T00:00:00';

  public financialChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'CHRT - Chart.js Corporation',
        data: this.getRandomData(this.initialDateStr, this.barCount),
      },
    ],
  };

  public financialChartOptions: ChartConfiguration['options'] = {
    animation: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        time: {
          unit: 'day',
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
        ticks: {
          source: 'auto',
        },
      },
    },
    borderColor: 'black',
    backgroundColor: 'rgba(255,0,0,0,0.3)',
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public financialChartType: ChartType = 'candlestick';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() {
    Chart.register(
      CandlestickController,
      OhlcController,
      CandlestickElement,
      OhlcElement,
    );
  }

  randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  randomBar(
    date: Date,
    lastClose: number,
  ): { c: number; x: number; h: number; l: number; o: number } {
    const open = this.randomNumber(lastClose * 0.95, lastClose * 1.05);
    const close = this.randomNumber(open * 0.95, open * 1.05);
    const high = this.randomNumber(
      Math.max(open, close),
      Math.max(open, close) * 1.1,
    );
    const low = this.randomNumber(
      Math.min(open, close) * 0.9,
      Math.min(open, close),
    );
    return {
      x: +date,
      o: open,
      h: high,
      l: low,
      c: close,
    };
  }

  getRandomData(
    dateStr: string,
    count: number,
  ): { c: number; x: number; h: number; l: number; o: number }[] {
    let date = parseISO(dateStr);
    const data = [this.randomBar(date, 30)];
    while (data.length < count) {
      date = add(date, { days: 1 });
      if (date.getDay() <= 5) {
        data.push(this.randomBar(date, data[data.length - 1].c));
      }
    }
    return data;
  }

  update(): void {
    // candlestick vs ohlc
    this.financialChartType =
      this.financialChartType === 'candlestick' ? 'ohlc' : 'candlestick';
  }
}
