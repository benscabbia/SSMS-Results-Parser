import {RegexExpressions} from './RegexExpressions';
import { ParsedData } from "./ParsedData.abstract";

export class ParsedTableData extends ParsedData {

    // Used for both the header or data
    private _tableData: string;

    protected parseInput(): void {
        this._tableData = this.TryGetValues(this.Data, RegexExpressions.TableDataRegex);    
    }

    public get tableData(): string {
		return this._tableData;
	}
    


   

    // getInputType: () => InputType;
    // getData: () => string;

}