import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { CountryDivision } from 'app/shared/models/country-division';

import { PagedList } from 'app/shared/models/paged-list';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryDivisionService {

    controllerName: String = 'CountryDivision';
    constructor(private dataService: BaseService) { }

    getAllCities(pageSize?: number, pageIndex?: number): Observable<CountryDivision[]>;
    getAllCities(pageSize: number, pageIndex: number): Observable<CountryDivision[]> {
        return this.dataService
            .getDataByParam<ServiceResult<CountryDivision[]>>(
                { PageSize: pageSize ?? 1000, PageIndex: pageIndex ?? 1, Skip: 0, Take: 40 },
                this.controllerName,
                'GetAllCities'
            )
            .pipe(map((result) => result.objResult));
    }



}


