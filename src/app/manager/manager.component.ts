import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { InputSource } from '../model/inputSource.enum';
import { SSMSParser } from '../model/ssmsParser';
import { TableQueryResult } from '../model/TableQueryResult';
import { RadarChartModel } from './radar-chart/RadarChartModel';
import { RadarData } from './radar-chart/radarData';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  @ViewChild(InputSource.From) fromInput: any;
  @ViewChild(InputSource.To) toInput: any;

  toChildFromInput = InputSource.From;
  toChildToInput = InputSource.To;
  private hasData = false;
  parsedData: Array<TableQueryResult[]>;
  private totalIO: RadarChartModel[] = new Array<RadarChartModel>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  runParser() {
    // clear data
    this.dataService.resetInput();

    // save data to service from textareas
    this.fromInput.submitData();
    this.toInput.submitData();

    // console.log(this.dataService.ssmsInput[InputSelector.From]);
    // console.log(this.dataService.ssmsInput[InputSelector.To]);
    this.parsedData = SSMSParser.ProcessInput(
      this.dataService.ssmsInput[InputSource.From],
      this.dataService.ssmsInput[InputSource.To]
    );

    this.hasDataCheck();

    const radarData = new RadarData([5, 3, 2, 2, 5], 'Query X');
    const radarChartModel = new RadarChartModel(radarData,
      ['Logical Reads', 'Physical Reads', 'Read-ahead Reads', 'Lob Logical Reads', 'Lob Read-ahead Reads']);

    this.totalIO.push(
      radarChartModel
    );

    // Calculate total for query 1 and query 2
    // assign to totalQueryData{1 and 2}
    // feed the componenets

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
