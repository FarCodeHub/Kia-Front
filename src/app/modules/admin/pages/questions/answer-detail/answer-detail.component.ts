import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LoaderService } from 'app/core/base/loader.service';
import { CrudBase } from 'app/modules/admin/models/CrudBase';
import { AnswerOption, Question } from 'app/shared/models/question.model';
import { merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { DialogData } from '../../projects/add-project/add-project.component';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})
export class AnswerDetailComponent extends CrudBase<AnswerOption> {


answers :any;

  constructor(private fuseConfirmationService: FuseConfirmationService,
    public loaderService: LoaderService,@Inject(MAT_DIALOG_DATA) public data: any) {


        super(fuseConfirmationService)

         this.items = this.data.items.answerOptionBases
    }

 loadData() {

 }



}
