import { TableRowData } from './TableRowData';
import { TableHeader } from './TableHeader';

export class TableData {
    private _title: string;
    private _tableHeader: TableHeader;
    private _tableRowData: TableRowData[];


    constructor(title: string, tableHeader: TableHeader, tableRowData: TableRowData[]) {
        this._title = title;
        this._tableHeader = tableHeader;
        this._tableRowData = tableRowData;
    }


    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get tableHeader(): TableHeader {
        return this._tableHeader;
    }

    public set tableHeader(value: TableHeader) {
        this._tableHeader = value;
    }

    public get tableRowData(): TableRowData[] {
        return this._tableRowData;
    }

    public set tableRowData(value: TableRowData[]) {
        this._tableRowData = value;
    }


}
