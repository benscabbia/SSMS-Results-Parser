import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AppConfigService } from "./services/appConfig.service";
import { QueryInputComponent } from './query-input/query-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QueryInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AppConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
