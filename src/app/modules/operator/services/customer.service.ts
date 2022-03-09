
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { Customer } from 'app/shared/models/customer.model';
import { ServiceResult } from 'app/shared/models/result.model';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  controllerName: String = "Customer"
  constructor(private dataService: BaseService) {

  }

  getById(id: number): Observable<Customer> {
    return this.dataService.getDataByParam<ServiceResult<Customer>>(
      { Id: id, },
      this.controllerName,
      'Get').pipe(map(result => result.objResult));;
  }

  getByPhoneNumber(phoneNumber): Observable<Customer> {
    return this.dataService.postJsonData<ServiceResult<Customer>>(
      {
        pageSize: 0,
        pageIndex: 0,
        orderByProperty: "",
        sortDirection: "",
        queries: [
          {
            parts: {
              additionalProp1: [
                {
                  operand: "",
                  propertyName: "Person.Phone1",
                  comparison: "equal",
                  value: phoneNumber
                },
                {
                  operand: "",
                  propertyName: "Person.Phone2",
                  comparison: "equal",
                  value: phoneNumber
                },
                {
                  operand: "",
                  propertyName: "Person.Phone3",
                  comparison: "equal",
                  value: phoneNumber
                }
              ]
            },
            nextOperand: "or"
          }
        ]
      },
      this.controllerName, "Search")
      .pipe(map(result => result.objResult));
  }
}
