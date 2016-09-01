import { NgModule } from '@angular/core';

import { BaseChartComponent, Color } from './charts.ts';

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
