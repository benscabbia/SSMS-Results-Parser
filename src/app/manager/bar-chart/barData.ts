export class BarData {
    private _data: number[];
    private _label: string;


    constructor(data: number[], label: string) {
        this._data = data;
        this._label = label;
    }

    public get data(): number[] {
        return this._data;
    }

    public set data(value: number[]) {
        this._data = value;
    }

    public get label(): string {
        return this._label;
    }

    public set label(value: string) {
        this._label = value;
    }

}


