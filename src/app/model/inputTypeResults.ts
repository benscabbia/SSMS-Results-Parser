import { InputType } from "./inputType.enum";

export class InputTypeResults {
    private _inputType: InputType;
    private _data: string;
    
    constructor(inputType: InputType, data: string){
        this._inputType = inputType;
        this._data = data;
    }

    
    get inputType(): InputType {
        return this._inputType;
    }
    
    get data(): string {
        return this._data;
    }



}