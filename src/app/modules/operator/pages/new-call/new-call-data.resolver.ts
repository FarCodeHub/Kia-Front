
import { QuestionService } from './../../services/question.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { CustomerService } from '../../services/customer.service';
import { CallService } from '../../services/call.service';

@Injectable({
    providedIn: 'root'
})
export class NewCallDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _customerService: CustomerService,
        private _callService: CallService,
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

        return forkJoin([
            // this._customerService.getByPhoneNumber(route.paramMap.get('phone')),
            this._callService.get(route.paramMap.get('taskid')),
            // this._questionService.getAll()
        ]);
    }
}