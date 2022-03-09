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
import { ServiceResult } from 'app/shared/models/result.model';
import { Role } from 'app/shared/models/role.model';
import { CreateRoleCommand } from '../models/command/CreateRoleCommand';
import { PagedList } from 'app/shared/models/paged-list';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    controllerName: String = 'Role';
    constructor(private dataService: BaseService) { }

    add(model: CreateRoleCommand) {
        return this.dataService.postJsonData<Role>(
            model,
            this.controllerName,
            'Add'
        );
    }

    getAll(pageSize: number, pageIndex: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Role[]>> {
        console.log(sortDirection);
        return this.dataService
            .postJsonData<ServiceResult<PagedList<Role[]>>>(
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

    get(id): Observable<Role> {
        return this.dataService
            .getDataByParam<ServiceResult<Role[]>>(
                { Id: id },
                this.controllerName,
                'Get'
            )
            .pipe(map((result) => result.objResult));
    }

    delete(model: Role) {
        return this.dataService.deleteData<Role>(
            model.id,
            this.controllerName, "Delete"
        );
    }

    update(model: CreateRoleCommand) {
        return this.dataService.putJson<Role>(
            model,
            this.controllerName,
            'Update'
        );
    }
}
