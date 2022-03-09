import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePermissionCommand } from 'app/modules/admin/models/command/create-permission-command';
import { PermissionService } from 'app/modules/admin/services/permission.service';
import { PageMode } from 'app/shared/models/enums';
import { PagedList } from 'app/shared/models/paged-list';
import { Permission } from 'app/shared/models/permission.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {


    public PageMode = PageMode;

    @Output()
    onClose = new EventEmitter<boolean>();

    pageMode: PageMode = PageMode.Add;
    saving = false;

    @Output()
    UpdateGridPermission: EventEmitter<Permission> = new EventEmitter();


    form: FormGroup;
    permissions$ :Observable<Permission[]>
    createPermissionCommand:CreatePermissionCommand = {
        parentId:0,
        saveChanges:true,
        title:'',
        uniqueName:'',
        id:0
    }

    @Input()
    set updateItem(value: any) {
      /* ---------- Form Builder with validation ---------------- */

      this.form = this._formBuilder.group({
        parentId: '',
        uniqueName: ['', Validators.required],
        title: ['', Validators.required],
        levelCode: ''
      });
      /* ---------- check value is null or not ---------------- */
      if (value != null) {
        /* ---------- Set Page Mode ---------------- */
        this.pageMode = PageMode.Update;
        this.form.reset(value);
        this.createPermissionCommand.id = value.id;
      }
      else
        /* ---------- Set Page Mode ---------------- */
        this.pageMode = PageMode.Add;
    }




    constructor(private permissionService: PermissionService,
    private _formBuilder: FormBuilder) {

        this.permissions$ =  this.permissionService.getAll().pipe(map(x=>x.data));
  }

  ngOnInit(): void {


  }

  save() {
    /* ---------- Check form is valid) ---------------- */
    if (this.form.valid) {
      /* ---------- change form value to model ---------------- */
      const id = this.createPermissionCommand?.id;
      this.createPermissionCommand = <CreatePermissionCommand>this.form.getRawValue();
      this.createPermissionCommand.id = id;
      this.createPermissionCommand.saveChanges = true;

      //--------set saving----
      this.saving = true;
      if (this.pageMode == PageMode.Add) {

        this.permissionService
          .add(this.createPermissionCommand)
          .subscribe((result) => {
            //--------finish and close the page----
            this.saving = false;
            this.onClose.emit(true);

          });
      }
      else {
        this.permissionService
          .update(this.createPermissionCommand)
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



updateGrid(item)
{
    this.UpdateGridPermission.emit(item);
}

}
