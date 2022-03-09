import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { Operator } from 'app/shared/models/operator.model';
import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {
    controllerName: String = 'Operator';
    constructor(private dataService: BaseService) { }

    // add(model: CreatePersonCommand) {
    //     return this.dataService.postJsonData<Person>(
    //         model,
    //         this.controllerName,
    //         'Add'
    //     );
    // }

    getAll(): Observable<PagedList<Operator[]>> {
        return this.dataService
            .postJsonData<ServiceResult<PagedList<Operator[]>>>(
                { PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
                this.controllerName,
                'GetAll'
            )
            .pipe(map((result) => result.objResult));
    }

}
