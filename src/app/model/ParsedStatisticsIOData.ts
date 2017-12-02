import {AppConfigService} from '../services/appConfig.service';
import { ParsedData } from "./ParsedData.abstract";
import { RegexExpressions } from "./RegexExpressions";

export class ParsedStatisticsIOData extends ParsedData {
    
    /*
     Table 'Schools'. Scan count 1, logical reads 2, physical reads 0, read-ahead reads 0, 
     lob logical reads 0, lob physical reads 0, lob read-ahead reads 0.
    */
    private _scanCount: number;
    private _logicalReads: number;
    private _physicalReads: number;
    private _readAheadReads: number;
    private _lobLogicalReads: number;
    private _lobReadAheadReads: number;
    private _tableName: string;

    protected parseInput(): void {

        this._scanCount = Number.parseInt(this.TryGetValues(this.Data, RegexExpressions.ScanCountRegex));
        this._logicalReads = Number.parseInt(this.TryGetValues(this.Data, RegexExpressions.LogicalReadsRegex));
        this._physicalReads = Number.parseInt(this.TryGetValues(this.Data, RegexExpressions.PhysicalReadsRegex));
        this._readAheadReads = Number.parseInt(this.TryGetValues(this.Data, RegexExpressions.ReadAheadReadsRegex));
        this._lobLogicalReads = Number.parseInt(this.TryGetValues(this.Data, RegexExpressions.LobLogicalReadsRegex));
        this._lobReadAheadReads = Number.parseInt(this.TryGetValues(this.Data, RegexExpressions.LobReadAheadRegex));
        this._tableName = this.TryGetValues(this.Data, RegexExpressions.TableNameRegex, 1, null);        
    }
	public get scanCount(): number  {
		return this._scanCount;
	}

	public get physicalReads(): number  {
		return this._physicalReads;
	}

	public get lobLogicalReads(): number  {
		return this._lobLogicalReads;
	}

	public get logicalReads(): number  {
		return this._logicalReads;
	}

	public get readAheadReads(): number  {
		return this._readAheadReads;
	}

	public get lobReadAheadReads(): number  {
		return this._lobReadAheadReads;
	}

	public get tableName(): string {
		return this._tableName;
	}
    

    
    
    
}