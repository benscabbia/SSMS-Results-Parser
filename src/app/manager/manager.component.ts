import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  @ViewChild('fromInput') fromInput: any;
  @ViewChild('toInput') toInput: any;
  

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  runParser(){
    //clear data 
    this.dataService.resetInput();
    
    // save data to service from textareas
    this.fromInput.submitData();  
    this.toInput.submitData();    
    
  }

}
