import { OnDestroy, OnInit, ElementRef } from 'angular2/core';
export declare class Charts {
    constructor(element: ElementRef);
}
export declare class BaseChart implements OnInit, OnDestroy {
    private element;
    private ctx;
    private cvs;
    private parent;
    private chart;
    private _data;
    private labels;
    private options;
    private _chartType;
    private series;
    private colours;
    private legend;
    private legendTemplate;
    private initFlag;
    private chartClick;
    private chartHover;
    private defaultsColours;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private data;
    private chartType;
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
