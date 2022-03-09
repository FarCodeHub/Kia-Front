import { SessionSurvey } from '../models/session-survey.model';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedList } from 'app/shared/models/paged-list';

@Injectable({
  providedIn: 'root'
})
export class SessionSurveyService {
  controllerName: String = 'SessionSurvey';
  constructor(private dataService: BaseService) { }


  add(model: SessionSurvey[]) {
    return this.dataService.postJsonData<boolean>(
      {
        saveChanges: true,
        sessionSurveyCreateModels: model
      }
      , this.controllerName, 'Add');
  }

  getByCaseId(caseId: number): Observable<PagedList<SessionSurvey[]>> {
    let conditions = [];

    conditions.push({
      propertyName: 'CaseId',
      comparison: 'equal',
      values: [caseId],
    });
    return this.dataService.postJsonData<ServiceResult<PagedList<SessionSurvey[]>>>(
      {
        PageSize: 100, PageIndex: 0, orderByProperty: "",
        conditions: conditions
      },
      this.controllerName,
      'GetAll')
      .pipe(map(result => result.objResult));
  }

  getByTaskId(taskId: number): Observable<PagedList<SessionSurvey[]>> {
    let conditions = [];

    conditions.push({
      propertyName: 'TaskId',
      comparison: 'equal',
      values: [taskId],
    });
    return this.dataService.postJsonData<ServiceResult<PagedList<SessionSurvey[]>>>(
      {
        PageSize: 100, PageIndex: 0, orderByProperty: "",
        conditions: conditions
      },
      this.controllerName,
      'GetAll')
      .pipe(map(result => result.objResult));
  }

}
