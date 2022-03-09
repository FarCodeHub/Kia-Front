import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePositionCommand } from 'app/modules/admin/models/command/create-position-command';
import { PositionService } from 'app/modules/admin/services/position.service';
import { PageMode } from 'app/shared/models/enums';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.scss']
})
export class AddPositionComponent implements OnInit {

  //---To use in html
  public PageMode = PageMode;

  /* ---------- OnClose for save(with result=true) and cancel(with result=false) ---------------- */
  @Output()
  onClose = new EventEmitter<boolean>();

  pageMode: PageMode = PageMode.Add;
  saving = false;

  form: FormGroup;
  createPositionCommand: CreatePositionCommand = {
    saveChanges: true,
    title: '',
    uniqueName: '',
    id: 0
  };
  @Input()
  set updateItem(value: any) {

    this.form = this._formBuilder.group({
      saveChanges: true,
      title: ['', Validators.required],
      uniqueName: ['', Validators.required],
    });

    if (value != null) {
      this.pageMode = PageMode.Update;
      this.form.controls['title'].setValue(value.title);
      this.form.controls['uniqueName'].setValue(value.uniqueName);
      this.createPositionCommand.id = value.id;

    }
    else
      this.pageMode = PageMode.Add;

  }
  constructor(private positionService: PositionService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }
  save() {
    if (this.form.valid) {
      const id = this.createPositionCommand?.id;
      this.createPositionCommand = <CreatePositionCommand>this.form.getRawValue();
      this.createPositionCommand.id = id;
    }


    this.saving = true;
    if (this.pageMode == PageMode.Add) {
      this.positionService
        .add(this.createPositionCommand)
        .subscribe((result) => {
          this.saving = false;
          this.onClose.emit(true);
        });
    }
    else {
      this.positionService
        .update(this.createPositionCommand)
        .subscribe((result) => {
          this.saving = false;
          this.onClose.emit(true);
        });
    }
  }

  cancel() {
    this.onClose.emit(false);
  }
}
