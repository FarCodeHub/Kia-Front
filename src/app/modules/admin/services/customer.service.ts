import { CreateCustomerCommand } from './../models/command/create-customer-command';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { Customer } from 'app/shared/models/customer.model';
import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    controllerName: String = 'Customer';
    constructor(private dataService: BaseService) { }

    add(model: CreateCustomerCommand) {
        return this.dataService.postJsonData<Customer>(model, this.controllerName, "Add");
    }

    getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Customer[]>> {

        return this.dataService
            .postJsonData<ServiceResult<PagedList<Customer[]>>>(
                {
                    PageSize: pageSize ?? 20, PageIndex: pageIndex ?? 1, orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
                    conditions: filterConditions
                },
                this.controllerName,
                'GetAll'
            )
            .pipe(map((result) => result.objResult));

    }

    get(id): Observable<Customer> {
        return this.dataService
            .getDataByParam<ServiceResult<Customer[]>>(
                { Id: id },
                this.controllerName,
                'Get'
            )
            .pipe(map((result) => result.objResult));
    }

    delete(model: Customer) {
        return this.dataService.deleteData<Customer>(
            model.id,
            this.controllerName, "Delete"
        );
    }

    update(model: CreateCustomerCommand) {
        return this.dataService.putJson<ServiceResult<boolean>>(model, this.controllerName, 'Update');
    }

    updateFull(model: CreateCustomerCommand) {
        return this.dataService.putJson<ServiceResult<boolean>>(model, this.controllerName, 'FullUpdate');
    }
}
