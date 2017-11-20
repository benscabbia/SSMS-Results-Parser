import { InputSelector } from "./inputSelector.enum";
import { InputData } from "./inputData";
import { InputTypeResults } from "./inputTypeResults";
import { InputType } from "./inputType.enum";

export class SSMSParser {
    static inputToProcess: InputData[];
    
     public static ProcessInput(inputA: string, inputB: string){
        this.inputToProcess = new Array<InputData>()
        if(inputA) this.inputToProcess.push(new InputData(inputA));
        if(inputB) this.inputToProcess.push(new InputData(inputB));

        this.Parse();
   }

    private static Parse(): any {
        
        for(let i = 0; i<this.inputToProcess.length; i++){
            if(!this.inputToProcess[i].hasSplitInput) continue;

            this.ParseSSMS(this.inputToProcess[i].splitInput);

        }
    
    }

    private static ParseSSMS(splitInput: string[]){
        for(let i=0; i<splitInput.length; i++){

            let result: InputTypeResults = this.GetInputType(splitInput[i]);

            

        }
    }

    private static GetInputType(input: string): InputTypeResults{

        if(input.contains("SQL Server parse and compile time") ||
           input.contains("SQL Server Execution Times"))    
        {
            return new InputTypeResults(InputType.StatisticsTimeText, input);
        }
        if(input.contains("CPU time") && input.contains("elapsed time")){
            return new InputTypeResults(InputType.StatisticsTimeData, input);            
        }
     
    }
    


}