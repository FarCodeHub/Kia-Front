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
import { Permission } from 'app/shared/models/permission.model';
import { PagedList } from 'app/shared/models/paged-list';
import { CreatePermissionCommand } from '../models/command/create-permission-command';


@Injectable({
    providedIn: 'root',
})
export class PermissionService {
    controllerName: String = 'Permission';
    constructor(private dataService: BaseService) { }

    add(model: CreatePermissionCommand) {
        return this.dataService.postJsonData<Permission>(
            model,
            this.controllerName,
            'Add'
        );
    }



    getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Permission[]>> {

        return this.dataService
            .postJsonData<ServiceResult<PagedList<Permission[]>>>(
                {
                    PageSize: pageSize ?? 1000, PageIndex: pageIndex ?? 1, orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
                    conditions: filterConditions
                },
                this.controllerName,
                'GetAll'
            )
            .pipe(map((result) => result.objResult));

    }

    get(id): Observable<Permission> {
        return this.dataService
            .getDataByParam<ServiceResult<Permission[]>>(
                { Id: id },
                this.controllerName,
                'Get'
            )
            .pipe(map((result) => result.objResult));
    }

    delete(model: Permission) {
        return this.dataService.deleteData<Permission>(
            model.id,
            this.controllerName, "Delete"
        );
    }

    update(model: CreatePermissionCommand) {
        return this.dataService.putJsonData<Permission>(

            model,
            this.controllerName,
            'Update'
        );
    }
}
