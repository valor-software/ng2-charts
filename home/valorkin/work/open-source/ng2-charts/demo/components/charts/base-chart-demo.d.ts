export declare class BaseChartDemoComponent {
    lineChartData: Array<any>;
    lineChartLabels: Array<any>;
    lineChartType: string;
    pieChartType: string;
    pieChartLabels: string[];
    pieChartData: number[];
    randomizeType(): void;
    chartClicked(e: any): void;
    chartHovered(e: any): void;
}
