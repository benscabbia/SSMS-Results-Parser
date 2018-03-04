import { Component, OnInit, OnChanges, ViewEncapsulation, Input } from '@angular/core';
import { BarChartModel } from './BarChartModel';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() element: BarChartModel[] = null;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['CPU', 'Elapsed Time'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [0], label: 'No Query 1' },
    { data: [0], label: 'No Query 2' }
  ];
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   const data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   const clone = JSON.parse(JSON.stringify(this.barChartData));
  //   clone[0].data = data;
  //   this.barChartData = clone;
  // }


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.element || this.element.length < 1) { return; }

    // always bar, so grab first
    this.barChartType = this.element[0].barChartType;

    this.barChartData = [];
    this.element.forEach(element => {
      const cData = element.barChartData;
      const temp = { data: cData.data, label: cData.label };
      this.barChartData.push(temp);
    });

    // bug in charts where the number of _radarChartData determines the number of data queries it expects
    // regardless of its cycle. We default to 2, so if 1, we return an empty data set to avoid exception
    if (this.barChartData.length === 1) {
      const temp = { data: [0], label: 'No Query 2' };
      this.barChartData.push(temp);
    }
  }

}
