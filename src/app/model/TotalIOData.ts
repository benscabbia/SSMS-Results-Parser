export class TotalIOData {

    private _scanCount: number = -1;
    private _logicalReads: number = -1;
    private _physicalReads: number = -1;
    private _readAheadReads: number = -1;
    private _lobLogicalReads: number = -1;
    private _lobPhysicalReads: number = -1;
    private _lobReadAheadReads: number = -1;


    public get scanCount(): number {
        return this._scanCount;
    }

    public set scanCount(value: number) {
        this._scanCount = value;
    }

    public get logicalReads(): number {
        return this._logicalReads;
    }

    public set logicalReads(value: number) {
        this._logicalReads = value;
    }

    public get physicalReads(): number {
        return this._physicalReads;
    }

    public set physicalReads(value: number) {
        this._physicalReads = value;
    }

    public get readAheadReads(): number {
        return this._readAheadReads;
    }

    public set readAheadReads(value: number) {
        this._readAheadReads = value;
    }

    public get lobLogicalReads(): number {
        return this._lobLogicalReads;
    }

    public set lobLogicalReads(value: number) {
        this._lobLogicalReads = value;
    }

    public get lobPhysicalReads(): number {
        return this._lobPhysicalReads;
    }

    public set lobPhysicalReads(value: number) {
        this._lobPhysicalReads = value;
    }

    public get lobReadAheadReads(): number {
        return this._lobReadAheadReads;
    }

    public set lobReadAheadReads(value: number) {
        this._lobReadAheadReads = value;
    }
}
