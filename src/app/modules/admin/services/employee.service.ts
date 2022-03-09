import { CreateEmployeeCommand } from 'app/modules/admin/models/command/create-employee-command';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { Employee } from 'app/shared/models/employee.model';
import { ServiceResult } from 'app/shared/models/result.model';
import { PagedList } from 'app/shared/models/paged-list';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  controllerName: String = "employee"
  constructor(private dataService: BaseService) { }

  add(model: CreateEmployeeCommand) {
    return this.dataService.postJsonData<Employee>(model, this.controllerName, "Add");
  }

  getAll(): Observable<PagedList<Employee[]>> {
    return this.dataService.postJsonData<ServiceResult<PagedList<Employee[]>>>({ PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
      this.controllerName, "GetAll")
      .pipe(map(result => result.objResult))
      ;
  }

  get(id): Observable<Employee> {
    return this.dataService.getDataByParam<ServiceResult<Employee[]>>({ Id: id },
      this.controllerName, "Get")
      .pipe(map(result => result.objResult));
  }


  GetAllByParam(conditions: any[], pageSize: number, pageIndex: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Employee[]>> {
    return this.dataService
      .postJsonData<ServiceResult<PagedList<Employee[]>>>(
        { PageSize: pageSize, PageIndex: pageIndex, conditions: conditions, orderByProperty: [orderByProperty, sortDirection].join(' ').trim() },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));
  }

  getAllByPositionName(positionUniqueName: string): Observable<Employee[]> {
    let conditions = [];

    conditions.push({
      propertyName: 'positionUniqueName',
      comparison: 'equal',
      values: [positionUniqueName],
    });


    return this.dataService
      .postJsonData<ServiceResult<PagedList<Employee[]>>>(
        { PageSize: 100, PageIndex: 0, conditions: conditions },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult.data));
  }

  delete(model: Employee) {
    return this.dataService.deleteData<Employee>(model.id, this.controllerName, "Delete");
  }

  update(model: CreateEmployeeCommand) {
    return this.dataService.putJson<Employee>(
        model,
        this.controllerName,
        'Update');
  }
}
