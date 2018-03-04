export class TableRowData {
    private _dataType: string;
    private _query1: string;
    private _query2: string;
    private _best: string;
    private _class: string;

    constructor(dataType: string, query1: number, query2: number) {
        this._dataType = dataType;
        this._query1 = query1.toString();
        this._query2 = query2.toString();
        this._class = 'label ';

        if (query2 === -1) {
            this._best = 'N/A';
            this._class += 'label-default';
            this._query2 = '---';

            if (dataType === 'CPU Time' || dataType === 'Elapsed Time') {
                // barchart looks weird with -1
                this._query2 = '0';
            }
            return;
        }
        if (this._query1 < this._query2) {
            this._best = 'Query 1';
            this._class += 'label-danger';
        } else if (this._query2 < this._query1) {
            this._best = 'Query 2';
            this._class += 'label-primary';
        } else {
            this._best = 'Equiv';
            this._class += 'label-default';
        }
    }

    public get dataType(): string {
        return this._dataType;
    }

    public set dataType(value: string) {
        this._dataType = value;
    }

    public get query1(): string {
        return this._query1;
    }

    public set query1(value: string) {
        this._query1 = value;
    }

    public get query2(): string {
        return this._query2;
    }

    public set query2(value: string) {
        this._query2 = value;
    }

    public get best(): string {
        return this._best;
    }

    public set best(value: string) {
        this._best = value;
    }

    public get class(): string {
        return this._class;
    }

    public set class(value: string) {
        this._class = value;
    }


}
