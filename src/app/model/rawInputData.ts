export class RawInputData {

    private _hasSplitInput = false;
    private _input: string;
    private _splitInput: string[];

    constructor(input: string) {
        this._input = input;
        this.ParseInput();
    }

    get hasSplitInput(): boolean {
        return this._hasSplitInput;
    }

    get input(): string {
        return this._input;
    }

    get splitInput(): string[] {
        return this._splitInput;
    }

    private ParseInput() {
        if (this.input) {
            this._splitInput = this.input
                .split('\n')
                .map(current => current.trim())
                .filter(Boolean);
        }

        if (this.splitInput.length > 0) { this._hasSplitInput = true; }
    }
}
