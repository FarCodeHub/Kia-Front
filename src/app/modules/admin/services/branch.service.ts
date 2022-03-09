/* eslint-disable arrow-parens */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Branch } from 'app/shared/models/branch.model';
import { ServiceResult } from 'app/shared/models/result.model';
import { PagedList } from 'app/shared/models/paged-list';
import { CreateBranchCommand } from '../models/command/create-branch-command';

@Injectable({
    providedIn: 'root',
})
export class BranchService {
    controllerName: String = 'Branch';
    constructor(private dataService: BaseService) { }

    add(model: CreateBranchCommand) {
        return this.dataService.postJsonData<Branch>(
            model,
            this.controllerName,
            'Add'
        );
    }

    getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Branch[]>> {

        return this.dataService
            .postJsonData<ServiceResult<PagedList<Branch[]>>>(
                {
                    PageSize: pageSize ?? 20,
                    PageIndex: pageIndex ?? 1,
                    orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
                    conditions: filterConditions
                },
                this.controllerName,
                'GetAll'
            )
            .pipe(map((result) => result.objResult));
    }

    get(id): Observable<Branch> {
        return this.dataService
            .getDataByParam<ServiceResult<Branch[]>>(
                { Id: id },
                this.controllerName,
                'Get'
            )
            .pipe(map((result) => result.objResult));
    }

    delete(model: Branch) {
        return this.dataService.deleteData<Branch>(
            model.id,
            this.controllerName, "Delete"
        );
    }

    update(model: CreateBranchCommand) {
        return this.dataService.putJson<Branch>(model, this.controllerName, 'Update');
    }
}
