/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'app/shared/models/role.model';
import { Permission } from 'app/shared/models/permission.model';
import { Observable } from 'rxjs';
import { CreateRoleCommand } from '../../../models/command/CreateRoleCommand';
import { PermissionService } from '../../../services/permission.service';
import { RoleService } from '../../../services/role.service';
import { PagedList } from 'app/shared/models/paged-list';
import { map } from 'rxjs/operators';
import { LoaderService } from 'app/core/base/loader.service';
import { PageMode } from 'app/shared/models/enums';
import { AddPageBase } from 'app/modules/admin/models/add-page-base';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent extends AddPageBase implements OnInit {

  parentRoles$: Observable<Role[]>;
  permissions$: Observable<Permission[]>;
  permissions: Permission[];
  roleAddCommand: CreateRoleCommand = { uniqueName: '', description: '', parentId: 0, permissionsIdList: [], saveChanges: false, title: '', id: 0 };

  @Input()
  set updateItem(value: any) {
    /* ---------- Form Builder with validation ---------------- */

    this.form = this._formBuilder.group({
      parentId: null,
      description: ['', Validators.required],
      title: ['', Validators.required],
      permissionsIdList: [[], Validators.required],
      levelCode: '',
      uniqueName: ['', Validators.required],
    });
    /* ---------- check value is null or not ---------------- */
    if (value != null) {
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Update;
      this.form.reset(value);
      this.roleAddCommand.id = value.id;
    }
    else
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Add;
  }

  constructor(private roleService: RoleService,
    private permissionService: PermissionService,
    private fuseConfirmationService: FuseConfirmationService,
    public loaderService: LoaderService,/* ---------- Loader service for isLoading in html if it's needed ---------------- */
    private _formBuilder: FormBuilder) {
    super(fuseConfirmationService);

    this.permissions$ = this.permissionService
      .getAll()
      .pipe(map((x) => x.data));
    this.permissions$.subscribe(x => {
      this.permissions = x;
    })

    this.parentRoles$ = this.roleService
      .getAll(100, 0)
      .pipe(map((x) => x.data));
  }

  ngOnInit(): void {



    // this.roles$ = this.roleService.getAll();
  }

  save() {
    /* ---------- Check form is valid) ---------------- */
    if (this.form.valid) {
      /* ---------- change form value to model ---------------- */
      const id = this.roleAddCommand?.id;
      this.roleAddCommand = <CreateRoleCommand>this.form.getRawValue();
      this.roleAddCommand.id = id;
      this.roleAddCommand.saveChanges = true;

      //--------set saving----
      this.saving = true;
      if (this.pageMode == PageMode.Add) {

        this.roleService
          .add(this.roleAddCommand)
          .subscribe((result) => {
            //--------finish and close the page----
            this.saving = false;
            this.onClose.emit(true);

          });
      }
      else {
        this.roleService
          .update(this.roleAddCommand)
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
