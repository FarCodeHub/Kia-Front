import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Censuses } from '../models/censuses.model';
import { Statistics } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  controllerName: String = 'Reporting';
  constructor(private dataService: BaseService) { }

  getQuestionsStatistics(from: string, to: string): Observable<Statistics[]> {

    return this.dataService
      .getDataByParam<ServiceResult<Statistics[]>>(
        { from: from, to: to },
        this.controllerName,
        'GetQuestionsStatistics'
      )
      .pipe(map((result) => {
        return result.objResult
      }));
  }

  getAnswersStatistics(from: string, to: string, questionId: number): Observable<Statistics[]> {
    return this.dataService
      .getDataByParam<ServiceResult<Statistics[]>>(
        { from: from, to: to, questionId: questionId },
        this.controllerName,
        'GetAnswersStatistics'
      )
      .pipe(map((result) => {
        return result.objResult
      }));
  }

  getSeperatedAnswersStatistics(from: string, to: string, questionId: number): Observable<Statistics[]> {

    return this.dataService
      .getDataByParam<ServiceResult<Statistics[]>>(
        { from: from, to: to, questionId: questionId },
        this.controllerName,
        'GetSeperatedAnswersStatistics'
      )
      .pipe(map((result) => {
        return result.objResult
      }));
  }

  getCensuses(from: string, to: string): Observable<Censuses> {

    return this.dataService
      .getDataByParam<ServiceResult<Censuses>>(
        { from: from, to: to, branchId: 1 },
        this.controllerName,
        'GetCensuses'
      )
      .pipe(map((result) => {
        return result.objResult
      }));
  }

  getCommunicationsStatistics(from: string, to: string,groupBy:number): Observable<Statistics[]> {

    return this.dataService
      .getDataByParam<ServiceResult<Statistics[]>>(
        { from: from, to: to, branchId: 1 ,groupBy:groupBy},
        this.controllerName,
        'GetCommunicationsStatistics'
      )
      .pipe(map((result) => {
        return result.objResult
      }));
  }
}
