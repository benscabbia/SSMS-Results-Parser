import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServersComponent implements OnInit {
  userName = '';
  constructor() { }

  ngOnInit() {
  }

  onClickyButton(){
    this.userName = "";
  }

  

}
