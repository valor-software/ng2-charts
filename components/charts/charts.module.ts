import { NgModule } from '@angular/core';

import { BaseChartComponent } from './charts.ts';

@NgModule({
    declarations: [
        BaseChartComponent
    ],
    exports: [
        BaseChartComponent
    ],
    imports: [

    ]
})
export class ChartsModule {}
