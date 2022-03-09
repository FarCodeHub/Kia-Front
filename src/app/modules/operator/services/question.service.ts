import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { PagedList } from 'app/shared/models/paged-list';
import { Question } from 'app/shared/models/question.model';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  controllerName: String = "Question"
  constructor(private dataService: BaseService) {

  }


  getAll(): Observable<PagedList<Question[]>> {
    return this.dataService.postJsonData<ServiceResult<PagedList<Question[]>>>(
      { PageSize: 20, PageIndex: 1, Skip: 0, Take: 20 },
      this.controllerName,
      'GetAll')
      .pipe(map(result => result.objResult));
  }


}
