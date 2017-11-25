import { InputType } from "./inputType.enum";
import { IData } from "./IData.interface";

export abstract class ParsedData implements IData {
    private _inputType: InputType;
    private _data: string;

    constructor(inputType: InputType, data: string){
        this._inputType = inputType;
        this._data = data;
        this.parseInput();
    }

    get InputType(): InputType {
        return this._inputType;
    }

    get Data(): string {
        return this._data;
    }

    protected abstract parseInput(): void;

    // getInputType: () => InputType;
    // getData: () => string;

}