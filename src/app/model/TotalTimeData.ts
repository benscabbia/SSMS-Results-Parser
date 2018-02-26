export class TotalTimeData {

    private _cpuTime: number = 0;
    private _elapsedTime: number = 0;


    public get cpuTime(): number {
        return this._cpuTime;
    }

    public set cpuTime(value: number) {
        this._cpuTime = value;
    }

    public get elapsedTime(): number {
        return this._elapsedTime;
    }

    public set elapsedTime(value: number) {
        this._elapsedTime = value;
    }
}
