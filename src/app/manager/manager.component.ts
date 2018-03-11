import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { DataProcessor } from './DataProcessor';
import { InputSource } from '../model/inputSource.enum';
import { TableQueryResult } from '../model/TableQueryResult';
import { RadarChartModel } from './radar-chart/RadarChartModel';
import { RadarData } from './radar-chart/radarData';
import { InputParser } from './InputParser';
import { TableData } from './generic-table/TableData';
import { TableRowData } from './generic-table/TableRowData';
import { TableHeader } from './generic-table/TableHeader';
import { TotalIOData } from '../model/TotalIOData';
import { TotalTimeData } from '../model/TotalTimeData';
import { BarData } from './bar-chart/barData';
import { BarChartModel } from './bar-chart/BarChartModel';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  @ViewChild(InputSource.From) fromInput: any;
  @ViewChild(InputSource.To) toInput: any;

  _addLobToCharts = false;
  toChildFromInput = InputSource.From;
  toChildToInput = InputSource.To;
  hasData = false;
  parsedData: Array<TableQueryResult[]>;
  _tableDetailedData: TableData[];

  private totalIO: RadarChartModel[] = new Array<RadarChartModel>();
  private tableIOData: TableData;

  private tableTimeData: TableData;
  private totalTime: BarChartModel[] = new Array<BarChartModel>();



  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  runParser() {
    // clear data
    this.dataService.resetInput();

    // save data to service from textareas
    this.fromInput.submitData();
    this.toInput.submitData();

    this.parsedData = new InputParser(
      this.dataService.ssmsInput[InputSource.From],
      this.dataService.ssmsInput[InputSource.To]
    ).GetTableQueryResult;

    this.hasDataCheck();

    const data = new DataProcessor(this.parsedData);

    if (!data.query1HasData && !data.query2HasData) {
      return;
    }

    let labelsIO = ['Scan Count', 'Logical Reads', 'Physical Reads', 'Read-ahead Reads'];
    const labelsTime = ['CPU Time', 'Elapsed Time'];

    if (this._addLobToCharts) {
      labelsIO = labelsIO.concat(['Lob Logical Reads', 'Lob Phyiscal Reads', 'Lob Read-ahead Reads']);
    }

    let query2Label = 'No Query 2';
    let totalIO2 = new TotalIOData();
    let totalTime2 = new TotalTimeData();

    if (data.query1HasData) {
      const radarData = new RadarData(
        [
          data.query1TotalIO.scanCount,
          data.query1TotalIO.logicalReads,
          data.query1TotalIO.physicalReads,
          data.query1TotalIO.readAheadReads,
        ], 'Query 1'
      );

      if (this._addLobToCharts) {
        radarData.appendData(
          [
            data.query1TotalIO.lobLogicalReads,
            data.query1TotalIO.lobPhysicalReads,
            data.query1TotalIO.lobReadAheadReads
          ]
        );
      }

      const radarChartModel = new RadarChartModel(radarData, labelsIO);
      this.totalIO.push(
        radarChartModel
      );

      const barData = new BarData(
        [
          data.query1TotalTime.cpuTime,
          data.query1TotalTime.elapsedTime
        ],
        'Query 1'
      );
      const barChartModel = new BarChartModel(barData, labelsTime);
      this.totalTime.push(
        barChartModel
      );
    }

    if (data.query2HasData) {
      query2Label = 'Query 2';
      totalIO2 = data.query2TotalIO;
      totalTime2 = data.query2TotalTime;

      const radarData = new RadarData(
        [
          data.query2TotalIO.scanCount,
          data.query2TotalIO.logicalReads,
          data.query2TotalIO.physicalReads,
          data.query2TotalIO.readAheadReads,
        ], 'Query 2'
      );

      if (this._addLobToCharts) {
        radarData.appendData(
          [
            data.query2TotalIO.lobLogicalReads,
            data.query2TotalIO.lobPhysicalReads,
            data.query2TotalIO.lobReadAheadReads
          ]
        );
      }


      const radarChartModel = new RadarChartModel(radarData, labelsIO);
      this.totalIO.push(
        radarChartModel
      );

      const barData = new BarData(
        [
          data.query2TotalTime.cpuTime,
          data.query2TotalTime.elapsedTime
        ],
        'Query 2'
      );
      const barChartModel = new BarChartModel(barData, labelsTime);
      this.totalTime.push(
        barChartModel
      );
    }

    this.populateTotalIOTableData(data.query1TotalIO, totalIO2, query2Label);
    this.populateTotalTimeTableData(data.query1TotalTime, totalTime2, query2Label);
    this.populateDetailedTableData(this.parsedData);
  }
  // Populates indiviudal tables data, needs urgent refactoring.
  private populateDetailedTableData(queries: Array<TableQueryResult[]>) {

    const tableData = new Array<TableData>();

    // ensure if we have 2 queries that the data is indeed comparable
    if (queries.length === 2) {
      if (queries[0].length !== queries[1].length) {
        return;
      }
    }

    let query2Label = 'No Query 2';

    if (queries.length === 1) {
      const header = new TableHeader('', 'Query 1', query2Label, 'Best');
      queries[0].forEach(table => {

        const tableRowData: TableRowData[] = new Array<TableRowData>();
        // IO Data
        let totalScan = 0, totalLogicalReads = 0, totalPhysicalReads = 0, totalReadAheadReads = 0;
        let tableName = '';

        // Time Data
        let totalCpuTime = 0, totalElapsedTime = 0;

        // If table join will have multiple results
        table.parsedStatisticsIOData.forEach(element => {
          tableName += tableName.length === 0 ? element.tableName : ' x ' + element.tableName;
          totalScan += element.scanCount;
          totalLogicalReads += element.logicalReads;
          totalPhysicalReads += element.physicalReads;
          totalReadAheadReads += element.readAheadReads;
        });

        table.parsedStatisticsTimeData.forEach(element => {
          totalCpuTime += element.CPUTime;
          totalElapsedTime += element.elapsedTime;
        });

        tableRowData.push(new TableRowData('Scan Count', totalScan, -1));
        tableRowData.push(new TableRowData('Logical Reads', totalLogicalReads, -1));
        tableRowData.push(new TableRowData('Physical Reads', totalPhysicalReads, -1));
        tableRowData.push(new TableRowData('Read-ahead Reads', totalReadAheadReads, -1));
        tableRowData.push(new TableRowData('Total CPU Time', totalCpuTime, -1));
        tableRowData.push(new TableRowData('Total Elapsed Time', totalElapsedTime, -1));


        tableData.push(new TableData(tableName, header, tableRowData, 'panel panel-default'));
      });
    }

    if (queries.length === 2) {
      query2Label = 'Query 2';
      const header = new TableHeader('', 'Query 1', query2Label, 'Best');

      const tableRowHolder = {};
      queries[0].forEach(table => {

        const tableRowData: TableRowData[] = new Array<TableRowData>();
        // IO Data
        let totalScan = 0, totalLogicalReads = 0, totalPhysicalReads = 0, totalReadAheadReads = 0;
        let tableName = '';

        // Time Data
        let totalCpuTime = 0, totalElapsedTime = 0;

        table.parsedStatisticsIOData.forEach(element => {
          tableName += tableName.length === 0 ? element.tableName : ' x ' + element.tableName;
          totalScan += element.scanCount;
          totalLogicalReads += element.logicalReads;
          totalPhysicalReads += element.physicalReads;
          totalReadAheadReads += element.readAheadReads;
        });

        table.parsedStatisticsTimeData.forEach(element => {
          totalCpuTime += element.CPUTime;
          totalElapsedTime += element.elapsedTime;
        });

        tableRowHolder[tableName] = {
          'Scan Count': totalScan,
          'Logical Reads': totalLogicalReads,
          'Physical Reads': totalPhysicalReads,
          'Read-ahead Reads': totalReadAheadReads,
          'Total CPU Time': totalCpuTime,
          'Total Elapsed Time': totalElapsedTime
        };
      });
      queries[1].forEach(table => {
        const tableRowData: TableRowData[] = new Array<TableRowData>();
        // IO Data
        let totalScan = 0, totalLogicalReads = 0, totalPhysicalReads = 0, totalReadAheadReads = 0;
        let tableName = '';
        // Time Data
        let totalCpuTime = 0, totalElapsedTime = 0;

        table.parsedStatisticsIOData.forEach(element => {
          tableName += tableName.length === 0 ? element.tableName : ' x ' + element.tableName;
          totalScan += element.scanCount;
          totalLogicalReads += element.logicalReads;
          totalPhysicalReads += element.physicalReads;
          totalReadAheadReads += element.readAheadReads;
        });

        table.parsedStatisticsTimeData.forEach(element => {
          totalCpuTime += element.CPUTime;
          totalElapsedTime += element.elapsedTime;
        });

        tableRowData.push(new TableRowData('Scan Count', tableRowHolder[tableName]['Scan Count'], totalScan));
        tableRowData.push(new TableRowData('Logical Reads', tableRowHolder[tableName]['Logical Reads'], totalLogicalReads));
        tableRowData.push(new TableRowData('Physical Reads', tableRowHolder[tableName]['Physical Reads'], totalPhysicalReads));
        tableRowData.push(new TableRowData('Read-ahead Reads', tableRowHolder[tableName]['Read-ahead Reads'], totalReadAheadReads));
        tableRowData.push(new TableRowData('Total CPU Time', tableRowHolder[tableName]['Total CPU Time'], totalCpuTime));
        tableRowData.push(new TableRowData('Total Elapsed Time', tableRowHolder[tableName]['Total Elapsed Time'], totalElapsedTime));

        tableData.push(new TableData(tableName, header, tableRowData, 'panel panel-default'));
      });
    }

    this._tableDetailedData = tableData;

  }

  private populateTotalTimeTableData(totalTime1: TotalTimeData, totalTime2: TotalTimeData, query2Label: string) {
    const tableHeader: TableHeader = new TableHeader('', 'Query 1', query2Label, 'Best');
    const tableRowData: TableRowData[] = new Array<TableRowData>();

    tableRowData.push(new TableRowData('CPU Time', totalTime1.cpuTime, totalTime2.cpuTime));
    tableRowData.push(new TableRowData('Elapsed Time', totalTime1.elapsedTime, totalTime2.elapsedTime));
    this.tableTimeData = new TableData('Total Time', tableHeader, tableRowData, 'panel panel-success');
  }

  private populateTotalIOTableData(totalIO1: TotalIOData, totalIO2: TotalIOData, query2Label: string) {
    const tableHeader: TableHeader = new TableHeader('', 'Query 1', query2Label, 'Best');
    const tableRowData: TableRowData[] = new Array<TableRowData>();
    tableRowData.push(new TableRowData('Scan Count', totalIO1.scanCount, totalIO2.scanCount));
    tableRowData.push(new TableRowData('Logical Reads', totalIO1.logicalReads, totalIO2.logicalReads));
    tableRowData.push(new TableRowData('Physical Reads', totalIO1.physicalReads, totalIO2.physicalReads));
    tableRowData.push(new TableRowData('Read-ahead Reads', totalIO1.readAheadReads, totalIO2.readAheadReads));
    tableRowData.push(new TableRowData('Lob Logical Reads', totalIO1.lobLogicalReads, totalIO2.lobLogicalReads));
    tableRowData.push(new TableRowData('Lob Physical Reads', totalIO1.lobPhysicalReads, totalIO2.lobPhysicalReads));
    tableRowData.push(new TableRowData('Lob Read-ahead Reads', totalIO1.lobReadAheadReads, totalIO2.lobReadAheadReads));
    this.tableIOData = new TableData('Total IO', tableHeader, tableRowData, 'panel panel-primary');
  }

  populateFrom() {
    // Populate from
    // this.dataService.dummyData
    this.fromInput.populateFromDummyData();
    console.log('pop from');
  }

  populateFromTo() {
    // Populate fromTo
    this.fromInput.populateFromDummyData();
    this.toInput.populateToDummyData();
  }

  swapInput() {
    const temp = this.fromInput.textInput;
    this.fromInput.setData(this.toInput.textInput);
    this.toInput.setData(temp);
  }

  clearDataFrom() {
    this.fromInput.clearData();
  }

  clearDataTo() {
    this.toInput.clearData();
  }

  hasDataCheck() {
    if (this.parsedData.length > 0) {
      this.hasData = true;
    } else {
      this.hasData = false;
    }
    // reset data
    this.totalIO = new Array<RadarChartModel>();
    this.totalTime = new Array<BarChartModel>();
  }
}
