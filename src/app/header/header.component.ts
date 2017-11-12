import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AppConfigService } from "../services/appConfig.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  title: any;

  @Input() appName: string;

  constructor(private appConfigService: AppConfigService){}
  
  ngOnInit(): void {
    this.title = this.appConfigService.applicationTitle;
  }

}
