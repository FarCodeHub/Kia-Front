import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { PagedList } from 'app/shared/models/paged-list';
import { Project } from 'app/shared/models/project.model';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  controllerName: String = 'Project';
  constructor(private dataService: BaseService) { }


  getAll(): Observable<PagedList<Project[]>> {
    return this.dataService
      .postJsonData<ServiceResult<PagedList<Project[]>>>(
        { PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => {

        return result.objResult
      }));
  }
}
