import { RadarData } from './radarData';

export class RadarChartModel {
    private _radarChartLabels: string[];
    private _radarChartType: string;
    private _radarChartData: RadarData;


    constructor(radarChartData: RadarData, radarChartLabels: string[], radarCharType?: string) {
        this._radarChartData = radarChartData;
        this._radarChartLabels = radarChartLabels;
        this._radarChartType = radarCharType ? radarCharType : 'radar';
    }

    public get radarChartLabels(): string[] {
        return this._radarChartLabels;
    }

    public set radarChartLabels(value: string[]) {
        this._radarChartLabels = value;
    }

    public get radarChartType(): string {
        return this._radarChartType;
    }

    public get radarChartData(): RadarData {
        return this._radarChartData;
    }

    public set radarChartData(value: RadarData) {
        this._radarChartData = value;
    }

}
