import { BarData } from './barData';

export class BarChartModel {
    private _barChartLabels: string[];
    private _barChartType: string;
    private _barChartData: BarData;

    constructor(barChartData: BarData, barChartLabels: string[], barChartType?: string) {
        this._barChartData = barChartData;
        this.barChartLabels = barChartLabels;
        this.barChartType = barChartType;
        this.barChartType = barChartType ? barChartType : 'bar';
    }

    public get barChartLabels(): string[] {
        return this._barChartLabels;
    }

    public set barChartLabels(value: string[]) {
        this._barChartLabels = value;
    }

    public get barChartType(): string {
        return this._barChartType;
    }

    public set barChartType(value: string) {
        this._barChartType = value;
    }

    public get barChartData(): BarData {
        return this._barChartData;
    }

    public set barChartData(value: BarData) {
        this._barChartData = value;
    }

}
