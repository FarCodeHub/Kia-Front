
import { Person } from 'app/shared/models/person.model';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { Observable } from 'rxjs';
import { ServiceResult } from 'app/shared/models/result.model';
import { map } from 'rxjs/operators';
import { CreatePersonCommand } from '../models/command/create-person-command';
import { PagedList } from 'app/shared/models/paged-list';
import { UpdatePersonAvatarCommand } from '../models/command/update-person-avatar-command';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    controllerName: String = 'Person';
    constructor(private dataService: BaseService) { }

    add(model: CreatePersonCommand) {
        return this.dataService.postJsonData<Person>(
            model,
            this.controllerName,
            'Add'
        );
    }

    getAll(): Observable<PagedList<Person[]>> {
        return this.dataService
            .postJsonData<ServiceResult<PagedList<Person[]>>>(
                { PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
                this.controllerName,
                'GetAll'
            )
            .pipe(map((result) => result.objResult));
    }

    get(id): Observable<Person> {
        return this.dataService
            .getDataByParam<ServiceResult<Person[]>>(
                { Id: id },
                this.controllerName,
                'Get'
            )
            .pipe(map((result) => result.objResult));
    }

    delete(model: Person) {
        return this.dataService.deleteData<Person>(
            model.id,
            this.controllerName, "Delete"
        );
    }

    update(model: Person) {
        return this.dataService.putJsonData<Person>(
            model.id,
            model,
            this.controllerName
        );
    }

    updateAvatar(model: UpdatePersonAvatarCommand) {
        return this.dataService.putJson<Person>(
            model,
            this.controllerName,
            'UpdateAvatar'
        );
    }

}
