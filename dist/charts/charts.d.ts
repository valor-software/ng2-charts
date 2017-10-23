import { OnDestroy, OnInit, OnChanges, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
export declare class BaseChartDirective implements OnDestroy, OnChanges, OnInit {
    static defaultColors: Array<number[]>;
    data: number[] | any[];
    datasets: any[];
    labels: Array<any>;
    options: any;
    chartType: string;
    colors: Array<any>;
    legend: boolean;
    chartClick: EventEmitter<any>;
    chartHover: EventEmitter<any>;
    ctx: any;
    chart: any;
    private cvs;
    private initFlag;
    private element;
    constructor(element: ElementRef);
    ngOnInit(): any;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): any;
    getChartBuilder(ctx: any): any;
    private updateChartData(newDataValues);
    private getDatasets();
    private refresh();
}
export interface Color {
    backgroundColor?: string | string[];
    borderWidth?: number | number[];
    borderColor?: string | string[];
    borderCapStyle?: string;
    borderDash?: number[];
    borderDashOffset?: number;
    borderJoinStyle?: string;
    pointBorderColor?: string | string[];
    pointBackgroundColor?: string | string[];
    pointBorderWidth?: number | number[];
    pointRadius?: number | number[];
    pointHoverRadius?: number | number[];
    pointHitRadius?: number | number[];
    pointHoverBackgroundColor?: string | string[];
    pointHoverBorderColor?: string | string[];
    pointHoverBorderWidth?: number | number[];
    pointStyle?: string | string[];
    hoverBackgroundColor?: string | string[];
    hoverBorderColor?: string | string[];
    hoverBorderWidth?: number;
}
export interface Colors extends Color {
    data?: number[];
    label?: string;
}
export declare class ChartsModule {
}
