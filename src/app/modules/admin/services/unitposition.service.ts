/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-types */
import { UnitPosition } from 'app/shared/models/unit-position.model';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { CreateUnitPositionCommand } from '../models/command/Create-unit-position-command';
import { Observable } from 'rxjs';
import { ServiceResult } from 'app/shared/models/result.model';
import { map } from 'rxjs/operators';
import { PagedList } from 'app/shared/models/paged-list';

@Injectable({
  providedIn: 'root'
})
export class UnitpositionService {

  controllerName: String = 'UnitPosition';
  constructor(private dataService: BaseService) { }



  add(model: CreateUnitPositionCommand) {
    return this.dataService.postJsonData<UnitPosition>(model, this.controllerName);
  }


  getAll(): Observable<PagedList<UnitPosition[]>> {
    return this.dataService
      .postJsonData<ServiceResult<PagedList<UnitPosition[]>>>(
        { PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));
  }


  GetAllByParam(param:any): Observable<PagedList<UnitPosition[]>> {
    return this.dataService
      .postJsonData<ServiceResult<PagedList<UnitPosition[]>>>(
        {PageSize: 20, PageIndex: 1, conditions:param },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));
  }


  GetAllByUnitId(unitId:number): Observable<PagedList<UnitPosition[]>> {
    return this.dataService
      .getDataByParam<ServiceResult<PagedList<UnitPosition[]>>>(
        {unitId:unitId, PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
        this.controllerName,
        'GetAllByUnitId'
      )
      .pipe(map((result) => result.objResult));
  }


  delete(model: UnitPosition) {
    return this.dataService.deleteData<UnitPosition>(model.id, this.controllerName);
  }

  update(model: UnitPosition) {
    return this.dataService.putJsonData<UnitPosition>(model.id, model, this.controllerName);
  }


}
