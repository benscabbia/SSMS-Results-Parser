import { ParsedData } from "./ParsedData.abstract";
import { RegexExpressions } from "./RegexExpressions";

export class ParsedTableRowsAffectedData extends ParsedData {
    private _rowsAffected: number = 0;
    protected parseInput(): void {
        this._rowsAffected = Number.parseInt(this.TryGetValues(this.Data, RegexExpressions.RowsAffectedRegex));
    }

    public get rowsAffected(): number {
        return this._rowsAffected;
    }


}