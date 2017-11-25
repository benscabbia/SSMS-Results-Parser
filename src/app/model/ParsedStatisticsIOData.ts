import {AppConfigService} from '../services/appConfig.service';
import { ParsedData } from "./ParsedData.abstract";
import { RegexExpressions } from "./RegexExpressions";

export class ParsedStatisticsIOData extends ParsedData {
    
    /*
     Table 'Schools'. Scan count 1, logical reads 2, physical reads 0, read-ahead reads 0, 
     lob logical reads 0, lob physical reads 0, lob read-ahead reads 0.
    */
    private _scanCount: number = 0;
    private _logicalReads: number = 0;
    private _physicalReads: number = 0;
    private _readAheadReads: number = 0;
    private _lobLogicalReads: number = 0;
    private _lobReadAheadReads: number = 0;

    protected parseInput(): void {
        this._scanCount = Number.parseInt(RegexExpressions.ScanCountRegex.exec(this.Data)[0]);
        this._logicalReads = Number.parseInt(RegexExpressions.LobLogicalReadsRegex.exec(this.Data)[0]);
        this._physicalReads = Number.parseInt(RegexExpressions.PhysicalReadsRegex.exec(this.Data)[0]);
        this._readAheadReads = Number.parseInt(RegexExpressions.ReadAheadReadsRegex.exec(this.Data)[0]);
        this._lobLogicalReads = Number.parseInt(RegexExpressions.LobLogicalReadsRegex.exec(this.Data)[0]);
        this._lobReadAheadReads = Number.parseInt(RegexExpressions.LobReadAheadRegex.exec(this.Data)[0]);

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
    

    
    
    
}