export class RadarData {
    private _data: number[];
    private _label: string;
    private _lineTension: number = 0.2;

    constructor (data: number[], label: string, lineTension?: number) {
        this._data = data;
        this._label = label;
        if (lineTension >= 0 && lineTension <= 1) {
            this._lineTension = lineTension;
        }
    }

    public get data(): number[] {
        return this._data;
    }

    public set data(value: number[]) {
        this._data = value;
    }

    public appendData(value: number[]) {
        this._data = this._data.concat(value);
    }

    public get label(): string {
        return this._label;
    }

    public set label(value: string) {
        this._label = value;
    }

    public get lineTension(): number {
        return this._lineTension;
    }

    public set lineTension(value: number) {
        this._lineTension = value;
    }

}
