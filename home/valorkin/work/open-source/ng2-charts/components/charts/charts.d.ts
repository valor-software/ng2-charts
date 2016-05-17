import { OnDestroy, OnInit, OnChanges, EventEmitter, ElementRef } from '@angular/core';
export declare class BaseChartComponent implements OnDestroy, OnChanges, OnInit {
    static defaultColors: Array<number[]>;
    data: number[] | Array<number[]>;
    datasets: any[];
    labels: Array<any>;
    options: any;
    chartType: string;
    colors: Array<any>;
    legend: boolean;
    chartClick: EventEmitter<any>;
    chartHover: EventEmitter<any>;
    private ctx;
    private cvs;
    private parent;
    private chart;
    private initFlag;
    private element;
    constructor(element: ElementRef);
    ngOnInit(): any;
    ngOnChanges(): any;
    ngOnDestroy(): any;
    getChartBuilder(ctx: any): any;
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
export declare const CHART_DIRECTIVES: Array<any>;
