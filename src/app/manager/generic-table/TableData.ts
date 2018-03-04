import { TableRowData } from './TableRowData';
import { TableHeader } from './TableHeader';

export class TableData {
    private _title: string;
    private _tableHeader: TableHeader;
    private _tableRowData: TableRowData[];
    private _panelClass: string;

    constructor(title: string, tableHeader: TableHeader, tableRowData: TableRowData[], panelClass: string) {
        this._title = title;
        this._tableHeader = tableHeader;
        this._tableRowData = tableRowData;
        this._panelClass = panelClass;
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

    public get panelClass(): string {
        return this._panelClass;
    }

    public set panelClass(value: string) {
        this._panelClass = value;
    }



}
