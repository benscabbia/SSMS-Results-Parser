import { ParsedData } from "./ParsedData.abstract";
import { RegexExpressions } from "./RegexExpressions";

export class ParsedStatisticsTimeData extends ParsedData {
    
    private _CPUTime: number;
    private _elapsedTime: number;
    
    protected parseInput(): void {
        this._CPUTime = Number.parseInt(this.TryGetValues(this.Data, RegexExpressions.CPUTimeRegex));        
        this._elapsedTime = Number.parseInt(this.TryGetValues(this.Data, RegexExpressions.ElapsedTimeRegex));        
    }
   

	public get CPUTime(): number  {
		return this._CPUTime;
	}

	public get elapsedTime(): number  {
		return this._elapsedTime;
	}
    

}