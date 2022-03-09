/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUnitCommand } from '../models/command/create-uint-command';
import { BaseValue } from '../../../shared/models/base-value.model';
import { ServiceResult } from 'app/shared/models/result.model';
import { CreateBaseValueCommand } from '../models/command/create-base-value-command';
import { PagedList } from 'app/shared/models/paged-list';

@Injectable({
  providedIn: 'root'
})
export class BaseValueService {

  controllerName: String = 'BaseValue';
  constructor(private dataService: BaseService) { }

  add(model: CreateBaseValueCommand) {
    return this.dataService.postJsonData<BaseValue>(model, this.controllerName, 'Add');
  }



  getAll(pageSize: number, pageIndex: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<BaseValue[]>> {
    console.log(sortDirection);
    return this.dataService
      .postJsonData<ServiceResult<PagedList<BaseValue[]>>>(
        {
          PageSize: pageSize,
          PageIndex: pageIndex,
          orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
          conditions: filterConditions
        },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));
  }

  // getAllByCategoryUniqueName(uniqeName: String): Observable<PagedList<BaseValue[]>> {
  //   return this.dataService
  //     .getDataByParam<ServiceResult<PagedList<BaseValue[]>>>(
  //       { BaseValueTypeUniqueName: uniqeName, PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
  //       this.controllerName,
  //       'GetAllByCategoryUniqueName'
  //     );
  // }

  // getAllByUniqueName(uniqeName: String, pageSize: number, pageIndex: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<BaseValue[]>> {
  //   return this.dataService
  //     .postJsonData<ServiceResult<PagedList<BaseValue[]>>>(
  //       {
  //         BaseValueTypeUniqueName: uniqeName,
  //         PageSize: pageSize,
  //         PageIndex: pageIndex,
  //         orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
  //         conditions: filterConditions
  //       },
  //       this.controllerName,
  //       'GetAllByUniqueName'
  //     )
  //     .pipe(map((result) => result.objResult));
  // }

  getAllByParam(param: any): Observable<PagedList<BaseValue[]>> {
    return this.dataService.getDataByParam<ServiceResult<PagedList<BaseValue[]>>>(

      { PageSize: 20, PageIndex: 1, queries: param, Skip: 0, Take: 20 },
      this.controllerName, "GetAll")
      .pipe(map(result => result.objResult));
  }



  GetAllByBaseValueTypeId(BaseValueTypeId: number): Observable<PagedList<BaseValue[]>> {
    return this.dataService
      .getDataByParam<ServiceResult<PagedList<BaseValue[]>>>(
        { BaseValueTypeId: BaseValueTypeId, PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
        this.controllerName,
        'GetAllByBaseValueTypeId'
      )
      .pipe(map((result) => result.objResult));
  }

  get(id): Observable<BaseValue> {
    return this.dataService
      .getDataByParam<ServiceResult<BaseValue[]>>(
        { Id: id },
        this.controllerName,
        'Get'
      )
      .pipe(map((result) => result.objResult));
  }

  delete(model: BaseValue) {
    return this.dataService.deleteData<BaseValue>(model.id, this.controllerName, 'Delete');
  }


  update(model: CreateBaseValueCommand) {
    return this.dataService.putJson<BaseValue>(
      model,
      this.controllerName,
      'Update'
    );
  }

}
