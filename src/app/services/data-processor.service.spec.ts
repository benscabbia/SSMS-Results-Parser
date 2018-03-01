import { TestBed, inject } from '@angular/core/testing';

import { DataProcessorService } from './data-processor.service';
import { TableQueryResult } from '../model/TableQueryResult';
import { TotalTimeData } from '../model/TotalTimeData';
import { TotalIOData } from '../model/TotalIOData';
import { SSMSParser } from '../model/ssmsParser';

describe('Data processor behaves as expected when receiving null data', () => {
  const tableTestData = null;

  it('QueryNHasData Should handle null data correctly', () => {
    const dataProcessorService = new DataProcessorService(tableTestData);
    expect(dataProcessorService.query1HasData).toBe(false);
    expect(dataProcessorService.query2HasData).toBe(false);
  });

  it('Should handle totalTime data correctly', () => {
    const dataProcessorService = new DataProcessorService(tableTestData);
    expect(dataProcessorService.query1TotalTime).toBeNull();
    expect(dataProcessorService.query2TotalTime).toBeNull();
  });

  it('Should handle totalIO data correctly', () => {
    const dataProcessorService = new DataProcessorService(tableTestData);
    expect(dataProcessorService.query1TotalIO).toBeNull();
    expect(dataProcessorService.query2TotalIO).toBeNull();
  });
});

describe('Data processor behaves as expected when receiving empty data', () => {
  const tableTestData =
    [
      [new TableQueryResult(), new TableQueryResult(), new TableQueryResult()],
      [new TableQueryResult(), new TableQueryResult(), new TableQueryResult()]
    ];

  it('QueryNHasData Should handle empty data correctly, only checks 1 level', () => {
    const dataProcessorService = new DataProcessorService(tableTestData);
    expect(dataProcessorService.query1HasData).toBe(true);
    expect(dataProcessorService.query2HasData).toBe(true);
  });

  it('Should handle totalTime data correctly, default TotalTimeData 0,0', () => {
    const dataProcessorService = new DataProcessorService(tableTestData);
    expect(dataProcessorService.query1TotalTime).toEqual(new TotalTimeData());
    expect(dataProcessorService.query2TotalTime).toEqual(new TotalTimeData());
  });

  it('Should handle totalIO data correctly', () => {
    const dataProcessorService = new DataProcessorService(tableTestData);
    expect(dataProcessorService.query1TotalIO).toEqual(new TotalIOData());
    expect(dataProcessorService.query2TotalIO).toEqual(new TotalIOData());
  });
});

xdescribe('Data processor behaves as expected when receiving real data (both)', () => {
  const dummyTestData = `
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

    Table 'Students'. Scan count 1, logical reads 2, physical reads 0, read-ahead reads 0, lob logical reads 0, lob physical reads 0, lob read-ahead reads 0.

     SQL Server Execution Times:
       CPU time = 0 ms,  elapsed time = 0 ms.
    Id,Name,Id,FirstName,LastName,Gender,SchoolID
    1,Chauncy,1,John,Knight,0,1
    1,Chauncy,2,Amy,Smith,1,1
    2,Ploom,3,Becca,Jonson,1,2
    2,Ploom,4,Rob,Tyler,0,2
    2,Ploom,5,Mark,Pop,0,2

    (5 row(s) affected)

    Table 'Schools'. Scan count 0, logical reads 10, physical reads 0, read-ahead reads 0, lob logical reads 0, lob physical reads 0, lob read-ahead reads 0.
    Table 'Students'. Scan count 1, logical reads 2, physical reads 0, read-ahead reads 0, lob logical reads 0, lob physical reads 0, lob read-ahead reads 0.

     SQL Server Execution Times:
       CPU time = 0 ms,  elapsed time = 0 ms.
    `;

    const tableTestData = SSMSParser.ProcessInput(dummyTestData, dummyTestData);

  it('QueryNHasData Should handle real data correctly', () => {
    const dataProcessorService = new DataProcessorService(tableTestData);
    expect(dataProcessorService.query1HasData).toBe(true);
    expect(dataProcessorService.query2HasData).toBe(true);
  });

  xit('Should handle totalTime data correctly, default TotalTimeData 0,0', () => {
    const dataProcessorService = new DataProcessorService(tableTestData);
    expect(dataProcessorService.query1TotalTime).toEqual(new TotalTimeData());
    expect(dataProcessorService.query2TotalTime).toEqual(new TotalTimeData());
  });

  xit('Should handle totalIO data correctly', () => {
    const dataProcessorService = new DataProcessorService(tableTestData);
    expect(dataProcessorService.query1TotalIO).toEqual(new TotalIOData());
    expect(dataProcessorService.query2TotalIO).toEqual(new TotalIOData());
  });
});
