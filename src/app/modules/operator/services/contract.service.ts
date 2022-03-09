import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { Contract } from 'app/shared/models/contract..model';
import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateContractCommand } from '../models/createContractCommand';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  controllerName: String = 'Contract';
  constructor(private dataService: BaseService) { }

  add(contract: CreateContractCommand) {
    return this.dataService.postJsonData<Contract>(contract, this.controllerName, 'Add');
  }

  getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Contract[]>> {

    return this.dataService
      .postJsonData<ServiceResult<PagedList<Contract[]>>>(
        {
          PageSize: pageSize ?? 20, PageIndex: pageIndex ?? 1, orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
          conditions: filterConditions
        },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));
  }

}
