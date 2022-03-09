import { Case } from './../../../shared/models/case.model';
import { Employee } from './../../../shared/models/employee.model';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractEmployee } from 'app/shared/models/contract.employee.model';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  controllerName: String = 'Case';
  constructor(private dataService: BaseService) { }


  GetAllInvolved(caseId: number): Observable<PagedList<ContractEmployee[]>> {
    return this.dataService
      .getDataByParam<ServiceResult<PagedList<ContractEmployee[]>>>(
        { CaseId: caseId, PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
        this.controllerName,
        'GetAllInvolved'
      )
      .pipe(map((result) => {
        return result.objResult
      }));
  }

  getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Case[]>> {

    return this.dataService
      .postJsonData<ServiceResult<PagedList<Case[]>>>(
        {
          PageSize: pageSize ?? 20, PageIndex: pageIndex ?? 1, orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
          conditions: filterConditions
        },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));

  }

  getByCustomerId(cutomerId: number): Observable<PagedList<Case[]>> {
    let conditions = [];

    conditions.push({
      propertyName: 'CustomerId',
      comparison: 'equal',
      values: [cutomerId],
    });
    return this.dataService
      .postJsonData<ServiceResult<PagedList<Case[]>>>(
        {
          PageSize: 100, PageIndex: 0, orderByProperty: "",
          conditions: conditions
        },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));

  }

}
