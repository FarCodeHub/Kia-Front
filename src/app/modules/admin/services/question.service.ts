import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { PagedList } from 'app/shared/models/paged-list';
import { Question } from 'app/shared/models/question.model';
import { ServiceResult } from 'app/shared/models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateQuestionCommand } from '../models/command/create-question-command';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

    controllerName: String = 'Question';
    constructor(private dataService: BaseService) { }

    add(model: CreateQuestionCommand) {
        return this.dataService.postJsonData<Question>(
            model,
            this.controllerName,
            'Add'
        );
    }

    getAll(pageSize: number, pageIndex: number, orderByProperty?: string, sortDirection?: string, filterConditions: any[] = []): Observable<PagedList<Question[]>> {
        console.log(sortDirection);
        return this.dataService
            .postJsonData<ServiceResult<PagedList<Question[]>>>(
                {
                    PageSize: pageSize,
                    PageIndex: pageIndex,
                    orderByProperty: [orderByProperty, sortDirection].join(' ').trim(),
                    conditions: filterConditions
                },
                this.controllerName,
                'GetAll'
            )
            .pipe(map((result) => result.objResult));
    }

    get(id): Observable<Question> {
        return this.dataService
            .getDataByParam<ServiceResult<Question[]>>(
                { Id: id },
                this.controllerName,
                'Get'
            )
            .pipe(map((result) => result.objResult));
    }

    delete(model: Question) {
        return this.dataService.deleteData<Question>(
            model.id,
            this.controllerName
        );
    }

    update(model: CreateQuestionCommand) {
        return this.dataService.putJson<Question>(
            model,
            this.controllerName,
            'Update'
        );
    }
}
