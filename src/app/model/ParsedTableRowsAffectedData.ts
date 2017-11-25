import { ParsedData } from "./ParsedData.abstract";
import { RegexExpressions } from "./RegexExpressions";

export class ParsedTableRowsAffectedData extends ParsedData {
    private _rowsAffected: number = 0;
    protected parseInput(): void {
        this._rowsAffected = Number.parseInt(RegexExpressions.RowsAffectedRegex.exec(this.Data)[0]);        
    }

    public get rowsAffected(): number {
        return this._rowsAffected;
    }


}