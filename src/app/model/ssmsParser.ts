import { InputSource } from "./inputSource.enum";
import { RawInputData } from "./rawInputData";
import { InputType } from "./inputType.enum";
import * as Collections from 'typescript-collections';
import { ParsedStatisticsTimeData } from "./ParsedStatisticsTimeData";
import { ParsedTableRowsAffectedData } from "./ParsedTableRowsAffectedData";
import { ParsedTableData } from "./ParsedTableData";
import { ParsedStatisticsIOData } from "./ParsedStatisticsIOData";
import { ParsedStatisticsTimeText } from "./ParsedStatisticsTimeText";
import { IData } from "./IData.interface";

export class SSMSParser {
    static inputToProcess: RawInputData[];
    
     public static ProcessInput(inputA: string, inputB: string){
        this.inputToProcess = new Array<RawInputData>()
        if(inputA) this.inputToProcess.push(new RawInputData(inputA));
        if(inputB) this.inputToProcess.push(new RawInputData(inputB));

        this.Parse();
   }

    private static Parse(): any {
        
        for(let i = 0; i<this.inputToProcess.length; i++){
            if(!this.inputToProcess[i].hasSplitInput) continue;

            this.ParseSSMS(this.inputToProcess[i].splitInput);

        }
    
    }

    private static ParseSSMS(splitInput: string[]){
        let executionStack = new Collections.Stack<IData>();
        let executionStack2 = [];
        
        
        
        for(let i=0; i<splitInput.length; i++){

            let result: IData = this.GetInputType(splitInput[i]);
            
            executionStack.add(result);
            executionStack2.push(result);
            

            switch(result.InputType){
                case InputType.StatisticsTimeText:
                    break;
                case InputType.StatisticsIOData:
                        
                    break;
                case InputType.TableData:
                    break;
                case InputType.TableRowsAffectedData:
                    break;
            }
        }
    }

    private static GetInputType(input: string): IData{

        if(input.contains("SQL Server parse and compile time") ||
           input.contains("SQL Server Execution Times"))    
        {
            return new ParsedStatisticsTimeText(InputType.StatisticsTimeText, input);
        }
        if(input.contains("CPU time") && input.contains("elapsed time")){
            return new ParsedStatisticsTimeData(InputType.StatisticsTimeData, input);            
        }
        if(input.contains("Table") && input.contains("scan count") && 
           input.contains("logical reads") && input.contains("physical reads")){
               return new ParsedStatisticsIOData(InputType.StatisticsIOData, input);
        }
        if(input.contains("row(s) affected")){
            return new ParsedTableRowsAffectedData(InputType.TableRowsAffectedData, input);
        }
        

        return new ParsedTableData(InputType.TableRowsAffectedData, input);

     
    }
    


}