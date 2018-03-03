import { InputParser } from './InputParser';
import { TableQueryResult } from './TableQueryResult';
import { ParsedStatisticsIOData } from './ParsedStatisticsIOData';
import { ParsedStatisticsTimeData } from './ParsedStatisticsTimeData';
import { ParsedTableData } from './ParsedTableData';
import { ParsedTableRowsAffectedData } from './ParsedTableRowsAffectedData';
import { InputType } from './inputType.enum';


describe('InputParser', () => {
    it('InputParser handle both null data correctly', () => {
        const inputParser = new InputParser(null, null);
        expect(inputParser.GetTableQueryResult).toEqual(Array<TableQueryResult[]>());
        expect(inputParser.GetTableQueryResult.length).toEqual(0);
    });
});

describe('InputParser with single input calculation', () => {

    const input = `Id,Name
    1,Chauncy
    2,Ploom

    (2 row(s) affected)

    Table 'Schools'. Scan count 1, logical reads 2, physical reads 11, read-ahead reads 12, lob logical reads 7, lob physical reads 3, lob read-ahead reads 10.

     SQL Server Execution Times:
       CPU time = 60 ms,  elapsed time = 165 ms.
    `;

    // Setup object
    const inputParser = new InputParser(input, null);
    // const a = [ [ new TableQueryResult({ _parsedTableData: [ new ParsedTableData({ _inputType: 3, _data: '1,Chauncy', _tableData: '1,Chauncy' }), new ParsedTableData({ _inputType: 3, _data: '2,Ploom', _tableData: '2,Ploom' }) ], _parsedStatisticsIOData: [ new ParsedStatisticsIOData({ _inputType: 1, _data: 'Table 'Schools'. Scan count 1, logical reads 2, physical reads 10, read-ahead reads 10, lob logical reads 7, lob physical reads 3, lob read-ahead reads 2.', _scanCount: 1, _logicalReads: 2, _physicalReads: 10, _readAheadReads: 10, _lobLogicalReads: 7, _lobPhysicalReads: 3, _lobReadAheadReads: 2, _tableName: 'Schools' }) ], _parsedStatisticsTimeData: [ new ParsedStatisticsTimeData({ _inputType: 2, _data: 'CPU time = 0 ms,  elapsed time = 165 ms.', _CPUTime: 0, _elapsedTime: 165 }) ], _parsedTableRowsAffectedData: [ new ParsedTableRowsAffectedData({ _inputType: 4, _data: '(2 row(s) affected)', _rowsAffected: 2 }) ], _parsedTableHeader: new ParsedTableData({ _inputType: 3, _data: 'Id,Name', _tableData: 'Id,Name' }) }) ] ]
    // const tableQueryResult = new TableQueryResult();
    // tableQueryResult.addParsedTableData(new ParsedTableData(InputType.TableData, '1,Chauncy'));
    // tableQueryResult.addParsedTableData(new ParsedTableData(InputType.TableData, '2,Ploom'));
    it('InputParser has one input, so one element in TableQueryResult[][]', () => {
        expect(inputParser.GetTableQueryResult.length).toEqual(1);
    });
    it('TableQueryResult[0][] has one table, so only has one element', () => {
        const table = inputParser.GetTableQueryResult[0];
        expect(inputParser.GetTableQueryResult[0].length).toEqual(1);
    });

    describe('Check the integrity of the parsed TableQueryResult[0][0]', () => {
        const data = inputParser.GetTableQueryResult[0][0];

        describe('Check ParsedTableData Integrity', () => {
            it('There should be 2 rows of ParsedTableData data', () => {
                expect(data.parsedTableData.length).toEqual(2);
            });

            it('Check the Data for the two rows', () => {
                expect(data.parsedTableData[0].Data).toEqual('1,Chauncy');
                expect(data.parsedTableData[1].Data).toEqual('2,Ploom');
            });
            it('Check the Input Type for the two rows', () => {
                expect(data.parsedTableData[0].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[1].InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableData[0].tableData).toEqual('1,Chauncy');
                expect(data.parsedTableData[1].tableData).toEqual('2,Ploom');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('Check the Data for the row', () => {
                expect(data.parsedTableHeader.Data).toEqual('Id,Name');
            });
            it('Check the Input Type for the row', () => {
                expect(data.parsedTableHeader.InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableHeader.tableData).toEqual('Id,Name');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('There should be only 1 row of table rows affected data', () => {
                expect(data.parsedTableRowsAffectedData.length).toEqual(1);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] has right message', () => {
                expect(data.parsedTableRowsAffectedData[0].Data).toEqual('(2 row(s) affected)');
            });
            it('Check the Data for parsedTableRowsAffectedData[0] input type ', () => {
                expect(data.parsedTableRowsAffectedData[0].InputType).toEqual(InputType.TableRowsAffectedData);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] rows affected ', () => {
                expect(data.parsedTableRowsAffectedData[0].rowsAffected).toEqual(2);
            });
        });

        describe('Check parsedStatisticsIOData Integrity', () => {
            it('There should be 1 row of parsedStatisticsIOData data', () => {
                expect(data.parsedStatisticsIOData.length).toEqual(1);
            });

            it('Check the Data property', () => {
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Schools\'. Scan count 1, logical reads 2, physical reads 11, read-ahead reads 12, lob logical reads 7, lob physical reads 3, lob read-ahead reads 10.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsIOData[0].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobLogicalReads).toEqual(7);
            });
            it('Check the lobPhysicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobPhysicalReads).toEqual(3);
            });
            it('Check the lobReadAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobReadAheadReads).toEqual(10);
            });
            it('Check the logicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].logicalReads).toEqual(2);
            });
            it('Check the physicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].physicalReads).toEqual(11);
            });
            it('Check the readAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].readAheadReads).toEqual(12);
            });
            it('Check the scanCount property', () => {
                expect(data.parsedStatisticsIOData[0].scanCount).toEqual(1);
            });
            it('Check the tableName property', () => {
                expect(data.parsedStatisticsIOData[0].tableName).toEqual('Schools');
            });
        });

        describe('Check parsedStatisticsTimeData Integrity', () => {
            it('There should be 1 row of parsedStatisticsTimeData data', () => {
                expect(data.parsedStatisticsTimeData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsTimeData[0].Data).toEqual('CPU time = 60 ms,  elapsed time = 165 ms.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsTimeData[0].InputType).toEqual(InputType.StatisticsTimeData);
            });
            it('Check the CPUTime property', () => {
                expect(data.parsedStatisticsTimeData[0].CPUTime).toEqual(60);
            });
            it('Check the elapsedTime property', () => {
                expect(data.parsedStatisticsTimeData[0].elapsedTime).toEqual(165);
            });
        });


    });
});

describe('InputParser with double input calculation', () => {

    const input = `Id,Name
    1,Chauncy
    2,Ploom

    (2 row(s) affected)

    Table 'Schools'. Scan count 1, logical reads 2, physical reads 11, read-ahead reads 12, lob logical reads 7, lob physical reads 3, lob read-ahead reads 10.

     SQL Server Execution Times:
       CPU time = 60 ms,  elapsed time = 165 ms.
    `;

    // Setup object
    const inputParser = new InputParser(input, input);
    // const a = [ [ new TableQueryResult({ _parsedTableData: [ new ParsedTableData({ _inputType: 3, _data: '1,Chauncy', _tableData: '1,Chauncy' }), new ParsedTableData({ _inputType: 3, _data: '2,Ploom', _tableData: '2,Ploom' }) ], _parsedStatisticsIOData: [ new ParsedStatisticsIOData({ _inputType: 1, _data: 'Table 'Schools'. Scan count 1, logical reads 2, physical reads 10, read-ahead reads 10, lob logical reads 7, lob physical reads 3, lob read-ahead reads 2.', _scanCount: 1, _logicalReads: 2, _physicalReads: 10, _readAheadReads: 10, _lobLogicalReads: 7, _lobPhysicalReads: 3, _lobReadAheadReads: 2, _tableName: 'Schools' }) ], _parsedStatisticsTimeData: [ new ParsedStatisticsTimeData({ _inputType: 2, _data: 'CPU time = 0 ms,  elapsed time = 165 ms.', _CPUTime: 0, _elapsedTime: 165 }) ], _parsedTableRowsAffectedData: [ new ParsedTableRowsAffectedData({ _inputType: 4, _data: '(2 row(s) affected)', _rowsAffected: 2 }) ], _parsedTableHeader: new ParsedTableData({ _inputType: 3, _data: 'Id,Name', _tableData: 'Id,Name' }) }) ] ]
    // const tableQueryResult = new TableQueryResult();
    // tableQueryResult.addParsedTableData(new ParsedTableData(InputType.TableData, '1,Chauncy'));
    // tableQueryResult.addParsedTableData(new ParsedTableData(InputType.TableData, '2,Ploom'));
    it('InputParser has 2 input', () => {
        expect(inputParser.GetTableQueryResult.length).toEqual(2);
    });
    it('TableQueryResult[0][] has one table, so only has one element', () => {
        expect(inputParser.GetTableQueryResult[0].length).toEqual(1);
    });
    it('TableQueryResult[1][] has one table, so only has one element', () => {
        expect(inputParser.GetTableQueryResult[1].length).toEqual(1);
    });

    describe('Check the integrity of the parsed TableQueryResult[0][0]', () => {
        const data = inputParser.GetTableQueryResult[0][0];

        describe('Check ParsedTableData Integrity', () => {
            it('There should be 2 rows of ParsedTableData data', () => {
                expect(data.parsedTableData.length).toEqual(2);
            });

            it('Check the Data for the two rows', () => {
                expect(data.parsedTableData[0].Data).toEqual('1,Chauncy');
                expect(data.parsedTableData[1].Data).toEqual('2,Ploom');
            });
            it('Check the Input Type for the two rows', () => {
                expect(data.parsedTableData[0].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[1].InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableData[0].tableData).toEqual('1,Chauncy');
                expect(data.parsedTableData[1].tableData).toEqual('2,Ploom');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('Check the Data for the row', () => {
                expect(data.parsedTableHeader.Data).toEqual('Id,Name');
            });
            it('Check the Input Type for the row', () => {
                expect(data.parsedTableHeader.InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableHeader.tableData).toEqual('Id,Name');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('There should be only 1 row of table rows affected data', () => {
                expect(data.parsedTableRowsAffectedData.length).toEqual(1);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] has right message', () => {
                expect(data.parsedTableRowsAffectedData[0].Data).toEqual('(2 row(s) affected)');
            });
            it('Check the Data for parsedTableRowsAffectedData[0] input type ', () => {
                expect(data.parsedTableRowsAffectedData[0].InputType).toEqual(InputType.TableRowsAffectedData);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] rows affected ', () => {
                expect(data.parsedTableRowsAffectedData[0].rowsAffected).toEqual(2);
            });
        });

        describe('Check parsedStatisticsIOData Integrity', () => {
            it('There should be 1 row of parsedStatisticsIOData data', () => {
                expect(data.parsedStatisticsIOData.length).toEqual(1);
            });

            it('Check the Data property', () => {
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Schools\'. Scan count 1, logical reads 2, physical reads 11, read-ahead reads 12, lob logical reads 7, lob physical reads 3, lob read-ahead reads 10.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsIOData[0].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobLogicalReads).toEqual(7);
            });
            it('Check the lobPhysicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobPhysicalReads).toEqual(3);
            });
            it('Check the lobReadAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobReadAheadReads).toEqual(10);
            });
            it('Check the logicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].logicalReads).toEqual(2);
            });
            it('Check the physicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].physicalReads).toEqual(11);
            });
            it('Check the readAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].readAheadReads).toEqual(12);
            });
            it('Check the scanCount property', () => {
                expect(data.parsedStatisticsIOData[0].scanCount).toEqual(1);
            });
            it('Check the tableName property', () => {
                expect(data.parsedStatisticsIOData[0].tableName).toEqual('Schools');
            });
        });

        describe('Check parsedStatisticsTimeData Integrity', () => {
            it('There should be 1 row of parsedStatisticsTimeData data', () => {
                expect(data.parsedStatisticsTimeData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsTimeData[0].Data).toEqual('CPU time = 60 ms,  elapsed time = 165 ms.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsTimeData[0].InputType).toEqual(InputType.StatisticsTimeData);
            });
            it('Check the CPUTime property', () => {
                expect(data.parsedStatisticsTimeData[0].CPUTime).toEqual(60);
            });
            it('Check the elapsedTime property', () => {
                expect(data.parsedStatisticsTimeData[0].elapsedTime).toEqual(165);
            });
        });


    });
    describe('Check the integrity of the parsed TableQueryResult[1][0]', () => {
        const data = inputParser.GetTableQueryResult[1][0];

        describe('Check ParsedTableData Integrity', () => {
            it('There should be 2 rows of ParsedTableData data', () => {
                expect(data.parsedTableData.length).toEqual(2);
            });

            it('Check the Data for the two rows', () => {
                expect(data.parsedTableData[0].Data).toEqual('1,Chauncy');
                expect(data.parsedTableData[1].Data).toEqual('2,Ploom');
            });
            it('Check the Input Type for the two rows', () => {
                expect(data.parsedTableData[0].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[1].InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableData[0].tableData).toEqual('1,Chauncy');
                expect(data.parsedTableData[1].tableData).toEqual('2,Ploom');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('Check the Data for the row', () => {
                expect(data.parsedTableHeader.Data).toEqual('Id,Name');
            });
            it('Check the Input Type for the row', () => {
                expect(data.parsedTableHeader.InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableHeader.tableData).toEqual('Id,Name');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('There should be only 1 row of table rows affected data', () => {
                expect(data.parsedTableRowsAffectedData.length).toEqual(1);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] has right message', () => {
                expect(data.parsedTableRowsAffectedData[0].Data).toEqual('(2 row(s) affected)');
            });
            it('Check the Data for parsedTableRowsAffectedData[0] input type ', () => {
                expect(data.parsedTableRowsAffectedData[0].InputType).toEqual(InputType.TableRowsAffectedData);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] rows affected ', () => {
                expect(data.parsedTableRowsAffectedData[0].rowsAffected).toEqual(2);
            });
        });

        describe('Check parsedStatisticsIOData Integrity', () => {
            it('There should be 1 row of parsedStatisticsIOData data', () => {
                expect(data.parsedStatisticsIOData.length).toEqual(1);
            });

            it('Check the Data property', () => {
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Schools\'. Scan count 1, logical reads 2, physical reads 11, read-ahead reads 12, lob logical reads 7, lob physical reads 3, lob read-ahead reads 10.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsIOData[0].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobLogicalReads).toEqual(7);
            });
            it('Check the lobPhysicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobPhysicalReads).toEqual(3);
            });
            it('Check the lobReadAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobReadAheadReads).toEqual(10);
            });
            it('Check the logicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].logicalReads).toEqual(2);
            });
            it('Check the physicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].physicalReads).toEqual(11);
            });
            it('Check the readAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].readAheadReads).toEqual(12);
            });
            it('Check the scanCount property', () => {
                expect(data.parsedStatisticsIOData[0].scanCount).toEqual(1);
            });
            it('Check the tableName property', () => {
                expect(data.parsedStatisticsIOData[0].tableName).toEqual('Schools');
            });
        });

        describe('Check parsedStatisticsTimeData Integrity', () => {
            it('There should be 1 row of parsedStatisticsTimeData data', () => {
                expect(data.parsedStatisticsTimeData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsTimeData[0].Data).toEqual('CPU time = 60 ms,  elapsed time = 165 ms.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsTimeData[0].InputType).toEqual(InputType.StatisticsTimeData);
            });
            it('Check the CPUTime property', () => {
                expect(data.parsedStatisticsTimeData[0].CPUTime).toEqual(60);
            });
            it('Check the elapsedTime property', () => {
                expect(data.parsedStatisticsTimeData[0].elapsedTime).toEqual(165);
            });
        });


    });
});

describe('InputParser with double input more complex calculation ', () => {

    const input = `
    Id,Name
    1,Chauncy
    2,Ploom

    (2 row(s) affected)

    Table 'Schools'. Scan count 1, logical reads 2, physical reads 10, read-ahead reads 10, lob logical reads 7, lob physical reads 3, lob read-ahead reads 2.

     SQL Server Execution Times:
       CPU time = 0 ms,  elapsed time = 165 ms.
    Id,FirstName,LastName,Gender,SchoolID
    1,John,Knight,0,1
    2,Amy,Smith,1,1
    3,Becca,Johnson,1,2
    4,Rob,Tyler,0,2
    5,Mark,Pop,0,2

    (5 row(s) affected)

    Table 'Students'. Scan count 1, logical reads 2, physical reads 10, read-ahead reads 2, lob logical reads 31, lob physical reads 4, lob read-ahead reads 99.

     SQL Server Execution Times:
       CPU time = 1000 ms,  elapsed time = 10000 ms.
    Id,Name,Id,FirstName,LastName,Gender,SchoolID
    1,Chauncy,1,John,Knight,0,1
    1,Chauncy,2,Amy,Smith,1,1
    2,Ploom,3,Becca,Johnson,1,2
    2,Ploom,4,Rob,Tyler,0,2
    2,Ploom,5,Mark,Pop,0,2

    (5 row(s) affected)

    Table 'Schools'. Scan count 30, logical reads 10, physical reads 30, read-ahead reads 30, lob logical reads 30, lob physical reads 30, lob read-ahead reads 30.
    Table 'Students'. Scan count 41, logical reads 42, physical reads 40, read-ahead reads 40, lob logical reads 40, lob physical reads 40, lob read-ahead reads 40.

     SQL Server Execution Times:
       CPU time = 110 ms,  elapsed time = 220 ms.
    `;

    // Setup object
    const inputParser = new InputParser(input, input);
    // const a = [ [ new TableQueryResult({ _parsedTableData: [ new ParsedTableData({ _inputType: 3, _data: '1,Chauncy', _tableData: '1,Chauncy' }), new ParsedTableData({ _inputType: 3, _data: '2,Ploom', _tableData: '2,Ploom' }) ], _parsedStatisticsIOData: [ new ParsedStatisticsIOData({ _inputType: 1, _data: 'Table 'Schools'. Scan count 1, logical reads 2, physical reads 10, read-ahead reads 10, lob logical reads 7, lob physical reads 3, lob read-ahead reads 2.', _scanCount: 1, _logicalReads: 2, _physicalReads: 10, _readAheadReads: 10, _lobLogicalReads: 7, _lobPhysicalReads: 3, _lobReadAheadReads: 2, _tableName: 'Schools' }) ], _parsedStatisticsTimeData: [ new ParsedStatisticsTimeData({ _inputType: 2, _data: 'CPU time = 0 ms,  elapsed time = 165 ms.', _CPUTime: 0, _elapsedTime: 165 }) ], _parsedTableRowsAffectedData: [ new ParsedTableRowsAffectedData({ _inputType: 4, _data: '(2 row(s) affected)', _rowsAffected: 2 }) ], _parsedTableHeader: new ParsedTableData({ _inputType: 3, _data: 'Id,Name', _tableData: 'Id,Name' }) }) ] ]
    // const tableQueryResult = new TableQueryResult();
    // tableQueryResult.addParsedTableData(new ParsedTableData(InputType.TableData, '1,Chauncy'));
    // tableQueryResult.addParsedTableData(new ParsedTableData(InputType.TableData, '2,Ploom'));
    it('InputParser has 2 input', () => {
        expect(inputParser.GetTableQueryResult.length).toEqual(2);
    });
    it('TableQueryResult[0][] has 3 table, so only has one element', () => {
        expect(inputParser.GetTableQueryResult[0].length).toEqual(3);
    });
    it('TableQueryResult[1][] has 3 table, so only has one element', () => {
        expect(inputParser.GetTableQueryResult[1].length).toEqual(3);
    });

    describe('Check the integrity of the parsed TableQueryResult[0][0]', () => {
        const data = inputParser.GetTableQueryResult[0][0];

        describe('Check ParsedTableData Integrity', () => {
            it('There should be 2 rows of ParsedTableData data', () => {
                expect(data.parsedTableData.length).toEqual(2);
            });

            it('Check the Data for the two rows', () => {
                expect(data.parsedTableData[0].Data).toEqual('1,Chauncy');
                expect(data.parsedTableData[1].Data).toEqual('2,Ploom');
            });
            it('Check the Input Type for the two rows', () => {
                expect(data.parsedTableData[0].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[1].InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableData[0].tableData).toEqual('1,Chauncy');
                expect(data.parsedTableData[1].tableData).toEqual('2,Ploom');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('Check the Data for the row', () => {
                expect(data.parsedTableHeader.Data).toEqual('Id,Name');
            });
            it('Check the Input Type for the row', () => {
                expect(data.parsedTableHeader.InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableHeader.tableData).toEqual('Id,Name');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('There should be only 1 row of table rows affected data', () => {
                expect(data.parsedTableRowsAffectedData.length).toEqual(1);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] has right message', () => {
                expect(data.parsedTableRowsAffectedData[0].Data).toEqual('(2 row(s) affected)');
            });
            it('Check the Data for parsedTableRowsAffectedData[0] input type ', () => {
                expect(data.parsedTableRowsAffectedData[0].InputType).toEqual(InputType.TableRowsAffectedData);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] rows affected ', () => {
                expect(data.parsedTableRowsAffectedData[0].rowsAffected).toEqual(2);
            });
        });

        describe('Check parsedStatisticsIOData Integrity', () => {
            it('There should be 1 row of parsedStatisticsIOData data', () => {
                expect(data.parsedStatisticsIOData.length).toEqual(1);
            });

            it('Check the Data property', () => {
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Schools\'. Scan count 1, logical reads 2, physical reads 10, read-ahead reads 10, lob logical reads 7, lob physical reads 3, lob read-ahead reads 2.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsIOData[0].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobLogicalReads).toEqual(7);
            });
            it('Check the lobPhysicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobPhysicalReads).toEqual(3);
            });
            it('Check the lobReadAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobReadAheadReads).toEqual(2);
            });
            it('Check the logicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].logicalReads).toEqual(2);
            });
            it('Check the physicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].physicalReads).toEqual(10);
            });
            it('Check the readAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].readAheadReads).toEqual(10);
            });
            it('Check the scanCount property', () => {
                expect(data.parsedStatisticsIOData[0].scanCount).toEqual(1);
            });
            it('Check the tableName property', () => {
                expect(data.parsedStatisticsIOData[0].tableName).toEqual('Schools');
            });
        });

        describe('Check parsedStatisticsTimeData Integrity', () => {
            it('There should be 1 row of parsedStatisticsTimeData data', () => {
                expect(data.parsedStatisticsTimeData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsTimeData[0].Data).toEqual('CPU time = 0 ms,  elapsed time = 165 ms.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsTimeData[0].InputType).toEqual(InputType.StatisticsTimeData);
            });
            it('Check the CPUTime property', () => {
                expect(data.parsedStatisticsTimeData[0].CPUTime).toEqual(0);
            });
            it('Check the elapsedTime property', () => {
                expect(data.parsedStatisticsTimeData[0].elapsedTime).toEqual(165);
            });
        });


    });
    describe('Check the integrity of the parsed TableQueryResult[0][1]', () => {
        const data = inputParser.GetTableQueryResult[0][1];

        describe('Check ParsedTableData Integrity', () => {
            it('There should be 2 rows of ParsedTableData data', () => {
                expect(data.parsedTableData.length).toEqual(5);
            });

            it('Check the Data for the 5 rows', () => {
                expect(data.parsedTableData[0].Data).toEqual('1,John,Knight,0,1');
                expect(data.parsedTableData[1].Data).toEqual('2,Amy,Smith,1,1');
                expect(data.parsedTableData[2].Data).toEqual('3,Becca,Johnson,1,2');
                expect(data.parsedTableData[3].Data).toEqual('4,Rob,Tyler,0,2');
                expect(data.parsedTableData[4].Data).toEqual('5,Mark,Pop,0,2');
            });
            it('Check the Input Type for the 5 rows', () => {
                expect(data.parsedTableData[0].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[1].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[2].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[3].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[4].InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the 5 rows', () => {
                expect(data.parsedTableData[0].tableData).toEqual('1,John,Knight,0,1');
                expect(data.parsedTableData[1].tableData).toEqual('2,Amy,Smith,1,1');
                expect(data.parsedTableData[2].tableData).toEqual('3,Becca,Johnson,1,2');
                expect(data.parsedTableData[3].tableData).toEqual('4,Rob,Tyler,0,2');
                expect(data.parsedTableData[4].tableData).toEqual('5,Mark,Pop,0,2');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('Check the Data for the row', () => {
                expect(data.parsedTableHeader.Data).toEqual('Id,FirstName,LastName,Gender,SchoolID');
            });
            it('Check the Input Type for the row', () => {
                expect(data.parsedTableHeader.InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableHeader.tableData).toEqual('Id,FirstName,LastName,Gender,SchoolID');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('There should be only 1 row of table rows affected data', () => {
                expect(data.parsedTableRowsAffectedData.length).toEqual(1);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] has right message', () => {
                expect(data.parsedTableRowsAffectedData[0].Data).toEqual('(5 row(s) affected)');
            });
            it('Check the Data for parsedTableRowsAffectedData[0] input type ', () => {
                expect(data.parsedTableRowsAffectedData[0].InputType).toEqual(InputType.TableRowsAffectedData);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] rows affected ', () => {
                expect(data.parsedTableRowsAffectedData[0].rowsAffected).toEqual(5);
            });
        });

        describe('Check parsedStatisticsIOData Integrity', () => {
            it('There should be 1 row of parsedStatisticsIOData data', () => {
                expect(data.parsedStatisticsIOData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Students\'. Scan count 1, logical reads 2, physical reads 10, read-ahead reads 2, lob logical reads 31, lob physical reads 4, lob read-ahead reads 99.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsIOData[0].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobLogicalReads).toEqual(31);
            });
            it('Check the lobPhysicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobPhysicalReads).toEqual(4);
            });
            it('Check the lobReadAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobReadAheadReads).toEqual(99);
            });
            it('Check the logicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].logicalReads).toEqual(2);
            });
            it('Check the physicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].physicalReads).toEqual(10);
            });
            it('Check the readAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].readAheadReads).toEqual(2);
            });
            it('Check the scanCount property', () => {
                expect(data.parsedStatisticsIOData[0].scanCount).toEqual(1);
            });
            it('Check the tableName property', () => {
                expect(data.parsedStatisticsIOData[0].tableName).toEqual('Students');
            });
        });

        describe('Check parsedStatisticsTimeData Integrity', () => {
            it('There should be 1 row of parsedStatisticsTimeData data', () => {
                expect(data.parsedStatisticsTimeData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsTimeData[0].Data).toEqual('CPU time = 1000 ms,  elapsed time = 10000 ms.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsTimeData[0].InputType).toEqual(InputType.StatisticsTimeData);
            });
            it('Check the CPUTime property', () => {
                expect(data.parsedStatisticsTimeData[0].CPUTime).toEqual(1000);
            });
            it('Check the elapsedTime property', () => {
                expect(data.parsedStatisticsTimeData[0].elapsedTime).toEqual(10000);
            });
        });


    });
    describe('Check the integrity of the parsed TableQueryResult[0][2]', () => {
        const data = inputParser.GetTableQueryResult[0][2];

        describe('Check ParsedTableData Integrity', () => {
            it('There should be 2 rows of ParsedTableData data', () => {
                expect(data.parsedTableData.length).toEqual(5);
            });

            it('Check the Data for the 5 rows', () => {
                expect(data.parsedTableData[0].Data).toEqual('1,Chauncy,1,John,Knight,0,1');
                expect(data.parsedTableData[1].Data).toEqual('1,Chauncy,2,Amy,Smith,1,1');
                expect(data.parsedTableData[2].Data).toEqual('2,Ploom,3,Becca,Johnson,1,2');
                expect(data.parsedTableData[3].Data).toEqual('2,Ploom,4,Rob,Tyler,0,2');
                expect(data.parsedTableData[4].Data).toEqual('2,Ploom,5,Mark,Pop,0,2');
            });
            it('Check the Input Type for the 5 rows', () => {
                expect(data.parsedTableData[0].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[1].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[2].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[3].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[4].InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the 5 rows', () => {
                expect(data.parsedTableData[0].tableData).toEqual('1,Chauncy,1,John,Knight,0,1');
                expect(data.parsedTableData[1].tableData).toEqual('1,Chauncy,2,Amy,Smith,1,1');
                expect(data.parsedTableData[2].tableData).toEqual('2,Ploom,3,Becca,Johnson,1,2');
                expect(data.parsedTableData[3].tableData).toEqual('2,Ploom,4,Rob,Tyler,0,2');
                expect(data.parsedTableData[4].tableData).toEqual('2,Ploom,5,Mark,Pop,0,2');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('Check the Data for the row', () => {
                expect(data.parsedTableHeader.Data).toEqual('Id,Name,Id,FirstName,LastName,Gender,SchoolID');
            });
            it('Check the Input Type for the row', () => {
                expect(data.parsedTableHeader.InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableHeader.tableData).toEqual('Id,Name,Id,FirstName,LastName,Gender,SchoolID');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('There should be only 1 row of table rows affected data', () => {
                expect(data.parsedTableRowsAffectedData.length).toEqual(1);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] has right message', () => {
                expect(data.parsedTableRowsAffectedData[0].Data).toEqual('(5 row(s) affected)');
            });
            it('Check the Data for parsedTableRowsAffectedData[0] input type ', () => {
                expect(data.parsedTableRowsAffectedData[0].InputType).toEqual(InputType.TableRowsAffectedData);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] rows affected ', () => {
                expect(data.parsedTableRowsAffectedData[0].rowsAffected).toEqual(5);
            });
        });

        describe('Check parsedStatisticsIOData Integrity', () => {
            it('There should be 1 row of parsedStatisticsIOData data', () => {
                expect(data.parsedStatisticsIOData.length).toEqual(2);
            });
            it('Check the Data property[0]', () => {
                // console.log(data.parsedStatisticsIOData[0]);
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Schools\'. Scan count 30, logical reads 10, physical reads 30, read-ahead reads 30, lob logical reads 30, lob physical reads 30, lob read-ahead reads 30.');
            });
            it('Check the InputType property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].lobLogicalReads).toEqual(30);
            });
            it('Check the lobPhysicalReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].lobPhysicalReads).toEqual(30);
            });
            it('Check the lobReadAheadReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].lobReadAheadReads).toEqual(30);
            });
            it('Check the logicalReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].logicalReads).toEqual(10);
            });
            it('Check the physicalReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].physicalReads).toEqual(30);
            });
            it('Check the readAheadReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].readAheadReads).toEqual(30);
            });
            it('Check the scanCount property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].scanCount).toEqual(30);
            });
            it('Check the tableName property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].tableName).toEqual('Schools');
            });
            it('Check the Data property[0]', () => {
                // console.log(data.parsedStatisticsIOData[0]);
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Schools\'. Scan count 30, logical reads 10, physical reads 30, read-ahead reads 30, lob logical reads 30, lob physical reads 30, lob read-ahead reads 30.');
            });

            it('Check the Data property[1] Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].Data).toEqual('Table \'Students\'. Scan count 41, logical reads 42, physical reads 40, read-ahead reads 40, lob logical reads 40, lob physical reads 40, lob read-ahead reads 40.');
            });
            it('Check the InputType property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].lobLogicalReads).toEqual(40);
            });
            it('Check the lobPhysicalReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].lobPhysicalReads).toEqual(40);
            });
            it('Check the lobReadAheadReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].lobReadAheadReads).toEqual(40);
            });
            it('Check the logicalReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].logicalReads).toEqual(42);
            });
            it('Check the physicalReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].physicalReads).toEqual(40);
            });
            it('Check the readAheadReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].readAheadReads).toEqual(40);
            });
            it('Check the scanCount property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].scanCount).toEqual(41);
            });
            it('Check the tableName property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].tableName).toEqual('Students');
            });

        });

        describe('Check parsedStatisticsTimeData Integrity', () => {
            it('There should be 1 row of parsedStatisticsTimeData data', () => {
                expect(data.parsedStatisticsTimeData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsTimeData[0].Data).toEqual('CPU time = 110 ms,  elapsed time = 220 ms.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsTimeData[0].InputType).toEqual(InputType.StatisticsTimeData);
            });
            it('Check the CPUTime property', () => {
                expect(data.parsedStatisticsTimeData[0].CPUTime).toEqual(110);
            });
            it('Check the elapsedTime property', () => {
                expect(data.parsedStatisticsTimeData[0].elapsedTime).toEqual(220);
            });
        });


    });

    describe('Check the integrity of the parsed TableQueryResult[1][0]', () => {
        const data = inputParser.GetTableQueryResult[1][0];

        describe('Check ParsedTableData Integrity', () => {
            it('There should be 2 rows of ParsedTableData data', () => {
                expect(data.parsedTableData.length).toEqual(2);
            });

            it('Check the Data for the two rows', () => {
                expect(data.parsedTableData[0].Data).toEqual('1,Chauncy');
                expect(data.parsedTableData[1].Data).toEqual('2,Ploom');
            });
            it('Check the Input Type for the two rows', () => {
                expect(data.parsedTableData[0].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[1].InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableData[0].tableData).toEqual('1,Chauncy');
                expect(data.parsedTableData[1].tableData).toEqual('2,Ploom');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('Check the Data for the row', () => {
                expect(data.parsedTableHeader.Data).toEqual('Id,Name');
            });
            it('Check the Input Type for the row', () => {
                expect(data.parsedTableHeader.InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableHeader.tableData).toEqual('Id,Name');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('There should be only 1 row of table rows affected data', () => {
                expect(data.parsedTableRowsAffectedData.length).toEqual(1);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] has right message', () => {
                expect(data.parsedTableRowsAffectedData[0].Data).toEqual('(2 row(s) affected)');
            });
            it('Check the Data for parsedTableRowsAffectedData[0] input type ', () => {
                expect(data.parsedTableRowsAffectedData[0].InputType).toEqual(InputType.TableRowsAffectedData);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] rows affected ', () => {
                expect(data.parsedTableRowsAffectedData[0].rowsAffected).toEqual(2);
            });
        });

        describe('Check parsedStatisticsIOData Integrity', () => {
            it('There should be 1 row of parsedStatisticsIOData data', () => {
                expect(data.parsedStatisticsIOData.length).toEqual(1);
            });

            it('Check the Data property', () => {
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Schools\'. Scan count 1, logical reads 2, physical reads 10, read-ahead reads 10, lob logical reads 7, lob physical reads 3, lob read-ahead reads 2.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsIOData[0].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobLogicalReads).toEqual(7);
            });
            it('Check the lobPhysicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobPhysicalReads).toEqual(3);
            });
            it('Check the lobReadAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobReadAheadReads).toEqual(2);
            });
            it('Check the logicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].logicalReads).toEqual(2);
            });
            it('Check the physicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].physicalReads).toEqual(10);
            });
            it('Check the readAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].readAheadReads).toEqual(10);
            });
            it('Check the scanCount property', () => {
                expect(data.parsedStatisticsIOData[0].scanCount).toEqual(1);
            });
            it('Check the tableName property', () => {
                expect(data.parsedStatisticsIOData[0].tableName).toEqual('Schools');
            });
        });

        describe('Check parsedStatisticsTimeData Integrity', () => {
            it('There should be 1 row of parsedStatisticsTimeData data', () => {
                expect(data.parsedStatisticsTimeData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsTimeData[0].Data).toEqual('CPU time = 0 ms,  elapsed time = 165 ms.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsTimeData[0].InputType).toEqual(InputType.StatisticsTimeData);
            });
            it('Check the CPUTime property', () => {
                expect(data.parsedStatisticsTimeData[0].CPUTime).toEqual(0);
            });
            it('Check the elapsedTime property', () => {
                expect(data.parsedStatisticsTimeData[0].elapsedTime).toEqual(165);
            });
        });


    });
    describe('Check the integrity of the parsed TableQueryResult[1][1]', () => {
        const data = inputParser.GetTableQueryResult[1][1];

        describe('Check ParsedTableData Integrity', () => {
            it('There should be 2 rows of ParsedTableData data', () => {
                expect(data.parsedTableData.length).toEqual(5);
            });

            it('Check the Data for the 5 rows', () => {
                expect(data.parsedTableData[0].Data).toEqual('1,John,Knight,0,1');
                expect(data.parsedTableData[1].Data).toEqual('2,Amy,Smith,1,1');
                expect(data.parsedTableData[2].Data).toEqual('3,Becca,Johnson,1,2');
                expect(data.parsedTableData[3].Data).toEqual('4,Rob,Tyler,0,2');
                expect(data.parsedTableData[4].Data).toEqual('5,Mark,Pop,0,2');
            });
            it('Check the Input Type for the 5 rows', () => {
                expect(data.parsedTableData[0].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[1].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[2].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[3].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[4].InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the 5 rows', () => {
                expect(data.parsedTableData[0].tableData).toEqual('1,John,Knight,0,1');
                expect(data.parsedTableData[1].tableData).toEqual('2,Amy,Smith,1,1');
                expect(data.parsedTableData[2].tableData).toEqual('3,Becca,Johnson,1,2');
                expect(data.parsedTableData[3].tableData).toEqual('4,Rob,Tyler,0,2');
                expect(data.parsedTableData[4].tableData).toEqual('5,Mark,Pop,0,2');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('Check the Data for the row', () => {
                expect(data.parsedTableHeader.Data).toEqual('Id,FirstName,LastName,Gender,SchoolID');
            });
            it('Check the Input Type for the row', () => {
                expect(data.parsedTableHeader.InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableHeader.tableData).toEqual('Id,FirstName,LastName,Gender,SchoolID');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('There should be only 1 row of table rows affected data', () => {
                expect(data.parsedTableRowsAffectedData.length).toEqual(1);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] has right message', () => {
                expect(data.parsedTableRowsAffectedData[0].Data).toEqual('(5 row(s) affected)');
            });
            it('Check the Data for parsedTableRowsAffectedData[0] input type ', () => {
                expect(data.parsedTableRowsAffectedData[0].InputType).toEqual(InputType.TableRowsAffectedData);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] rows affected ', () => {
                expect(data.parsedTableRowsAffectedData[0].rowsAffected).toEqual(5);
            });
        });

        describe('Check parsedStatisticsIOData Integrity', () => {
            it('There should be 1 row of parsedStatisticsIOData data', () => {
                expect(data.parsedStatisticsIOData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Students\'. Scan count 1, logical reads 2, physical reads 10, read-ahead reads 2, lob logical reads 31, lob physical reads 4, lob read-ahead reads 99.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsIOData[0].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobLogicalReads).toEqual(31);
            });
            it('Check the lobPhysicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobPhysicalReads).toEqual(4);
            });
            it('Check the lobReadAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].lobReadAheadReads).toEqual(99);
            });
            it('Check the logicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].logicalReads).toEqual(2);
            });
            it('Check the physicalReads property', () => {
                expect(data.parsedStatisticsIOData[0].physicalReads).toEqual(10);
            });
            it('Check the readAheadReads property', () => {
                expect(data.parsedStatisticsIOData[0].readAheadReads).toEqual(2);
            });
            it('Check the scanCount property', () => {
                expect(data.parsedStatisticsIOData[0].scanCount).toEqual(1);
            });
            it('Check the tableName property', () => {
                expect(data.parsedStatisticsIOData[0].tableName).toEqual('Students');
            });
        });

        describe('Check parsedStatisticsTimeData Integrity', () => {
            it('There should be 1 row of parsedStatisticsTimeData data', () => {
                expect(data.parsedStatisticsTimeData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsTimeData[0].Data).toEqual('CPU time = 1000 ms,  elapsed time = 10000 ms.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsTimeData[0].InputType).toEqual(InputType.StatisticsTimeData);
            });
            it('Check the CPUTime property', () => {
                expect(data.parsedStatisticsTimeData[0].CPUTime).toEqual(1000);
            });
            it('Check the elapsedTime property', () => {
                expect(data.parsedStatisticsTimeData[0].elapsedTime).toEqual(10000);
            });
        });


    });
    describe('Check the integrity of the parsed TableQueryResult[1][2]', () => {
        const data = inputParser.GetTableQueryResult[1][2];

        describe('Check ParsedTableData Integrity', () => {
            it('There should be 2 rows of ParsedTableData data', () => {
                expect(data.parsedTableData.length).toEqual(5);
            });

            it('Check the Data for the 5 rows', () => {
                expect(data.parsedTableData[0].Data).toEqual('1,Chauncy,1,John,Knight,0,1');
                expect(data.parsedTableData[1].Data).toEqual('1,Chauncy,2,Amy,Smith,1,1');
                expect(data.parsedTableData[2].Data).toEqual('2,Ploom,3,Becca,Johnson,1,2');
                expect(data.parsedTableData[3].Data).toEqual('2,Ploom,4,Rob,Tyler,0,2');
                expect(data.parsedTableData[4].Data).toEqual('2,Ploom,5,Mark,Pop,0,2');
            });
            it('Check the Input Type for the 5 rows', () => {
                expect(data.parsedTableData[0].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[1].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[2].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[3].InputType).toEqual(InputType.TableData);
                expect(data.parsedTableData[4].InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the 5 rows', () => {
                expect(data.parsedTableData[0].tableData).toEqual('1,Chauncy,1,John,Knight,0,1');
                expect(data.parsedTableData[1].tableData).toEqual('1,Chauncy,2,Amy,Smith,1,1');
                expect(data.parsedTableData[2].tableData).toEqual('2,Ploom,3,Becca,Johnson,1,2');
                expect(data.parsedTableData[3].tableData).toEqual('2,Ploom,4,Rob,Tyler,0,2');
                expect(data.parsedTableData[4].tableData).toEqual('2,Ploom,5,Mark,Pop,0,2');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('Check the Data for the row', () => {
                expect(data.parsedTableHeader.Data).toEqual('Id,Name,Id,FirstName,LastName,Gender,SchoolID');
            });
            it('Check the Input Type for the row', () => {
                expect(data.parsedTableHeader.InputType).toEqual(InputType.TableData);
            });
            it('Check the TableData for the two rows', () => {
                expect(data.parsedTableHeader.tableData).toEqual('Id,Name,Id,FirstName,LastName,Gender,SchoolID');
            });
        });

        describe('Check ParsedTableHeader Integrity', () => {
            it('There should be only 1 row of table rows affected data', () => {
                expect(data.parsedTableRowsAffectedData.length).toEqual(1);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] has right message', () => {
                expect(data.parsedTableRowsAffectedData[0].Data).toEqual('(5 row(s) affected)');
            });
            it('Check the Data for parsedTableRowsAffectedData[0] input type ', () => {
                expect(data.parsedTableRowsAffectedData[0].InputType).toEqual(InputType.TableRowsAffectedData);
            });
            it('Check the Data for parsedTableRowsAffectedData[0] rows affected ', () => {
                expect(data.parsedTableRowsAffectedData[0].rowsAffected).toEqual(5);
            });
        });

        describe('Check parsedStatisticsIOData Integrity', () => {
            it('There should be 1 row of parsedStatisticsIOData data', () => {
                expect(data.parsedStatisticsIOData.length).toEqual(2);
            });
            it('Check the Data property[0]', () => {
                // console.log(data.parsedStatisticsIOData[0]);
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Schools\'. Scan count 30, logical reads 10, physical reads 30, read-ahead reads 30, lob logical reads 30, lob physical reads 30, lob read-ahead reads 30.');
            });
            it('Check the InputType property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].lobLogicalReads).toEqual(30);
            });
            it('Check the lobPhysicalReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].lobPhysicalReads).toEqual(30);
            });
            it('Check the lobReadAheadReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].lobReadAheadReads).toEqual(30);
            });
            it('Check the logicalReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].logicalReads).toEqual(10);
            });
            it('Check the physicalReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].physicalReads).toEqual(30);
            });
            it('Check the readAheadReads property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].readAheadReads).toEqual(30);
            });
            it('Check the scanCount property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].scanCount).toEqual(30);
            });
            it('Check the tableName property Schools[0]', () => {
                expect(data.parsedStatisticsIOData[0].tableName).toEqual('Schools');
            });
            it('Check the Data property[0]', () => {
                // console.log(data.parsedStatisticsIOData[0]);
                expect(data.parsedStatisticsIOData[0].Data).toEqual('Table \'Schools\'. Scan count 30, logical reads 10, physical reads 30, read-ahead reads 30, lob logical reads 30, lob physical reads 30, lob read-ahead reads 30.');
            });

            it('Check the Data property[1] Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].Data).toEqual('Table \'Students\'. Scan count 41, logical reads 42, physical reads 40, read-ahead reads 40, lob logical reads 40, lob physical reads 40, lob read-ahead reads 40.');
            });
            it('Check the InputType property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].InputType).toEqual(InputType.StatisticsIOData);
            });
            it('Check the lobLogicalReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].lobLogicalReads).toEqual(40);
            });
            it('Check the lobPhysicalReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].lobPhysicalReads).toEqual(40);
            });
            it('Check the lobReadAheadReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].lobReadAheadReads).toEqual(40);
            });
            it('Check the logicalReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].logicalReads).toEqual(42);
            });
            it('Check the physicalReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].physicalReads).toEqual(40);
            });
            it('Check the readAheadReads property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].readAheadReads).toEqual(40);
            });
            it('Check the scanCount property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].scanCount).toEqual(41);
            });
            it('Check the tableName property Students[1]', () => {
                expect(data.parsedStatisticsIOData[1].tableName).toEqual('Students');
            });

        });

        describe('Check parsedStatisticsTimeData Integrity', () => {
            it('There should be 1 row of parsedStatisticsTimeData data', () => {
                expect(data.parsedStatisticsTimeData.length).toEqual(1);
            });
            it('Check the Data property', () => {
                expect(data.parsedStatisticsTimeData[0].Data).toEqual('CPU time = 110 ms,  elapsed time = 220 ms.');
            });
            it('Check the InputType property', () => {
                expect(data.parsedStatisticsTimeData[0].InputType).toEqual(InputType.StatisticsTimeData);
            });
            it('Check the CPUTime property', () => {
                expect(data.parsedStatisticsTimeData[0].CPUTime).toEqual(110);
            });
            it('Check the elapsedTime property', () => {
                expect(data.parsedStatisticsTimeData[0].elapsedTime).toEqual(220);
            });
        });


    });
});
