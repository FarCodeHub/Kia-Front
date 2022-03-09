import { map } from 'rxjs/operators';

import { QuestionService } from './../../services/question.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { CustomerService } from '../../services/customer.service';
import { CallService } from '../../services/call.service';
import { CaseService } from '../../services/case.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerDetailDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _customerService: CustomerService,
        private caseService: CaseService,
        private _questionService: QuestionService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const customerId = Number(route.paramMap.get('customerId'));
        return forkJoin([
            this._customerService.getById(customerId),
            this.caseService.getByCustomerId(customerId).pipe(map(x => x.data)),
        ]);
    }
}