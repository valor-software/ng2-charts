import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ChartsSectionComponent } from './components/charts-section';
import { DemoHeaderComponent } from './components/demo-header';
import { LineChartDemoComponent } from './components/charts/line-chart-demo';
import { BarChartDemoComponent } from './components/charts/bar-chart-demo';
import { DoughnutChartDemoComponent } from './components/charts/doughnut-chart-demo';
import { PieChartDemoComponent } from './components/charts/pie-chart-demo';
import { PolarAreaChartDemoComponent } from './components/charts/polar-area-chart-demo';
import { RadarChartDemoComponent } from './components/charts/radar-chart-demo';
import { BaseChartDemoComponent } from './components/charts/base-chart-demo';
import { ChartSectionComponent } from './components/chart-section.component';

import { TabsModule, CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    ChartSectionComponent,
    AppComponent,
    DemoHeaderComponent,
    ChartsSectionComponent,
    LineChartDemoComponent,
    BarChartDemoComponent,
    DoughnutChartDemoComponent,
    PieChartDemoComponent,
    PolarAreaChartDemoComponent,
    RadarChartDemoComponent,
    BaseChartDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ]
})
export class AppModule {
}
