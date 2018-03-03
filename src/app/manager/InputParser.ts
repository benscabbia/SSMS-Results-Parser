import { ParsedStatisticsTimeText } from '../model/ParsedStatisticsTimeText';
import { TableQueryResult } from '../model/TableQueryResult';
import { RawInputData } from '../model/rawInputData';
import { IData } from '../model/IData.interface';
import { ParsedStatisticsTimeData } from '../model/ParsedStatisticsTimeData';
import { ParsedStatisticsIOData } from '../model/ParsedStatisticsIOData';
import { ParsedTableRowsAffectedData } from '../model/ParsedTableRowsAffectedData';
import { InputType } from '../model/inputType.enum';
import { ParsedTableData } from '../model/ParsedTableData';
import * as Collections from 'typescript-collections';


export class InputParser {
    private _inputToProcess: RawInputData[] = new Array<RawInputData>();
    private _processedInput: Array<TableQueryResult[]>;

    constructor(inputA: string, inputB: string) {
        if (inputA) { this._inputToProcess.push(new RawInputData(inputA)); }
        if (inputB) { this._inputToProcess.push(new RawInputData(inputB)); }
        this.Parse();
    }
    public get GetTableQueryResult(): Array<TableQueryResult[]> {
        return this._processedInput;
    }

    private Parse(): void {
        this._processedInput = new Array<TableQueryResult[]>() ;

        for (let i = 0; i < this._inputToProcess.length; i++) {
            if (!this._inputToProcess[i].hasSplitInput) { continue; }

            const processedSingleInput = this.ParseSSMS(this._inputToProcess[i].splitInput);

            // TODO: temp solution, should show appropriate message
            if (processedSingleInput.length > 0) {
                this._processedInput.push(
                    processedSingleInput
                );
            }
        }
    }

    private ParseSSMS(splitInput: string[]): TableQueryResult[] {
        const executionStackTrace = new Collections.Stack<InputType>();
        const executionStack = new Collections.Stack<TableQueryResult>();
        const executionStack2: TableQueryResult[] = [];

        let tableQueryResults = new TableQueryResult();

        // contains table header
        let isTableDataHeader = false;
        for (let i = 0; i < splitInput.length; i++) {

            const result: IData = this.GetInputType(splitInput[i]);

            // executionStack.add(result);
            // executionStack2.push(result);
            const prevPeek = executionStackTrace.peek();
            executionStackTrace.push(result.InputType);
            switch (result.InputType) {
                // 1
                case InputType.StatisticsIOData:

                    if (!
                        (// caused via non-select query
                        prevPeek === InputType.StatisticsTimeData ||
                        // caused via multi table join
                        prevPeek === InputType.StatisticsIOData ||
                        prevPeek === InputType.TableRowsAffectedData)
                    ) {
                        throw new Error('Incompatible SQL');
                    }
                    tableQueryResults.addParsedStatisticsIOData(<ParsedStatisticsIOData>result);
                    break;

                // 2
                case InputType.StatisticsTimeData:
                    if (prevPeek !== InputType.StatisticsTimeText) { throw new Error('Incompatible SQL'); }
                    tableQueryResults.addParsedStatisticsTimeData(<ParsedStatisticsTimeData>result);

                    // Check if next i is last, we're finished
                    if (i === splitInput.length - 1) {
                        executionStack.push(tableQueryResults);
                        executionStack2.push(tableQueryResults);
                        break;
                    }
                    // if next i is rows affected, save rows affected, push i, and reinit
                    /* 2 -> 4
                        SQL Server Execution Times:
                        CPU time = 16 ms,  elapsed time = 22 ms.
                        (100 row(s) affected)
                    */
                    const resultNext = this.GetInputType(splitInput[i + 1]);
                    if ( resultNext.InputType === InputType.TableRowsAffectedData ) {

                        tableQueryResults.addParsedTableRowsAffectedData(<ParsedTableRowsAffectedData>resultNext);
                        i++; // increment i beyond next
                        executionStack.push(tableQueryResults);
                        executionStack2.push(tableQueryResults);
                        tableQueryResults = new TableQueryResult();

                    // if next i is tableData save this and reinit
                    /* 2 -> 3
                    SQL Server parse and compile time:
                    CPU time = 0 ms, elapsed time = 0 ms.
                    BusinessEntityID,FirstName,LastName,EmailAddr
                    */
                    } else if ( resultNext.InputType === InputType.TableData ) {
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
                // 3
                case InputType.TableData:
                    if (prevPeek == null || prevPeek === InputType.StatisticsTimeData) {
                        // First Item in whole list, must be header
                        isTableDataHeader = true;
                    } else if (prevPeek !== InputType.TableData) { throw new Error('Incompatible SQL'); }

                    if (isTableDataHeader) {
                        isTableDataHeader = false;
                        // add the table header
                        tableQueryResults.parsedTableHeader = <ParsedTableData>result;
                    } else {
                        // append table data
                        tableQueryResults.addParsedTableData(<ParsedTableData>result);
                    }


                    break;

                // 4
                case InputType.TableRowsAffectedData:
                    if (!
                        (prevPeek === InputType.TableData ||
                        // if non-select query, then it will postfix statsTimeData
                        prevPeek === InputType.StatisticsTimeData)
                    ) {
                        throw new Error('Incompatible SQL');
                    }
                    tableQueryResults.addParsedTableRowsAffectedData(<ParsedTableRowsAffectedData>result);
                    break;


                // 5
                case InputType.StatisticsTimeText:
                    // Don't care about saving data, just check compatability
                    if ( !(
                        // First query start
                        prevPeek == null ||
                        prevPeek === InputType.StatisticsIOData ||
                        prevPeek === InputType.StatisticsTimeData ||
                        // 0 results in select causes this
                        prevPeek === InputType.TableRowsAffectedData
                    )) {
                            throw new Error('Incompatible SQL');
                        }

                    break;
                case InputType.Unknown:
                    // Swallow for now
                    break;

                default:
                    throw new Error('Result type is unhandled');
            }
        }

        // end of calculation
        return executionStack2;
    }

    private GetInputType(input: string): IData {

        if (this.Contains(input, 'SQL Server parse and compile time') ||
           this.Contains(input, 'SQL Server Execution Times')) {
            return new ParsedStatisticsTimeText(InputType.StatisticsTimeText, input);
        }
        if (this.Contains(input, 'CPU time') && this.Contains(input, 'elapsed time')) {
            return new ParsedStatisticsTimeData(InputType.StatisticsTimeData, input);
        }
        if (this.Contains(input, 'Table') && this.Contains(input, 'scan count') &&
           this.Contains(input, 'logical reads') && this.Contains(input, 'physical reads')) {
               return new ParsedStatisticsIOData(InputType.StatisticsIOData, input);
        }
        if (this.Contains(input, 'row(s) affected')) {
            return new ParsedTableRowsAffectedData(InputType.TableRowsAffectedData, input);
        }

        return new ParsedTableData(InputType.TableData, input);
    }

    // required since extensions methods not available in unit test
    private Contains(inputA: string, inputB: string): boolean {
        return inputA.toLowerCase().indexOf(inputB.toLowerCase()) > -1;
    }
}
