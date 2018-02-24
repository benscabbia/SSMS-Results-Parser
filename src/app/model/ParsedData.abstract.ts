import {AppConfigService} from '../services/appConfig.service';
import {DataService} from '../services/data.service';
import { InputType } from './inputType.enum';
import { IData } from './IData.interface';

export abstract class ParsedData implements IData {
    private _inputType: InputType;
    private _data: string;

    constructor(inputType: InputType, data: string) {
        this._inputType = inputType;
        this._data = data;
        this.parseInput();
    }

    public get InputType(): InputType {
        return this._inputType;
    }

    public get Data(): string {
        return this._data;
    }


    public TryGetValues(data: string, regex: RegExp, indexer: number = 1, defaultValue: any = 0): any {

        if (regex.test(data)) {
            const result = regex.exec(data);
            if (result && result[indexer]) {
                return result[indexer];
            } else {
                return defaultValue;
            }
        }

    }

    protected abstract parseInput(): void;
}
