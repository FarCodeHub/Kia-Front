/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { ServiceResult } from 'app/shared/models/result.model';
import { User } from 'app/shared/models/user.model';
import { Observable } from 'rxjs';
import { CreateUserCommand } from '../models/command/create-user-command';
import { map } from 'rxjs/operators';
import { PagedList } from 'app/shared/models/paged-list';

@Injectable({
    providedIn: 'root',
})
export class UserAdminService {
    controllerName: String = 'User';
    constructor(private dataService: BaseService) { }

    add(model: CreateUserCommand) {
        return this.dataService.postJsonData<User>(
            model,
            this.controllerName,
            'Add'
        );
    }

    getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<User[]>>
    {

        return this.dataService
            .postJsonData<ServiceResult<PagedList<User[]>>>(
                { PageSize: pageSize ?? 20, PageIndex: pageIndex ?? 1,orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
                conditions: filterConditions },
                this.controllerName,
                'GetAll'
            )
            .pipe(map((result) => result.objResult));

    }

    get(id): Observable<User> {
        return this.dataService
            .getDataByParam<ServiceResult<User[]>>(
                { Id: id },
                this.controllerName,
                'Get'
            )
            .pipe(map((result) => result.objResult));
    }

    delete(model: User) {
        return this.dataService.deleteData<User>(
            model.id,
            this.controllerName
        );
    }

    update(model: CreateUserCommand) {
        return this.dataService.putJson<User>(
            model,
            this.controllerName,
            'Update'
        );
    }

    updateUserSetting(model: CreateUserCommand) {
        return this.dataService.putJson<User>(
            model,
            this.controllerName,
            'UpdateUserSetting'
        );
    }


}

