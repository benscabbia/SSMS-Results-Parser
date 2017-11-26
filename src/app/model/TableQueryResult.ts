import {ParsedTableRowsAffectedData} from './ParsedTableRowsAffectedData';
import {ParsedTableData} from './ParsedTableData';
import {ParsedStatisticsTimeData} from './ParsedStatisticsTimeData';
import {ParsedStatisticsIOData} from './ParsedStatisticsIOData';
/*
    SSMS Output Structure: 
    1. Table Headers 1..1
    2. Table Data 1..*
    3. N Rows Affected Msg
    4. StatsIO for table
    5. Exec Times msg
    6. Exec Times data
*/
export class TableQueryResult {
    private _parsedStatisticsIOData: ParsedStatisticsIOData;
    private _parsedStatisticsTimeData: ParsedStatisticsTimeData;
	private _parsedTableRowsAffectedData: ParsedTableRowsAffectedData;
	
	private _parsedTableName: string;
    private _parsedTableHeader: ParsedTableData;	
    private _parsedTableData: ParsedTableData[];

	constructor() {
		this._parsedTableData = [];		
	}

	public get parsedStatisticsIOData(): ParsedStatisticsIOData {
		return this._parsedStatisticsIOData;
	}

	public set parsedStatisticsIOData(value: ParsedStatisticsIOData) {
        if(this._parsedStatisticsIOData) throw "IO Data already set";
		this._parsedStatisticsIOData = value;
	}

	public get parsedStatisticsTimeData(): ParsedStatisticsTimeData {
		return this._parsedStatisticsTimeData;
	}

	public set parsedStatisticsTimeData(value: ParsedStatisticsTimeData) {
        if(this._parsedStatisticsTimeData) throw "Exec Times Data already set";
		this._parsedStatisticsTimeData = value;
	}

	public get parsedTableRowsAffectedData(): ParsedTableRowsAffectedData {
		return this._parsedTableRowsAffectedData;
	}

	public set parsedTableRowsAffectedData(value: ParsedTableRowsAffectedData) {
        if(this._parsedTableRowsAffectedData) throw "N table rows affected already set";
		this._parsedTableRowsAffectedData = value;
	}


	public get parsedTableName(): string {
		return this._parsedTableName;
	}

	public set parsedTableName(value: string) {
        if(this._parsedTableName) throw "Table Name already set";		
		this._parsedTableName = value;
	}

	public get parsedTableHeader(): ParsedTableData {
		return this._parsedTableHeader;
	}

	public set parsedTableHeader(value: ParsedTableData) {
        if(this._parsedTableHeader) throw "Table Header already set";				
		this._parsedTableHeader = value;
	}

	public get parsedTableData(): ParsedTableData[] {
		return this._parsedTableData;
	}

	// public set parsedTableData(value: ParsedTableData[]) {
	// 	this._parsedTableData = value;
	// }
	public addParsedTableData(value: ParsedTableData){
		this._parsedTableData.push(value);
	}
    
}