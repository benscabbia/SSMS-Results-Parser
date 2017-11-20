import { Component, OnInit } from '@angular/core';
import { AppConfigService } from "./services/appConfig.service";
import './model/extensions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  
  constructor(private appConfigService: AppConfigService){}
  
  ngOnInit(): void {
    this.title = this.appConfigService.applicationTitle;
  }
}
