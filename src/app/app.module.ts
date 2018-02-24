import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { QueryInputComponent } from './manager/query-input/query-input.component';
import { ManagerComponent } from './manager/manager.component';
import { AppConfigService } from './services/appConfig.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QueryInputComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AppConfigService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
