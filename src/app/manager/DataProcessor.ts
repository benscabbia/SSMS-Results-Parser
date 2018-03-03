import { Injectable } from '@angular/core';
import { TableQueryResult } from '../model/TableQueryResult';
import { TotalIOData } from '../model/TotalIOData';
import { TotalTimeData } from '../model/TotalTimeData';
import { element } from 'protractor';

export class DataProcessor {


  private _query1ParsedData: TableQueryResult[];
  private _query2ParsedData: TableQueryResult[];
  private _areDataSetsEqual: boolean = false;
  private _query1HasData: boolean = false;
  private _query2HasData: boolean = false;

  private _totalIO: any[];
  private _query1TotalIO: TotalIOData;
  private _query2TotalIO: TotalIOData;
  private _query1TotalTime: TotalTimeData;
  private _query2TotalTime: TotalTimeData;


  constructor(parsedData: TableQueryResult[][]) {
    this.Calculate(parsedData);
  }

  private Calculate(parsedData: TableQueryResult[][]): void {

    if (parsedData && parsedData[0]) {
      this._query1ParsedData = parsedData[0];
      this._query1HasData = true;
    }
    if (parsedData && parsedData[1]) {
      this._query2ParsedData = parsedData[1];
      this._query2HasData = true;
    }

    if (this.HasDoubleQuery()) {
      this._areDataSetsEqual = this._query1ParsedData.length === this._query2ParsedData.length;
    }

    this._query1TotalIO = this.CalculateTotalIO(this._query1ParsedData);
    this._query2TotalIO = this.CalculateTotalIO(this._query2ParsedData);
    this._query1TotalTime = this.CalculateTotalTime(this._query1ParsedData);
    this._query2TotalTime = this.CalculateTotalTime(this._query2ParsedData);



  }

  private CalculateTotalIO(data: TableQueryResult[]): TotalIOData {
    const totalIO = new TotalIOData();

    if (!data || data.length < 1) { return null; }

    data.forEach(outerElement => {
      outerElement.parsedStatisticsIOData.forEach(innerElement => {
        totalIO.scanCount += innerElement.scanCount;
        totalIO.logicalReads += innerElement.logicalReads;
        totalIO.physicalReads += innerElement.physicalReads;
        totalIO.readAheadReads += innerElement.readAheadReads;
        totalIO.lobLogicalReads += innerElement.lobLogicalReads;
        totalIO.lobPhysicalReads += innerElement.lobPhysicalReads;
        totalIO.lobReadAheadReads += innerElement.lobReadAheadReads;
      });
    });
    return totalIO;
  }

  private CalculateTotalTime(data: TableQueryResult[]): TotalTimeData {
    const totalTime = new TotalTimeData();
    if (!data || data.length < 1) { return null; }

    data.forEach(outerElement => {
      outerElement.parsedStatisticsTimeData.forEach(innerElement => {
        totalTime.cpuTime += innerElement.CPUTime;
        totalTime.elapsedTime += innerElement.elapsedTime;
      });
    });

    return totalTime;
  }

  private HasDoubleQuery(): boolean {
    const hasDoubleData = this._query1ParsedData && this._query1ParsedData.length > 0 &&
      this._query2ParsedData && this._query2ParsedData.length > 0;
    return hasDoubleData;
  }


  public get query1TotalIO(): TotalIOData {
    return this._query1TotalIO;
  }

  public set query1TotalIO(value: TotalIOData) {
    this._query1TotalIO = value;
  }

  public get query2TotalIO(): TotalIOData {
    return this._query2TotalIO;
  }

  public set query2TotalIO(value: TotalIOData) {
    this._query2TotalIO = value;
  }

  public get query1TotalTime(): TotalTimeData {
    return this._query1TotalTime;
  }

  public set query1TotalTime(value: TotalTimeData) {
    this._query1TotalTime = value;
  }

  public get query2TotalTime(): TotalTimeData {
    return this._query2TotalTime;
  }

  public set query2TotalTime(value: TotalTimeData) {
    this._query2TotalTime = value;
  }


  public get query1HasData(): boolean {
    return this._query1HasData;
  }

  public get query2HasData(): boolean {
    return this._query2HasData;
  }



}
