import { Component, OnInit, OnChanges, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { RadarChartModel } from './RadarChartModel';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
// https://github.com/valor-software/ng2-charts/tree/master
export class RadarChartComponent implements OnInit, OnChanges {
  @Input() element: RadarChartModel[] = null;

  // We require accessing the child due to bug with updating labels: https://github.com/valor-software/ng2-charts/issues/774#issuecomment-298263293
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  private _radarChartLabels: string[] =
    [
      'Scan Count',
      'Logical Reads',
      'Physical Reads',
      'Read-ahead Reads',
      // 'Lob Logical Reads',
      // 'Lob Physical Reads',
      // 'Lob Read-ahead Reads'
    ];
  private _radarChartType: string = 'radar';
  private _radarChartData: any =
    [
      { data: [0], label: 'No Query 1', lineTension: 0 },
      { data: [0], label: 'No Query 2', lineTension: 0 }
    ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor() {
    this.element = new Array<RadarChartModel>();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (!this.element || this.element.length < 1) { return; }

    // always radar, so grab first
    this.radarChartType = this.element[0].radarChartType;

    this.radarChartData = [];
    this.element.forEach(element => {
      const cData = element.radarChartData;
      const temp = { data: cData.data, label: cData.label, lineTension: cData.lineTension };
      this.radarChartData.push(temp);
    });

    // bug in charts where the number of _radarChartData determines the number of data queries it expects
    // regardless of its cycle. We default to 2, so if 1, we return an empty data set to avoid exception
    if (this.radarChartData.length === 1) {
      const temp = { data: [-1], label: 'No Query 2', lineTension: 0.2 };
      this.radarChartData.push(temp);
    }

    // bug with updating labels, view definition of chart in this page. On first load not available though.
    if (this.chart.chart !== undefined && this.chart.chart.config !== undefined) {
      this.chart.chart.config.data.labels = this.element[0].radarChartLabels;
    }
  }


  public get radarChartLabels(): string[] {
    return this._radarChartLabels;
  }

  public set radarChartLabels(value: string[]) {
    this._radarChartLabels = value;
  }


  public get radarChartType(): string {
    return this._radarChartType;
  }

  public set radarChartType(value: string) {
    this._radarChartType = value;
  }


  public get radarChartData(): any {
    return this._radarChartData;
  }

  public set radarChartData(value: any) {
    this._radarChartData = value;
  }

}
