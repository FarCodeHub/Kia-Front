/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { PagedList } from 'app/shared/models/paged-list';
import { Position } from 'app/shared/models/position.model';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreatePositionCommand } from '../models/command/create-position-command';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  controllerName: String = 'Position';
  constructor(private dataService: BaseService) { }


  add(model: CreatePositionCommand) {
    return this.dataService.postJsonData<Position>(model, this.controllerName, 'Add');
  }

  getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Position[]>> {

    return this.dataService
      .postJsonData<ServiceResult<PagedList<Position[]>>>(
        {
          PageSize: pageSize ?? 20, PageIndex: pageIndex ?? 1, orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
          conditions: filterConditions
        },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));
  }


  get(id): Observable<Position> {
    return this.dataService
      .getDataByParam<ServiceResult<Position[]>>(
        { Id: id },
        this.controllerName,
        'Get'
      )
      .pipe(map((result) => result.objResult));
  }

  delete(model: Position) {
    return this.dataService.deleteData<Position>(model.id, this.controllerName, "Delete");
  }

  update(model: CreatePositionCommand) {
    return this.dataService.putJsonData<Position>(model, this.controllerName, 'Update');
  }
}
