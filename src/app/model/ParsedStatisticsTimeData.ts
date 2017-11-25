import { ParsedData } from "./ParsedData.abstract";
import { RegexExpressions } from "./RegexExpressions";

export class ParsedStatisticsTimeData extends ParsedData {
    
    private _CPUTime: number = 0;
    private _elapsedTime: number = 0;
    protected parseInput(): void {
        this._CPUTime = Number.parseInt(RegexExpressions.CPUTimeRegex.exec(this.Data)[0]);        
        this._elapsedTime = Number.parseInt(RegexExpressions.ElapsedTimeRegex.exec(this.Data)[0]);        
    }
   

	public get CPUTime(): number  {
		return this._CPUTime;
	}

	public get elapsedTime(): number  {
		return this._elapsedTime;
	}
    

}