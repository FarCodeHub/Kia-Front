/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { PagedList } from 'app/shared/models/paged-list';
import { Project } from 'app/shared/models/project.model';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateProjectCommand } from '../models/command/create-project-command';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  controllerName: String = 'Project';
  constructor(private dataService: BaseService) { }

  add(model: CreateProjectCommand) {
    return this.dataService.postJsonData<CreateProjectCommand>(model, this.controllerName, 'Add');
  }


  getAll(pageSize?: number, pageIndex?: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Project[]>> {
    return this.dataService
      .postJsonData<ServiceResult<PagedList<Project[]>>>(
        {
          PageSize: pageSize ?? 20, PageIndex: pageIndex ?? 1, orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
          conditions: filterConditions
        },
        this.controllerName,
        'GetAll'
      )
      .pipe(map((result) => result.objResult));
  }


  get(id): Observable<Project> {
    return this.dataService
      .getDataByParam<ServiceResult<Project[]>>(
        { Id: id },
        this.controllerName,
        'Get'
      )
      .pipe(map((result) => result.objResult));
  }

  delete(model: Project) {
    return this.dataService.deleteData<Project>(model.id, this.controllerName, "Delete");
  }

  update(model: CreateProjectCommand) {
    return this.dataService.putJson<Project>(model, this.controllerName, 'Update');
  }


}
