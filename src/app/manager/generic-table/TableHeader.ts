export class TableHeader {
    private _firstColumn: string = '';
    private _secondColumn: string = '';
    private _thirdColumn: string = '';
    private _fouthColumn: string = '';


    constructor(firstColumn: string, secondColumn: string, thirdColumn: string, fouthColumn: string) {
        this._firstColumn = firstColumn;
        this._secondColumn = secondColumn;
        this._thirdColumn = thirdColumn;
        this._fouthColumn = fouthColumn;
    }


    public get firstColumn(): string {
        return this._firstColumn;
    }

    public set firstColumn(value: string) {
        this._firstColumn = value;
    }

    public get secondColumn(): string {
        return this._secondColumn;
    }

    public set secondColumn(value: string) {
        this._secondColumn = value;
    }

    public get thirdColumn(): string {
        return this._thirdColumn;
    }

    public set thirdColumn(value: string) {
        this._thirdColumn = value;
    }

    public get fouthColumn(): string {
        return this._fouthColumn;
    }

    public set fouthColumn(value: string) {
        this._fouthColumn = value;
    }


}
