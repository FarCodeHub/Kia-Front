/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { AdvertisementSource } from 'app/shared/models/advertisement-source.model';
import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateAdvertisementSourceCommand } from '../models/command/create-Advertisement-Source-Command';

@Injectable({
    providedIn: 'root',
})
export class AdvertiseService {
    controllerName: String = 'AdvertisementSource';
    constructor(private dataService: BaseService) {}

    add(model: CreateAdvertisementSourceCommand) {
        return this.dataService.postJsonData<AdvertisementSource>(
            model,
            this.controllerName,
            'Add'
        );
    }

    getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<AdvertisementSource[]>>
    {

        return this.dataService
            .postJsonData<ServiceResult<PagedList<AdvertisementSource[]>>>(
                { PageSize: pageSize ?? 20, PageIndex: pageIndex ?? 1,orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
                conditions: filterConditions },
                this.controllerName,
                'GetAll'
            )
            .pipe(map((result) => result.objResult));
    }

    get(id): Observable<AdvertisementSource> {
        return this.dataService
            .getDataByParam<ServiceResult<AdvertisementSource[]>>(
                { Id: id },
                this.controllerName,
                'Get'
            )
            .pipe(map(result => result.objResult));
    }

    delete(id:number) {
        return this.dataService.deleteData<AdvertisementSource>(
            { id: id},
            this.controllerName,
            'Delete'

        );
    }

    update(model: CreateAdvertisementSourceCommand) {
        return this.dataService.putJson<AdvertisementSource>(
            model,
            this.controllerName,
            'Update'
        );
    }


    isUsableFeedbackNumber(feedbackNumber:number,startDateTime:string,endDateTime:Date)
    {

        let e =  endDateTime.toJSON();
        return this.dataService.getDataByParam<AdvertisementSource>(
            { FeedbackNumber: feedbackNumber, EndateTime:e},
            this.controllerName,
            'IsUsableFeedbackNumber'
        )
        .pipe(map(result => result.objResult));
    }

}
