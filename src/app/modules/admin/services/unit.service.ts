/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { Unit } from 'app/shared/models/unit.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUnitCommand } from '../models/command/create-uint-command';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  controllerName: String = 'Unit';
  constructor(private dataService: BaseService) { }

  add(model: CreateUnitCommand) {
    return this.dataService.postJsonData<Unit>(model, this.controllerName, 'Add');
  }


  getAll(): Observable<PagedList<Unit[]>> {
    return this.dataService
      .postJsonData<ServiceResult<PagedList<Unit[]>>>(
        { PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));
  }

  get(id): Observable<Unit> {
    return this.dataService
      .getDataByParam<ServiceResult<Unit[]>>(
        { Id: id },
        this.controllerName,
        'Get'
      )
      .pipe(map((result) => result.objResult));
  }


  GetAllByBranchId(branchId): Observable<PagedList<Unit[]>> {
    return this.dataService
      .getDataByParam<ServiceResult<PagedList<Unit[]>>>(
        { branchId: branchId, PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
        this.controllerName,
        'GetAllByBranchId'
      )
      .pipe(map((result) => result.objResult));
  }

  delete(model: Unit) {
    return this.dataService.deleteData<Unit>(model.id, this.controllerName, "Delete");
  }

  update(model: CreateUnitCommand) {
    return this.dataService.putJson<Unit>(model, this.controllerName, "Update");
  }


}
