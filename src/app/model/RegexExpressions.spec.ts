import { TestBed, inject } from '@angular/core/testing';

import { RegexExpressions } from './RegexExpressions';

describe('The regular expression: ', () => null);
describe('ScanCountRegex RegExp(/\Scan count (\d+)/, "i");', () => {
    const execute_ScanCountRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return Number.parseInt(RegexExpressions.ScanCountRegex.exec(testCase)[index]);
    };

    const test_executeScanCountRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.ScanCountRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('ScanCountRegex should correctly match ', () => {
        expect(1).toEqual(execute_ScanCountRegex('Scan count 1'));
        expect(11).toEqual(execute_ScanCountRegex('Scan count 11 and more'));
    });

    it('ScanCountRegex should correctly handle large numbers ', () => {
        expect(9876543210123456789).toEqual(execute_ScanCountRegex('Scan count 9876543210123456789 and more'));
        expect(12300000000).toEqual(execute_ScanCountRegex('Scan count 000000000012300000000 and more'));
    });

    it('ScanCountRegex should correctly handle mixed casing ', () => {
        expect(2).toEqual(execute_ScanCountRegex('SCAN COUNT 2 and more'));
        expect(3).toEqual(execute_ScanCountRegex('scan count 3 and more'));
    });

    it('ScanCountRegex should correctly match mix sentence scan counts', () => {
        expect(4).toEqual(execute_ScanCountRegex('abc scan count 4 and more'));
        expect(5).toEqual(execute_ScanCountRegex('scan scan count 5 and more'));
    });

    it('ScanCountRegex should correctly handle unusual numbers ', () => {
        expect(6).toEqual(execute_ScanCountRegex('scan count 6.6.6 and more'));
        expect(7).toEqual(execute_ScanCountRegex('scan count 007 and more'));
        expect(8).toEqual(execute_ScanCountRegex('scan count 8 8012 and more'));
    });

    // Not supported at the moment
    xit('ScanCountRegex should correctly matched inconsistent spacing ', () => {
        expect(2).toEqual(execute_ScanCountRegex('SCAN COUNT     2 and more'));
        expect(3).toEqual(execute_ScanCountRegex('scan count                       3 and more'));
    });

    it('ScanCountRegex should returned undefined if it cannot match ', () => {
        expect(test_executeScanCountRegex('scan count abc 123 and more')).toBeUndefined();
        expect(test_executeScanCountRegex('scan counts 123 and more')).toBeUndefined();
        expect(test_executeScanCountRegex('scan counts  and more')).toBeUndefined();
        expect(test_executeScanCountRegex('scan counts -10 and more')).toBeUndefined();
    });
});

describe('LogicalReadsRegex RegExp(/\,\s*logical reads (\d+)/, "i");', () => {
    const execute_LogicalReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return Number.parseInt(RegexExpressions.LogicalReadsRegex.exec(testCase)[index]);
    };

    const test_executeLogicalReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.LogicalReadsRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('LogicalReadsRegex should correctly match ', () => {
        expect(1).toEqual(execute_LogicalReadsRegex('abc, Logical reads 1'));
        expect(11).toEqual(execute_LogicalReadsRegex('abc, Logical reads 11 and more'));
    });

    it('LogicalReadsRegex should correctly handle large numbers ', () => {
        expect(9876543210123456789).toEqual(execute_LogicalReadsRegex('abc, Logical reads 9876543210123456789 and more'));
        expect(12300000000).toEqual(execute_LogicalReadsRegex('abc, Logical reads 000000000012300000000 and more'));
    });

    it('LogicalReadsRegex should correctly handle mixed casing ', () => {
        expect(2).toEqual(execute_LogicalReadsRegex('abc, LOGICAL READS 2 and more'));
        expect(3).toEqual(execute_LogicalReadsRegex('abc, LOgicAl ReADs 3 and more'));
    });

    it('LogicalReadsRegex should correctly match mix sentence scan counts', () => {
        expect(4).toEqual(execute_LogicalReadsRegex('logical logical, LOGICAL READS 4 and more'));
        expect(5).toEqual(execute_LogicalReadsRegex(', LOGICAL READS 5 and more'));
    });

    it('LogicalReadsRegex should correctly handle unusual numbers ', () => {
        expect(6).toEqual(execute_LogicalReadsRegex(', LOGICAL READS 6.6.6 and more'));
        expect(7).toEqual(execute_LogicalReadsRegex(', LOGICAL READS 007 and more'));
        expect(8).toEqual(execute_LogicalReadsRegex(', LOGICAL READS 8 8012 and more'));
    });

    it('LogicalReadsRegex should returned undefined if it cannot match ', () => {
        expect(test_executeLogicalReadsRegex('Logical reads 123 and more')).toBeUndefined();
        expect(test_executeLogicalReadsRegex(', Logical read 123 and more')).toBeUndefined();
        expect(test_executeLogicalReadsRegex(', Logical reads  and more')).toBeUndefined();
        expect(test_executeLogicalReadsRegex(', Logical reads -10 and more')).toBeUndefined();
    });

});

describe('PhysicalReadsRegex RegExp(/\,\s*physical reads (\d+)/, "i")', () => {
    const execute_PhysicalReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return Number.parseInt(RegexExpressions.PhysicalReadsRegex.exec(testCase)[index]);
    };

    const test_executePhysicalReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.PhysicalReadsRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('PhysicalReadsRegex should correctly match ', () => {
        expect(1).toEqual(execute_PhysicalReadsRegex('abc, Physical reads 1'));
        expect(11).toEqual(execute_PhysicalReadsRegex('abc, Physical reads 11 and more'));
    });

    it('PhysicalReadsRegex should correctly handle large numbers ', () => {
        expect(9876543210123456789).toEqual(execute_PhysicalReadsRegex('abc, Physical reads 9876543210123456789 and more'));
        expect(12300000000).toEqual(execute_PhysicalReadsRegex('abc, Physical reads 000000000012300000000 and more'));
    });

    it('PhysicalReadsRegex should correctly handle mixed casing ', () => {
        expect(2).toEqual(execute_PhysicalReadsRegex('abc, PHYSICAL READS 2 and more'));
        expect(3).toEqual(execute_PhysicalReadsRegex('abc, PHYsical ReADs 3 and more'));
    });

    it('PhysicalReadsRegex should correctly match mix sentence scan counts', () => {
        expect(4).toEqual(execute_PhysicalReadsRegex('Physical Physical, Physical READS 4 and more'));
        expect(5).toEqual(execute_PhysicalReadsRegex(', Physical READS 5 and more'));
    });

    it('PhysicalReadsRegex should correctly handle unusual numbers ', () => {
        expect(6).toEqual(execute_PhysicalReadsRegex(', Physical READS 6.6.6 and more'));
        expect(7).toEqual(execute_PhysicalReadsRegex(', Physical READS 007 and more'));
        expect(8).toEqual(execute_PhysicalReadsRegex(', Physical READS 8 8012 and more'));
    });

    it('PhysicalReadsRegex should returned undefined if it cannot match ', () => {
        expect(test_executePhysicalReadsRegex('Physical reads 123 and more')).toBeUndefined();
        expect(test_executePhysicalReadsRegex(', Physical read 123 and more')).toBeUndefined();
        expect(test_executePhysicalReadsRegex(', Physical reads  and more')).toBeUndefined();
        expect(test_executePhysicalReadsRegex(', Physical reads -10 and more')).toBeUndefined();
    });
});

describe('Read-AheadReadsRegex RegExp(/\,\s*read-ahead reads (\d+)/, "i")', () => {
    const execute_ReadAheadReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return Number.parseInt(RegexExpressions.ReadAheadReadsRegex.exec(testCase)[index]);
    };

    const test_executeReadAheadReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.ReadAheadReadsRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('Read-AheadReadsRegex should correctly match ', () => {
        expect(1).toEqual(execute_ReadAheadReadsRegex('abc, read-ahead reads 1'));
        expect(11).toEqual(execute_ReadAheadReadsRegex('abc, read-ahead reads 11 and more'));
    });

    it('Read-AheadReadsRegex should correctly handle large numbers ', () => {
        expect(9876543210123456789).toEqual(execute_ReadAheadReadsRegex('abc, read-ahead reads 9876543210123456789 and more'));
        expect(12300000000).toEqual(execute_ReadAheadReadsRegex('abc, read-ahead reads 000000000012300000000 and more'));
    });

    it('Read-AheadReadsRegex should correctly handle mixed casing ', () => {
        expect(2).toEqual(execute_ReadAheadReadsRegex('abc, READ-ahead READS 2 and more'));
        expect(3).toEqual(execute_ReadAheadReadsRegex('abc, rEaD-AhEaD ReADs 3 and more'));
    });

    it('Read-AheadReadsRegex should correctly match mix sentence scan counts', () => {
        expect(4).toEqual(execute_ReadAheadReadsRegex('read-ahead read-ahead, read-ahead READS 4 and more'));
        expect(5).toEqual(execute_ReadAheadReadsRegex(', read-ahead READS 5 and more'));
    });

    it('Read-AheadReadsRegex should correctly handle unusual numbers ', () => {
        expect(6).toEqual(execute_ReadAheadReadsRegex(', read-ahead READS 6.6.6 and more'));
        expect(7).toEqual(execute_ReadAheadReadsRegex(', read-ahead READS 007 and more'));
        expect(8).toEqual(execute_ReadAheadReadsRegex(', read-ahead READS 8 8012 and more'));
    });

    it('Read-AheadReadsRegex should returned undefined if it cannot match ', () => {
        expect(test_executeReadAheadReadsRegex('read-ahead reads 123 and more')).toBeUndefined();
        expect(test_executeReadAheadReadsRegex(', read-ahead read 123 and more')).toBeUndefined();
        expect(test_executeReadAheadReadsRegex(', read-ahead reads  and more')).toBeUndefined();
        expect(test_executeReadAheadReadsRegex(', read-ahead reads -10 and more')).toBeUndefined();
    });
});

describe('LobLogicalReadsRegex RegExp(/\lob logical reads (\d+)/, "i")', () => {
    const execute_LobLogicalReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return Number.parseInt(RegexExpressions.LobLogicalReadsRegex.exec(testCase)[index]);
    };

    const test_executeLobLogicalReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.LobLogicalReadsRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('LobLogicalReadsRegex should correctly match ', () => {
        expect(1).toEqual(execute_LobLogicalReadsRegex('abc, Lob logical reads 1'));
        expect(11).toEqual(execute_LobLogicalReadsRegex('abc, Lob logical reads 11 and more'));
    });

    it('LobLogicalReadsRegex should correctly handle large numbers ', () => {
        expect(9876543210123456789).toEqual(execute_LobLogicalReadsRegex('abc, Lob logical reads 9876543210123456789 and more'));
        expect(12300000000).toEqual(execute_LobLogicalReadsRegex('abc, Lob logical reads 000000000012300000000 and more'));
    });

    it('LobAheadReadsRegex should correctly handle mixed casing ', () => {
        expect(2).toEqual(execute_LobLogicalReadsRegex('abc, LOB LOGICAL READS 2 and more'));
        expect(3).toEqual(execute_LobLogicalReadsRegex('abc, lOB LoGicaL ReADs 3 and more'));
    });

    it('LobAheadReadsRegex should correctly match mix sentence scan counts', () => {
        expect(4).toEqual(execute_LobLogicalReadsRegex('Lob logical ahead, Lob logical READS 4 and more'));
        expect(5).toEqual(execute_LobLogicalReadsRegex(', Lob logical READS 5 and more'));
    });

    it('LobAheadReadsRegex should correctly handle unusual numbers ', () => {
        expect(6).toEqual(execute_LobLogicalReadsRegex(', Lob logical READS 6.6.6 and more'));
        expect(7).toEqual(execute_LobLogicalReadsRegex(', Lob logical READS 007 and more'));
        expect(8).toEqual(execute_LobLogicalReadsRegex(', Lob logical READS 8 8012 and more'));
    });

    it('LobAheadReadsRegex should returned undefined if it cannot match ', () => {
        expect(test_executeLobLogicalReadsRegex('Lob logical reads 123 and more')).toBeUndefined();
        expect(test_executeLobLogicalReadsRegex(', Lob logical read 123 and more')).toBeUndefined();
        expect(test_executeLobLogicalReadsRegex(', Lob logical reads  and more')).toBeUndefined();
        expect(test_executeLobLogicalReadsRegex(', Lob logical reads -10 and more')).toBeUndefined();
    });
});

describe('LobPhysicalReadsRegex RegExp(/\lob logical reads (\d+)/, "i")', () => {
    const execute_LobPhysicalReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return Number.parseInt(RegexExpressions.LobPhysicalReadsRegex.exec(testCase)[index]);
    };

    const test_executeLobPhysicalReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.LobLogicalReadsRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('LobPhysicalReadsRegex should correctly match ', () => {
        expect(1).toEqual(execute_LobPhysicalReadsRegex('abc, Lob physical reads 1'));
        expect(11).toEqual(execute_LobPhysicalReadsRegex('abc, Lob physical reads 11 and more'));
    });

    it('LobPhysicalReadsRegex should correctly handle large numbers ', () => {
        expect(9876543210123456789).toEqual(execute_LobPhysicalReadsRegex('abc, Lob physical reads 9876543210123456789 and more'));
        expect(12300000000).toEqual(execute_LobPhysicalReadsRegex('abc, Lob physical reads 000000000012300000000 and more'));
    });

    it('LobPhysicalReadsRegex should correctly handle mixed casing ', () => {
        expect(2).toEqual(execute_LobPhysicalReadsRegex('abc, LOB PHYSICAL READS 2 and more'));
        expect(3).toEqual(execute_LobPhysicalReadsRegex('abc, lOB PhysiCAL ReADs 3 and more'));
    });

    it('LobPhysicalReadsRegex should correctly match mix sentence scan counts', () => {
        expect(4).toEqual(execute_LobPhysicalReadsRegex('Lob physical ahead, Lob physical READS 4 and more'));
        expect(5).toEqual(execute_LobPhysicalReadsRegex(', Lob physical READS 5 and more'));
    });

    it('LobPhysicalReadsRegex should correctly handle unusual numbers ', () => {
        expect(6).toEqual(execute_LobPhysicalReadsRegex(', Lob physical READS 6.6.6 and more'));
        expect(7).toEqual(execute_LobPhysicalReadsRegex(', Lob physical READS 007 and more'));
        expect(8).toEqual(execute_LobPhysicalReadsRegex(', Lob physical READS 8 8012 and more'));
    });

    it('LobPhysicalReadsRegex should returned undefined if it cannot match ', () => {
        expect(test_executeLobPhysicalReadsRegex('Lob physical reads 123 and more')).toBeUndefined();
        expect(test_executeLobPhysicalReadsRegex(', Lob physical read 123 and more')).toBeUndefined();
        expect(test_executeLobPhysicalReadsRegex(', Lob physical reads  and more')).toBeUndefined();
        expect(test_executeLobPhysicalReadsRegex(', Lob physical reads -10 and more')).toBeUndefined();
    });
});

describe('Lob Read-AheadReadsRegex RegExp(/\,\s*lob read-ahead reads (\d+)/, "i")', () => {
    const execute_LobReadAheadReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return Number.parseInt(RegexExpressions.LobReadAheadRegex.exec(testCase)[index]);
    };

    const test_executeLobReadAheadReadsRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.LobReadAheadRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('Lob Read-AheadReadsRegex should correctly match ', () => {
        expect(1).toEqual(execute_LobReadAheadReadsRegex('abc, Lob read-ahead reads 1'));
        expect(11).toEqual(execute_LobReadAheadReadsRegex('abc, Lob read-ahead reads 11 and more'));
    });

    it('Lob Read-AheadReadsRegex should correctly handle large numbers ', () => {
        expect(9876543210123456789).toEqual(execute_LobReadAheadReadsRegex('abc, Lob read-ahead reads 9876543210123456789 and more'));
        expect(12300000000).toEqual(execute_LobReadAheadReadsRegex('abc, Lob read-ahead reads 000000000012300000000 and more'));
    });

    it('Lob Read-AheadReadsRegex should correctly handle mixed casing ', () => {
        expect(2).toEqual(execute_LobReadAheadReadsRegex('abc, LOB READ-ahead READS 2 and more'));
        expect(3).toEqual(execute_LobReadAheadReadsRegex('abc, lOb rEaD-AhEaD ReADs 3 and more'));
    });

    it('Lob Read-AheadReadsRegex should correctly match mix sentence scan counts', () => {
        expect(4).toEqual(execute_LobReadAheadReadsRegex('Lob read-ahead Lob read-ahead, Lob read-ahead READS 4 and more'));
        expect(5).toEqual(execute_LobReadAheadReadsRegex(',Lob read-ahead READS 5 and more'));
    });

    it('Lob Read-AheadReadsRegex should correctly handle unusual numbers ', () => {
        expect(6).toEqual(execute_LobReadAheadReadsRegex(',Lob read-ahead READS 6.6.6 and more'));
        expect(7).toEqual(execute_LobReadAheadReadsRegex(',Lob read-ahead READS 007 and more'));
        expect(8).toEqual(execute_LobReadAheadReadsRegex(',Lob read-ahead READS 8 8012 and more'));
    });

    it('Lob Read-AheadReadsRegex should returned undefined if it cannot match ', () => {
        expect(test_executeLobReadAheadReadsRegex('Lob read-ahead reads 123 and more')).toBeUndefined();
        expect(test_executeLobReadAheadReadsRegex(',Lob read-ahead read 123 and more')).toBeUndefined();
        expect(test_executeLobReadAheadReadsRegex(',Lob read-ahead reads  and more')).toBeUndefined();
        expect(test_executeLobReadAheadReadsRegex(',Lob read-ahead reads -10 and more')).toBeUndefined();
    });
});

describe('CPUTimeRegex RegExp(/\CPU time = (\d+)/, "i")', () => {
    const execute_CPUTimeRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return Number.parseInt(RegexExpressions.CPUTimeRegex.exec(testCase)[index]);
    };

    const test_executeCPUTimeRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.CPUTimeRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('CPUTimeRegex should correctly match ', () => {
        expect(1).toEqual(execute_CPUTimeRegex('CPU time = 1'));
        expect(11).toEqual(execute_CPUTimeRegex('CPU time = 11 and more'));
        expect(11).toEqual(execute_CPUTimeRegex('CPU time = 11ms and more'));
    });

    it('CPUTimeRegex should correctly handle large numbers ', () => {
        expect(9876543210123456789).toEqual(execute_CPUTimeRegex('CPU time = 9876543210123456789 and more'));
        expect(12300000000).toEqual(execute_CPUTimeRegex('CPU time = 000000000012300000000 and more'));
    });

    it('CPUTimeRegex should correctly handle mixed casing ', () => {
        expect(2).toEqual(execute_CPUTimeRegex('cpu TIME = 2 and more'));
        expect(3).toEqual(execute_CPUTimeRegex('CpU TimE = 3 and more'));
    });

    it('CPUTimeRegex should correctly match mix sentence scan counts', () => {
        expect(4).toEqual(execute_CPUTimeRegex('abc CPU time = 4 and more'));
        expect(5).toEqual(execute_CPUTimeRegex('scan CPU time = 5 and more'));
    });

    it('CPUTimeRegex should correctly handle unusual numbers ', () => {
        expect(6).toEqual(execute_CPUTimeRegex('CPU time = 6.6.6 and more'));
        expect(7).toEqual(execute_CPUTimeRegex('CPU time = 007 and more'));
        expect(8).toEqual(execute_CPUTimeRegex('CPU time = 8 8012 and more'));
    });

    it('CPUTimeRegex should returned undefined if it cannot match ', () => {
        expect(test_executeCPUTimeRegex('CPU time = abc 123 and more')).toBeUndefined();
        expect(test_executeCPUTimeRegex('CPU time = 123 and more')).toBeUndefined();
        expect(test_executeCPUTimeRegex('CPU time =  and more')).toBeUndefined();
        expect(test_executeCPUTimeRegex('CPU time 123 and more')).toBeUndefined();
        expect(test_executeCPUTimeRegex('CPU time = -10 and more')).toBeUndefined();
    });
});

describe('ElapsedTimeRegex RegExp(/\elapsed time = (\d+)/, "i")', () => {
    const execute_ElapsedTimeRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return Number.parseInt(RegexExpressions.ElapsedTimeRegex.exec(testCase)[index]);
    };

    const test_executeElapsedTimeRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.ElapsedTimeRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('ElapsedTimeRegex should correctly match ', () => {
        expect(1).toEqual(execute_ElapsedTimeRegex('Elapsed time = 1'));
        expect(11).toEqual(execute_ElapsedTimeRegex('Elapsed time = 11 and more'));
        expect(11).toEqual(execute_ElapsedTimeRegex('Elapsed time = 11ms and more'));

    });

    it('ElapsedTimeRegex should correctly handle large numbers ', () => {
        expect(9876543210123456789).toEqual(execute_ElapsedTimeRegex('Elapsed time = 9876543210123456789 and more'));
        expect(12300000000).toEqual(execute_ElapsedTimeRegex('Elapsed time = 000000000012300000000 and more'));
    });

    it('ElapsedTimeRegex should correctly handle mixed casing ', () => {
        expect(2).toEqual(execute_ElapsedTimeRegex('ELAPSED TIME = 2 and more'));
        expect(3).toEqual(execute_ElapsedTimeRegex('ELApsed TimE = 3 and more'));
    });

    it('ElapsedTimeRegex should correctly match mix sentence scan counts', () => {
        expect(4).toEqual(execute_ElapsedTimeRegex('abc Elapsed time = 4 and more'));
        expect(5).toEqual(execute_ElapsedTimeRegex('scan Elapsed time = 5 and more'));
    });

    it('ElapsedTimeRegex should correctly handle unusual numbers ', () => {
        expect(6).toEqual(execute_ElapsedTimeRegex('Elapsed time = 6.6.6 and more'));
        expect(7).toEqual(execute_ElapsedTimeRegex('Elapsed time = 007 and more'));
        expect(8).toEqual(execute_ElapsedTimeRegex('Elapsed time = 8 8012 and more'));
    });

    it('ElapsedTimeRegex should returned undefined if it cannot match ', () => {
        expect(test_executeElapsedTimeRegex('Elapsed time = abc 123 and more')).toBeUndefined();
        expect(test_executeElapsedTimeRegex('Elapsed time = 123 and more')).toBeUndefined();
        expect(test_executeElapsedTimeRegex('Elapsed time =  and more')).toBeUndefined();
        expect(test_executeElapsedTimeRegex('Elapsed time 123 and more')).toBeUndefined();
        expect(test_executeElapsedTimeRegex('Elapsed time = -10 and more')).toBeUndefined();
    });
});

describe('RowsAffectedRegex RegExp(/(\d+) row/, "i")', () => {
    const execute_RowsAffectedRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return Number.parseInt(RegexExpressions.RowsAffectedRegex.exec(testCase)[index]);
    };

    const test_executeRowsAffectedRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.RowsAffectedRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('RowsAffectedRegex should correctly match ', () => {
        expect(1).toEqual(execute_RowsAffectedRegex('1 row'));
        expect(11).toEqual(execute_RowsAffectedRegex('11 row'));
        expect(11).toEqual(execute_RowsAffectedRegex('11 rows'));

    });

    it('RowsAffectedRegex should correctly handle large numbers ', () => {
        expect(9876543210123456789).toEqual(execute_RowsAffectedRegex('9876543210123456789 rows'));
        expect(12300000000).toEqual(execute_RowsAffectedRegex('000000000012300000000 rows'));
    });

    it('RowsAffectedRegex should correctly handle mixed casing ', () => {
        expect(2).toEqual(execute_RowsAffectedRegex('2 ROWS'));
        expect(3).toEqual(execute_RowsAffectedRegex('3 rOwS'));
    });

    it('RowsAffectedRegex should correctly match mix sentence scan counts', () => {
        expect(4).toEqual(execute_RowsAffectedRegex('abc 4 rows'));
        expect(5).toEqual(execute_RowsAffectedRegex('abc abc 5 rows'));
    });

    it('RowsAffectedRegex should correctly handle unusual numbers ', () => {
        expect(6).toEqual(execute_RowsAffectedRegex('6.6.6 rows and more'));
        expect(7).toEqual(execute_RowsAffectedRegex('007 rows and more'));
        expect(8).toEqual(execute_RowsAffectedRegex('8012 8 rows rows and more'));
    });

    it('RowsAffectedRegex should returned undefined if it cannot match ', () => {
        expect(test_executeRowsAffectedRegex('abc rows 123 and more')).toBeUndefined();
        expect(test_executeRowsAffectedRegex('123 = rows = 123 and more')).toBeUndefined();
        expect(test_executeRowsAffectedRegex('rows and more')).toBeUndefined();
        expect(test_executeRowsAffectedRegex(' rows and more')).toBeUndefined();
        expect(test_executeRowsAffectedRegex('-10 rows and more')).toBeUndefined();
    });
});

describe('TableNameRegex RegExp(/\Table \'(#?\w+)\'/, "i")', () => {
    const execute_TableNameRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.TableNameRegex.exec(testCase)[index];
    };

    const test_executeTableNameRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.TableNameRegex.test(testCase)[index];
    };
    const indexer = 1;

    it('TableNameRegex should correctly match ', () => {
        expect('Person').toEqual(execute_TableNameRegex('Table \'Person\''));
        expect('Person').toEqual(execute_TableNameRegex('Table \'Person\''));
    });

    it('TableNameRegex should correctly handle large text ', () => {
        expect('qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm').toEqual(execute_TableNameRegex('Table \'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm\' and more'));
        expect('00012300000000').toEqual(execute_TableNameRegex('Table \'00012300000000\' and more'));
    });

    it('TableNameRegex should correctly handle mixed casing ', () => {
        expect('PERSON').toEqual(execute_TableNameRegex('TABLE \'PERSON\' and more'));
        expect('PeRSON').toEqual(execute_TableNameRegex('TaBlE \'PeRSON\' and more'));
        expect('PERSON').toEqual(execute_TableNameRegex('TABLE \'PERSON\' and more'));
        expect('PERSON').not.toEqual(execute_TableNameRegex('TABLE \'PERSoN\' and more'));
        expect('person').not.toEqual(execute_TableNameRegex('TABLE \'Person\' and more'));

    });

    it('TableNameRegex should correctly match mix sentence table names', () => {
        expect('person').toEqual(execute_TableNameRegex('abc Table \'person\'  and more'));
        expect('person').toEqual(execute_TableNameRegex('table Table \'person\' and more'));
    });

    it('TableNameRegex should correctly handle unusual text ', () => {
        expect('6').toEqual(execute_TableNameRegex('Table \'6\'.6.6 and more'));
        expect('007').toEqual(execute_TableNameRegex('Table \'007\' and more'));
        expect('8').toEqual(execute_TableNameRegex('Table \'8\' 8012 and more'));
        expect('a').toEqual(execute_TableNameRegex('Table \'a\' and more'));
        // Probably should support these...
        // expect('Person-Table').toEqual(execute_TableNameRegex('table \'Person-Table.\'and more'));
        // expect('Person_Table').toEqual(execute_TableNameRegex('table \'Person_Table.\'and more'));
        // expect(' Person ').toEqual(execute_TableNameRegex('Table \' Person \''));

    });

    it('TableNameRegex should returned undefined if it cannot match ', () => {
        expect(test_executeTableNameRegex('Table = \'abc\' 123 and more')).toBeUndefined();
        expect(test_executeTableNameRegex('Table = 123 and more')).toBeUndefined();
        expect(test_executeTableNameRegex('tables \'time\' and more')).toBeUndefined();
        expect(test_executeTableNameRegex('table \"\" and more')).toBeUndefined();
        expect(test_executeTableNameRegex('table \'and more')).toBeUndefined();
        expect(test_executeTableNameRegex('table \'.\'and more')).toBeUndefined();
        expect(test_executeTableNameRegex('ttable \'Person\'')).toBeUndefined();
        expect(test_executeTableNameRegex('tablee \'Person\'')).toBeUndefined();

    });
});

xdescribe('TableDataRegex RegExp(/([^,]+)/, "g") - NOT USED Currently', () => {
    const execute_TableDataRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.TableDataRegex.exec(testCase)[index];
    };

    const test_executeTableDataRegex = function (testCase, index?) {
        if (index === undefined) { index = 1; }
        return RegexExpressions.TableDataRegex.test(testCase)[index];
    };
    const indexer = 1;
});
