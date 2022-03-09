import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { LoaderService } from "app/core/base/loader.service";
import { BaseValueType } from "app/shared/models/base-value-type";
import { BaseValue } from "app/shared/models/base-value.model";
import { PageMode } from "app/shared/models/enums";
import { PagedList } from "app/shared/models/paged-list";
import { merge } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import { CreateBaseValueCommand } from "../../models/command/create-base-value-command";
import { CrudBase } from "../../models/CrudBase";
import { BaseValueTypeService } from "../../services/base-value-type.service";
import { BaseValueService } from "../../services/basevalue.service";
import { AddBaseValueTypeComponent } from "./add-base-value-type/add-base-value-type.component";

@Component({
  selector: "app-base-value",
  templateUrl: "./base-value.component.html",
  styleUrls: ["./base-value.component.scss"],
})
export class BaseValueComponent extends CrudBase<BaseValueType> {
  public PageMode = PageMode;
  showDrawer = true;
  basevalues: BaseValue[];
  /* ---------- OnClose for save(with result=true) and cancel(with result=false) ---------------- */
  @Output()
  onClose = new EventEmitter<boolean>();

  pageMode: PageMode = PageMode.Add;
  saving = false;

  form: FormGroup;

  createBaseValueCommand: CreateBaseValueCommand;
  baseValueTypes$: BaseValueType[];

  baseValueTypeId: number;

  constructor(
    private baseValueTypeService: BaseValueTypeService,
    public loaderService: LoaderService,
    private _matDialog: MatDialog,

    private fuseConfirmationService: FuseConfirmationService
  ) {
    super(fuseConfirmationService);
  }

  ngAfterViewInit(): void {
    this._sort.sortChange.subscribe(() => (this.pagination.pageIndex = 0));
    this.loadData();
  }

  loadData() {
    merge(this._sort.sortChange, this._paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.baseValueTypeService.getAll(
            this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map((x) =>
              this.filters[x].toServerCondition()
            )
          );
        }),
        map((result: PagedList<BaseValueType[]>) => {
          if (this._paginator.pageIndex == 0)
            this.pagination.length = result.totalCount;
          return result.data;
        })
      )
      .subscribe((result) => {
        this.items = result;
      });
  }

  ngOnInit(): void {
    this.loadData();
  }

  editItem(item) {
    //  this.router.navigate(['/admin/addBaseValueType', { basevalueTypes: JSON.stringify(item) }]);
    const dialogRef = this._matDialog.open(AddBaseValueTypeComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  addBaseValueType() {
    const dialogRef = this._matDialog.open(AddBaseValueTypeComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  /* ---------- Cancel will close the form ---------------- */
  cancel() {
    this.onClose.emit(false);
  }

  showBaseValues(item) {
    this.baseValueTypeId = item.id;

    this.addVisible = true;
  }



  deleteItem(item: any) {
    this.baseValueTypeService.delete(item.id).subscribe(item => {

        //   this.basevalues$=this.baseValueService.getAll();

    })
}
}
