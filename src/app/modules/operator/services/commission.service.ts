import { Comission } from './../../../shared/models/comission.mode';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateComissionCommand } from '../models/updateComissionCommand';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  controllerName: String = 'Commission';
  constructor(private dataService: BaseService) { }


  getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Comission[]>> {

    return this.dataService
      .postJsonData<ServiceResult<PagedList<Comission[]>>>(
        {
          PageSize: pageSize ?? 20, PageIndex: pageIndex ?? 1, orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
          conditions: filterConditions
        },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));
  }

  update(model: UpdateComissionCommand) {
    return this.dataService.putJson<Comission>(
      model,
      this.controllerName,
      'Update'
    );
  }
}
