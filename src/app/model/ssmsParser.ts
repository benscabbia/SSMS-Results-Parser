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
import { TableQueryResult } from "./TableQueryResult";


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
        let executionStackTrace = new Collections.Stack<InputType>();
        let executionStack = new Collections.Stack<TableQueryResult>();
        let executionStack2: TableQueryResult[] = [];
        
        let tableQueryResults = new TableQueryResult();

        // contains table header
        let isTableDataHeader = false;
        for(let i=0; i<splitInput.length; i++){

            let result: IData = this.GetInputType(splitInput[i]);
            
            // executionStack.add(result);
            // executionStack2.push(result);
            let prevPeek = executionStackTrace.peek();
            executionStackTrace.push(result.InputType);
            switch(result.InputType){
                //1
                case InputType.StatisticsIOData:

                    if(!
                        (// caused via non-select query
                        prevPeek == InputType.StatisticsTimeData ||
                        // caused via multi table join
                        prevPeek == InputType.StatisticsIOData ||
                        prevPeek == InputType.TableRowsAffectedData)
                    ){
                        throw "Incompatible SQL";
                    }
                    tableQueryResults.addParsedStatisticsIOData(<ParsedStatisticsIOData>result);                            
                    break;
                
                //2
                case InputType.StatisticsTimeData:
                    if(prevPeek != InputType.StatisticsTimeText) throw "Incompatible SQL";
                    tableQueryResults.addParsedStatisticsTimeData(<ParsedStatisticsTimeData>result);
                    
                    // Check if next i is last, we're finished
                    if(i == splitInput.length - 1){
                        executionStack.push(tableQueryResults);
                        executionStack2.push(tableQueryResults);
                        break;
                    }
                    //if next i is rows affected, save rows affected, push i, and reinit
                    /* 2 -> 4
                        SQL Server Execution Times:
                        CPU time = 16 ms,  elapsed time = 22 ms.
                        (100 row(s) affected)
                    */
                    let resultNext = this.GetInputType(splitInput[i+1]); 
                    if( resultNext.InputType == InputType.TableRowsAffectedData ){
                        
                        tableQueryResults.addParsedTableRowsAffectedData(<ParsedTableRowsAffectedData>resultNext);
                        i++; // increment i beyond next
                        executionStack.push(tableQueryResults);
                        executionStack2.push(tableQueryResults);
                        tableQueryResults = new TableQueryResult();
                    }
 
                    // if next i is tableData save this and reinit
                    /* 2 -> 3
                    SQL Server parse and compile time: 
                    CPU time = 0 ms, elapsed time = 0 ms.
                    BusinessEntityID,FirstName,LastName,EmailAddr
                    */
                    else if( resultNext.InputType == InputType.TableData ){
                        executionStack.push(tableQueryResults);
                        executionStack2.push(tableQueryResults);
                        tableQueryResults = new TableQueryResult();
                    }

                    //
                    /* 2-> 1 dont care
                     * QL Server parse and compile time: 
                        CPU time = 0 ms, elapsed time = 8 ms.
                        Table '#BD90D1F8'. Scan count 0, logical reads 100
                     */

                    // 2-> 5 we dont care, just save it
                    

                    // only this can be last instruction so I complete tableresult
                    break;
                //3
                case InputType.TableData:
                    if(prevPeek == null || prevPeek == InputType.StatisticsTimeData){
                        // First Item in whole list, must be header
                        isTableDataHeader = true;
                    }else if(prevPeek != InputType.TableData) throw "Incompatible SQL";

                    if(isTableDataHeader){
                        isTableDataHeader = false;
                        // add the table header
                        tableQueryResults.parsedTableHeader = <ParsedTableData>result;
                    }else{
                        // append table data
                        tableQueryResults.addParsedTableData(<ParsedTableData>result);
                    }
                    

                    break;
                
                //4
                case InputType.TableRowsAffectedData:
                    if(!
                        (prevPeek == InputType.TableData ||
                        // if non-select query, then it will postfix statsTimeData
                        prevPeek == InputType.StatisticsTimeData)
                    ){
                        throw "Incompatible SQL";
                    }
                    tableQueryResults.addParsedTableRowsAffectedData(<ParsedTableRowsAffectedData>result);
                    break;
                
                
                //5
                case InputType.StatisticsTimeText:
                    // Don't care about saving data, just check compatability
                    if( !(
                        // First query start
                        prevPeek == null || 
                        prevPeek == InputType.StatisticsIOData ||
                        prevPeek == InputType.StatisticsTimeData ||
                        // 0 results in select causes this
                        prevPeek == InputType.TableRowsAffectedData
                    )){
                            throw "Incompatible SQL";
                        }

                    break;
                case InputType.Unknown:
                    // Swallow for now
                    break;
                    
                default:
                    throw "Result type is unhandled";
            }
        }

        //end of calculation
        let a = "";
        return executionStack2;
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

        return new ParsedTableData(InputType.TableData, input);
    }
    


}