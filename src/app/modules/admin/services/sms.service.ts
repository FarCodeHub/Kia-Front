import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { CreateSMSCommand } from 'app/modules/admin/models/command/create-sms-command';
import { Condition } from 'app/shared/models/condition-model';
import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { SmsModel } from 'app/shared/models/sms-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

    controllerName: String = 'Sms';
    constructor(private dataService: BaseService) {}

    add(model: CreateSMSCommand) {
        return this.dataService.postJsonData<CreateSMSCommand>(
            model,
            this.controllerName,
            'Add'
        );
    }

    getAll(pageSize?: number, pageIndex?: number): Observable<PagedList<SmsModel[]>>;
    getAll(pageSize: number, pageIndex: number ): Observable<PagedList<SmsModel[]>> {

        if (pageSize)
        {
        return this.dataService
            .postJsonData<ServiceResult<PagedList<SmsModel[]>>>(
                { PageSize: pageSize, PageIndex: pageIndex, Skip: 0, Take: 20  },
                this.controllerName,
                'GetAll'
            )
            .pipe(map((result) => result.objResult));
    }
    else
    {
                return this.dataService
            .postJsonData<ServiceResult<PagedList<SmsModel[]>>>(
                { PageSize: 20, PageIndex: 1, Skip: 0, Take: 20  },
                this.controllerName,
                'GetAll'
            )
            .pipe(map(result => result.objResult));
    }
}




getAllSended(startDate:string,EndDate:string , pageSize: number, pageIndex: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<SmsModel[]>> {

    return this.dataService
        .getDataByParam<ServiceResult<PagedList<SmsModel[]>>>(
            {StartDate:startDate,endDate:EndDate, PageSize: pageSize,
                 PageIndex: pageIndex,orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
                 conditions: filterConditions},
            this.controllerName,
            'GetAllSended'
        )
        .pipe(map((result) => result.objResult));
}

getAllReceived(startDate:string,EndDate:string , pageSize: number, pageIndex: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<SmsModel[]>> {

    return this.dataService
        .getDataByParam<ServiceResult<PagedList<SmsModel[]>>>(
            {StartDate:startDate,endDate:EndDate, PageSize: pageSize,
                 PageIndex: pageIndex,orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
                 conditions: filterConditions},
            this.controllerName,
            'GetAllReceived'
        )
        .pipe(map((result) => result.objResult));
}



getAllToSend(pageSize: number, pageIndex: number, conditions?:Condition[]): Observable<PagedList<SmsModel[]>> {

    return this.dataService
        .postJsonData<ServiceResult<PagedList<SmsModel[]>>>(
            {PageSize: pageSize, PageIndex: pageIndex, Skip: 0, Take: 20,conditions:conditions },
            this.controllerName,
            'GetAllToSend'
        )
        .pipe(map((result) => result.objResult));
}


    get(id): Observable<SmsModel> {
        return this.dataService
            .getDataByParam<ServiceResult<SmsModel[]>>(
                { Id: id },
                this.controllerName,
                'Get'
            )
            .pipe(map(result => result.objResult));
    }

    delete(id:number) {
        return this.dataService.deleteData<SmsModel>(
            { id: id},
            this.controllerName,
            'Delete'

        );
    }

    update(model: CreateSMSCommand) {
        return this.dataService.putJson<SmsModel>(
            model,
            this.controllerName,
            'Update'
        );
    }


    isUsableFeedbackNumber(feedbackNumber:number,startDateTime:string,endDateTime:Date)
    {

        let e =  endDateTime.toJSON();
        return this.dataService.getDataByParam<SmsModel>(
            { FeedbackNumber: feedbackNumber, EndateTime:e},
            this.controllerName,
            'IsUsableFeedbackNumber'
        )
        .pipe(map(result => result.objResult));
    }

}
