import { InputSelector } from "./inputSelector.enum";
import { InputData } from "./inputData";

export class SSMSParser {
    static inputToProcess: InputData[];
    
     public static ProcessInput(inputA: string, inputB: string){
        this.inputToProcess = new Array<InputData>()
        if(inputA) this.inputToProcess.push(new InputData(inputA));
        if(inputB) this.inputToProcess.push(new InputData(inputB));

        this.Parse();
   }

    private static Parse(): any {
        
        for(let i =0; i<this.inputToProcess.length; i++){
            if(!this.inputToProcess[i].hasSplitInput) return;

            this.ParseSSMS(this.inputToProcess[i].splitInput);

        }
    
    }

    private static ParseSSMS(splitInput: string[]){
        for(let i=0; i<splitInput.length; i++){
            //let currentString = GetInputType(splitInput[i]);

            

        }
    }

    private static GetInputType(input: string){


    }
    


}