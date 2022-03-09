import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'app/shared/models/session.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  controllerName: String = 'Task';
  constructor(private dataService: BaseService) { }

  GetAllToDue(employeeId: number): Observable<PagedList<Task[]>> {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 2);
    today.setDate(today.getDate() - 6);
    return this.dataService
      .postJsonData<ServiceResult<PagedList<Task[]>>>(
        {
          PageSize: 100,
          PageIndex: 1,
          orderByProperty: "Id",
          employeeId: 2,
          unitId: 0,
          fromDueDateTime: today,
          toDueDateTime: tomorrow
        },
        this.controllerName,
        'GetAllToDue'
      )
      .pipe(map((result) => {
        result.objResult.data.map(session => {
          session.createdAt = new Date(session.createdAt);
        });
        return result.objResult
      }));
  }

}
