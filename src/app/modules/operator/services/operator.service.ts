import { Operator } from './../../../shared/models/operator.model';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { PagedList } from 'app/shared/models/paged-list';
import { Dictionary } from 'app/shared/models/dictionary';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {
  controllerName: String = 'Operator';
  constructor(private dataService: BaseService,
    private http: HttpClient) { }


  getAll(): Observable<PagedList<Operator[]>> {
    return this.dataService
      .postJsonData<ServiceResult<PagedList<Operator[]>>>(
        { PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => {

        return result.objResult
      }));
  }

  getStatus(extention: string): Observable<string> {
    return this.http.get<ServiceResult<string>>(`${environment.singalUrl}/api/VoipCrm/GetStatus`,
      {
        params: { extention: extention }
      }).pipe(map((result) => {
        return result.objResult
      }));

  }
}
