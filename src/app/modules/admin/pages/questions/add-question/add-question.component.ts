import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LoaderService } from 'app/core/base/loader.service';
import { AddPageBase } from 'app/modules/admin/models/add-page-base';
import { CreateQuestionCommand } from 'app/modules/admin/models/command/create-question-command';
import { BaseValueTypeService } from 'app/modules/admin/services/base-value-type.service';
import { QuestionService } from 'app/modules/admin/services/question.service';
import { BaseValueType } from 'app/shared/models/base-value-type';
import { BaseValue } from 'app/shared/models/base-value.model';
import { PageMode } from 'app/shared/models/enums';
import { GlobalService } from 'app/shared/services/global.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent extends AddPageBase implements OnInit {

  questionAddCommand: CreateQuestionCommand;
  questionTypes: BaseValue[];
  answerTypes: BaseValue[];
  answerOptionTypes: BaseValueType[];

  @Input()
  set updateItem(value: any) {
    /* ---------- Form Builder with validation ---------------- */

    this.form = this._formBuilder.group({

      title: ['', Validators.required],
      questionTypBaseId: [, Validators.required],
      answerTypeBaseId: [, Validators.required],
      answerOptionBaseTypeId: [, Validators.required],
    });
    /* ---------- check value is null or not ---------------- */
    if (value != null) {
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Update;
      this.form.reset(value);
      this.questionAddCommand.id = value.id;
    }
    else
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Add;
  }


  constructor(public loaderService: LoaderService,
    private baseValueTypeService: BaseValueTypeService,
    private globalService: GlobalService,/* ---------- Loader service for isLoading in html if it's needed ---------------- */
    private _formBuilder: FormBuilder,
    private fuseConfirmationService: FuseConfirmationService,
    private questionService: QuestionService) {
    super(fuseConfirmationService);
  }

  ngOnInit(): void {

    this.questionTypes = this.globalService.getBaseValue("questionType");
    this.answerTypes = this.globalService.getBaseValue("answerType");
    this.baseValueTypeService.getAll().subscribe(result => {
      this.answerOptionTypes = result.data;
    });

  }

  save() {
    if (!this.form.valid) {
      this.validationErrorDialog();
      return;
    }
    /* ---------- Check form is valid) ---------------- */
    if (this.form.valid) {
      /* ---------- change form value to model ---------------- */
      const id = this.questionAddCommand?.id;
      this.questionAddCommand = <CreateQuestionCommand>this.form.getRawValue();
      this.questionAddCommand.id = id;
      this.questionAddCommand.saveChanges = true;

      //--------set saving----
      this.saving = true;
      if (this.pageMode == PageMode.Add) {

        this.questionService
          .add(this.questionAddCommand)
          .subscribe((result) => {
            //--------finish and close the page----
            this.saving = false;
            this.onClose.emit(true);

          });
      }
      else {
        this.questionService
          .update(this.questionAddCommand)
          .subscribe((result) => {
            //--------finish and close the page----
            this.saving = false;
            this.onClose.emit(true);
          });
      }
    }
  }

  /* ---------- Cancel will close the form ---------------- */
  cancel() {
    this.onClose.emit(false);
  }

}
