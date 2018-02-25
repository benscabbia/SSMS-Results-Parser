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

  private _radarChartLabels: string[] = ['default'];
  private _radarChartType: string = 'radar';
  private _radarChartData: any = [{data: [0], label: 'default', lineTension: 0}];

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

    this.radarChartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'die']; // this.element[0].radarChartLabels;
    this.radarChartType = this.element[0].radarChartType;
    const cData = this.element[0].radarChartData;
    this.radarChartData = [
      { data: cData.data, label: cData.label, lineTension: cData.lineTension}
    ];
    // bug with updating labels, view definition of chart in this page
    this.chart.chart.config.data.labels = this.element[0].radarChartLabels;
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
