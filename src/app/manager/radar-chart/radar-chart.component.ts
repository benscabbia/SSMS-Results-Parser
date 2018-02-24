import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
// https://github.com/valor-software/ng2-charts/tree/master
export class RadarChartComponent implements OnInit {

  public radarChartLabels: string[] = ['Scan Count', 'Logical Reads', 'Physical Reads', 'Read-ahead Reads', 'Lob Logical Reads', 'Lob Physical Reads', 'Lob Read-ahead Reads'];

  public radarChartData: any = [
    {data: [12, 14, 1, 1, 1, 1, 1], label: 'Query 1', lineTension: 0.2},
    {data: [14, 11, 2, 2, 2, 2, 2], label: 'Query 2', lineTension: 0.2}
  ];
  public radarChartType = 'radar';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
