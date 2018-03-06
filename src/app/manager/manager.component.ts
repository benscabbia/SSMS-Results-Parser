import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { DataProcessor } from './DataProcessor';
import { InputSource } from '../model/inputSource.enum';
import { SSMSParser } from '../model/ssmsParser';
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

  toChildFromInput = InputSource.From;
  toChildToInput = InputSource.To;
  private hasData = false;
  parsedData: Array<TableQueryResult[]>;
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

    const labelsIO = ['Scan Count', 'Logical Reads', 'Physical Reads', 'Read-ahead Reads', 'Lob Logical Reads', 'Lob Phyiscal Reads', 'Lob Read-ahead Reads'];
    const labelsTime = ['CPU Time', 'Elapsed Time'];

    if (!data.query1HasData && !data.query2HasData) {
      return;
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
          data.query1TotalIO.lobLogicalReads,
          data.query1TotalIO.lobPhysicalReads,
          data.query1TotalIO.lobReadAheadReads
        ], 'Query 1'
      );
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
          data.query2TotalIO.lobLogicalReads,
          data.query2TotalIO.lobPhysicalReads,
          data.query2TotalIO.lobReadAheadReads
        ], 'Query 2'
      );
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
    this.fromInput.populateDummyData();
    console.log('pop from');
  }

  populateFromTo() {
    // Populate fromTo
    this.fromInput.populateDummyData();
    this.toInput.populateDummyData();
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
