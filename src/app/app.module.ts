import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { QueryInputComponent } from './manager/query-input/query-input.component';
import { ManagerComponent } from './manager/manager.component';
import { AppConfigService } from './services/appConfig.service';
import { DataService } from './services/data.service';
import { ChartsModule } from 'ng2-charts';
import { RadarChartComponent } from './manager/radar-chart/radar-chart.component';
import { BarChartComponent } from './manager/bar-chart/bar-chart.component';
import { GenericTableComponent } from './manager/generic-table/generic-table.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QueryInputComponent,
    ManagerComponent,
    RadarChartComponent,
    BarChartComponent,
    GenericTableComponent
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule
    RouterModule.forRoot(routes)
  ],
  providers: [AppConfigService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
