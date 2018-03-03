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
  private tableData: TableData;

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

    const labels = ['Logical Reads', 'Physical Reads', 'Read-ahead Reads', 'Lob Logical Reads', 'Lob Phyiscal Reads', 'Lob Read-ahead Reads'];

    if (data.query1HasData && data.query2HasData) {

      const tableHeader: TableHeader = new TableHeader('', 'Query 1', 'Query 2', 'Best');
      const tableRowData: TableRowData[] = new Array<TableRowData>();
      const totalIO1 = data.query1TotalIO;
      const totalIO2 = data.query2TotalIO;
      tableRowData.push(new TableRowData('Scan Count', totalIO1.scanCount, totalIO2.scanCount));
      tableRowData.push(new TableRowData('Logical Reads', totalIO1.logicalReads, totalIO2.logicalReads));
      tableRowData.push(new TableRowData('Physical Reads', totalIO1.physicalReads, totalIO2.physicalReads));
      tableRowData.push(new TableRowData('Read Ahead Reads', totalIO1.readAheadReads, totalIO2.readAheadReads));
      tableRowData.push(new TableRowData('Lob Logical Reads', totalIO1.lobLogicalReads, totalIO2.lobLogicalReads));
      tableRowData.push(new TableRowData('Lob Physical Reads', totalIO1.lobPhysicalReads, totalIO2.lobPhysicalReads));
      tableRowData.push(new TableRowData('Lob Read Ahead Reads', totalIO1.lobReadAheadReads, totalIO2.lobReadAheadReads));
      this.tableData = new TableData('Total IO', tableHeader, tableRowData);
      // return;
    }

    if (data.query1HasData) {
      // const radarData = new RadarData([5, 3, 2, 2, 5], 'Query X');
      // const radarChartModel = new RadarChartModel(radarData,
      //   ['Logical Reads', 'Physical Reads', 'Read-ahead Reads', 'Lob Logical Reads', 'Lob Read-ahead Reads']);
      const radarData = new RadarData(
        [
          data.query1TotalIO.logicalReads,
          data.query1TotalIO.physicalReads,
          data.query1TotalIO.readAheadReads,
          data.query1TotalIO.lobLogicalReads,
          data.query1TotalIO.lobPhysicalReads,
          data.query1TotalIO.lobReadAheadReads
        ], 'Query 1'
      );
      const radarChartModel = new RadarChartModel(radarData, labels);
      this.totalIO.push(
        radarChartModel
      );
    }

    if (data.query2HasData) {
      // const radarData = new RadarData([5, 3, 2, 2, 5], 'Query X');
      // const radarChartModel = new RadarChartModel(radarData,
      //   ['Logical Reads', 'Physical Reads', 'Read-ahead Reads', 'Lob Logical Reads', 'Lob Read-ahead Reads']);
      const radarData = new RadarData(
        [
          data.query2TotalIO.logicalReads,
          data.query2TotalIO.physicalReads,
          data.query2TotalIO.readAheadReads,
          data.query2TotalIO.lobLogicalReads,
          data.query2TotalIO.lobPhysicalReads,
          data.query2TotalIO.lobReadAheadReads
        ], 'Query 2'
      );
      const radarChartModel = new RadarChartModel(radarData, labels);
      this.totalIO.push(
        radarChartModel
      );
    }
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
  }
}
