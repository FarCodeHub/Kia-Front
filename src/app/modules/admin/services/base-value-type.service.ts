import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { BaseValueType } from 'app/shared/models/base-value-type';
import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateBaseValueTypeCommand } from '../models/command/create-base-value-type-command';

@Injectable({
  providedIn: 'root'
})
export class BaseValueTypeService {

  controllerName: String = 'BaseValueType';
  constructor(private dataService: BaseService) { }


  add(model: CreateBaseValueTypeCommand) {
    return this.dataService.postJsonData<BaseValueType>(model, this.controllerName, 'Add');
  }

  getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<BaseValueType[]>> {
    return this.dataService
      .postJsonData<ServiceResult<PagedList<BaseValueType[]>>>(
        {
          PageSize: pageSize ?? 20, PageIndex: pageIndex ?? 1, orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
          conditions: filterConditions
        },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));
  }


  get(id): Observable<BaseValueType> {
    return this.dataService
      .getDataByParam<ServiceResult<BaseValueType[]>>(
        { Id: id },
        this.controllerName,
        'Get'
      )
      .pipe(map((result) => result.objResult));
  }

  delete(model: BaseValueType) {
    return this.dataService.deleteData<BaseValueType>(model.id, this.controllerName, "Delete");
  }

  update(model: CreateBaseValueTypeCommand) {
    return this.dataService.putJson<BaseValueType>(model, this.controllerName, 'Update');
  }


}
