import { SessionSurvey } from '../models/session-survey.model';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { ServiceResult } from 'app/shared/models/result.model';
import { Task } from 'app/shared/models/session.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EndTaskCommand } from '../models/endTaskCommand';
import { PagedList } from 'app/shared/models/paged-list';
import { Communication } from 'app/shared/models/communication.model';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Condition } from 'app/shared/models/condition-model';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  controllerName: String = 'Task';
  constructor(private dataService: BaseService,
    private http: HttpClient) { }


  add(model: Task) {
    return this.dataService.postJsonData<Task>(model, this.controllerName, 'Add');
  }

  end(model: EndTaskCommand) {
    return this.dataService.putJson<Task>(model, this.controllerName, 'End');
  }

  getAll(conditions?:Condition[]): Observable<PagedList<Task[]>>
   getAll(conditions:Condition[]): Observable<PagedList<Task[]>>
  {
    return this.dataService
      .postJsonData<ServiceResult<PagedList<Task[]>>>(
        { PageSize: 20, PageIndex: 1, conditions:conditions ?? null },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => {
        result.objResult.data.map(session => {
          session.createdAt = new Date(session.createdAt);
        });
        return result.objResult
      }));
  }

  getCallByCustomer(customerId): Observable<PagedList<Communication[]>> {
    return this.dataService.postJsonData<ServiceResult<PagedList<Communication[]>>>(
      {
        pageSize: 100,
        pageIndex: 0,
        orderByProperty: "",
        conditions: [{
          propertyName: "customerId",
          comparison: "equal",
          values: [customerId]
        }]
      },
      this.controllerName, "GetAllCommunication")
      .pipe(map((result) => {
        result.objResult.data.map(session => {
          session.createdAt = new Date(session.createdAt);
        });
        return result.objResult
      }));
  }

  get(id): Observable<Task> {
    return this.dataService
      .getDataByParam<ServiceResult<Task[]>>(
        { Id: id },
        this.controllerName,
        'Get'
      )
      .pipe(map((result) => result.objResult));
  }

  delete(model: Task) {
    return this.dataService.deleteData<Task>(model.id, this.controllerName);
  }

  update(model: Task) {
    return this.dataService.putJsonData<Task>(model.id, model, this.controllerName);
  }

  addSessionSurvey(model: SessionSurvey) {
    return this.dataService.postJsonData<Task>(model, this.controllerName, 'Add');
  }

  deliverSignal(singalId: string): Observable<boolean> {

    return this.http.post<ServiceResult<boolean>>(`${environment.singalUrl}/api/VoipCrm/DeliverySignal`, `"${singalId}"`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' }) }
    )
      .pipe(map((result) => {
        return result.objResult
      }));

  }

  getRecordedSound(uniqueid: string): Observable<string> {

    return this.http.get<ServiceResult<string>>(`${environment.singalUrl}/api/VoipCrm/GetRecordedSound`,
      {
        params: { uniqueid: uniqueid }
      }).pipe(map((result) => {
        return result.objResult
      }));

  }
}
