import { OnDestroy, OnInit, OnChanges, ElementRef } from 'angular2/core';
export declare class Charts {
    constructor(element: ElementRef);
}
export declare class BaseChart implements OnInit, OnDestroy, OnChanges {
    private element;
    data: Array<any>;
    labels: Array<any>;
    options: any;
    chartType: string;
    series: Array<any>;
    colours: Array<any>;
    legend: boolean;
    private ctx;
    private cvs;
    private parent;
    private chart;
    private legendTemplate;
    private initFlag;
    private chartClick;
    private chartHover;
    private defaultsColours;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    setLegend(): void;
    getColour(colour: Array<number>): any;
    getRandomInt(min: any, max: any): any;
    rgba(colour: any, alpha: any): string;
    click(evt: any): void;
    hover(evt: any): void;
    getChartBuilder(ctx: any, data: Array<any>, options: any): any;
    getDataObject(label: string, value: any): any;
    getChartData(labels: any, dataObject: any): any;
    private refresh();
}
export declare const CHART_DIRECTIVES: Array<any>;
