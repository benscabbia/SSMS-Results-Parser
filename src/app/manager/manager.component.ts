import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataService } from "../services/data.service";
import { InputSelector } from "../model/inputSelector.enum";
import { SSMSParser } from "../model/ssmsParser";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  @ViewChild(InputSelector.From) fromInput: any;
  @ViewChild(InputSelector.To) toInput: any;
  
  toChildFromInput = InputSelector.From;
  toChildToInput = InputSelector.To;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  runParser(){
    //clear data 
    this.dataService.resetInput();
    
    // save data to service from textareas
    this.fromInput.submitData();  
    this.toInput.submitData();    

    // console.log(this.dataService.ssmsInput[InputSelector.From]);
    // console.log(this.dataService.ssmsInput[InputSelector.To]);
    SSMSParser.ProcessInput(
      this.dataService.ssmsInput[InputSelector.From],
      this.dataService.ssmsInput[InputSelector.To]
    );
    
  }

  populateFrom(){
    // Populate from 
    //this.dataService.dummyData
    this.fromInput.populateDummyData();
    console.log("pop from");
  }

  populateFromTo(){
    // Populate fromTo 
    this.fromInput.populateDummyData();
    this.toInput.populateDummyData();
  }

  clearDataFrom(){
    this.fromInput.clearData();
  }
  
  clearDataTo(){
    this.toInput.clearData();
  }
}
