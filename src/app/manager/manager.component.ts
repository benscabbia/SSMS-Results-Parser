import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { InputSource } from '../model/inputSource.enum';
import { SSMSParser } from '../model/ssmsParser';

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
    SSMSParser.ProcessInput(
      this.dataService.ssmsInput[InputSource.From],
      this.dataService.ssmsInput[InputSource.To]
    );

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
}
