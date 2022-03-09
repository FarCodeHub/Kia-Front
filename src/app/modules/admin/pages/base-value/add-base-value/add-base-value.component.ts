import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LoaderService } from 'app/core/base/loader.service';
import { CreateBaseValueCommand } from 'app/modules/admin/models/command/create-base-value-command';
import { CrudBase } from 'app/modules/admin/models/CrudBase';
import { BaseValueService } from 'app/modules/admin/services/basevalue.service';
import { BaseValue } from 'app/shared/models/base-value.model';
import { PageMode } from 'app/shared/models/enums';
import { PagedList } from 'app/shared/models/paged-list';
import { merge } from 'rxjs';
import { map,  startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-base-value',
  templateUrl: './add-base-value.component.html',
  styleUrls: ['./add-base-value.component.scss']
})
export class AddBaseValueComponent  extends CrudBase<BaseValue> {
    baseValues:BaseValue[];
    form: FormGroup;
    createBaseValueCommand : CreateBaseValueCommand ={id:0,saveChanges:true,uniqueName:'',baseValueTypeId:0,isReadOnly:false,orderIndex:0,title:'',value:''};


    _baseValueTypeId:number;
    @Input()
   set baseValueTypeId (value){
    this._baseValueTypeId = value;
    this.baseValueService.GetAllByBaseValueTypeId(this._baseValueTypeId).subscribe(result => {
             this.items = result.data;
             this.pagination.length = result.data.length;
          });
   }

    public PageMode = PageMode;

    /* ---------- OnClose for save(with result=true) and cancel(with result=false) ---------------- */
    @Output()
    onClose = new EventEmitter<boolean>();

    pageMode: PageMode = PageMode.Add;
    saving = false;




    @Input()
    set selectedItem(value: any) {
      /* ---------- Form Builder with validation ---------------- */

      this.form = this._formBuilder.group({

        baseValueTypeId:[0,Validators.required],
        saveChanges:true,
        title: ['', Validators.required],
        value:['',Validators.required],
        levelCode: '',
        uniqueName: ['', Validators.required],
      });
      /* ---------- check value is null or not ---------------- */
      if (value != null) {
        /* ---------- Set Page Mode ---------------- */
        this.pageMode = PageMode.Update;
        this.form.reset(value);
        this.createBaseValueCommand.id = value.id;
      }
      else
        /* ---------- Set Page Mode ---------------- */
        this.pageMode = PageMode.Add;
    }


  constructor(private baseValueService: BaseValueService,
    private fuseConfirmationService: FuseConfirmationService,
    public loaderService: LoaderService,private _formBuilder: FormBuilder) {// ------------ LoaderService----------
    super(fuseConfirmationService);
}

ngAfterViewInit(): void {
    this._sort.sortChange.subscribe(() => (this.pagination.pageIndex = 0));
    this.loadData();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({

        baseValueTypeId:[0,Validators.required],
        saveChanges:true,
        title: ['', Validators.required],
        value:['',Validators.required],
        levelCode: '',
        uniqueName: ['', Validators.required],
      });
}
  loadData() {

  }

  cancel() {
    this.onClose.emit(false);
}

save() {
    /* ---------- Check form is valid) ---------------- */
    if (this.form.valid) {
      /* ---------- change form value to model ---------------- */
      const id = this.createBaseValueCommand?.id;
      this.createBaseValueCommand = <CreateBaseValueCommand>this.form.getRawValue();
      this.createBaseValueCommand.id = id;
      this.createBaseValueCommand.baseValueTypeId = this._baseValueTypeId;
      this.createBaseValueCommand.saveChanges = true;

      //--------set saving----
      this.saving = true;
      if (this.pageMode == PageMode.Add) {

        this.baseValueService
          .add(this.createBaseValueCommand)
          .subscribe((result) => {
            //--------finish and close the page----
            this.saving = false;
            this.baseValueService.GetAllByBaseValueTypeId(this._baseValueTypeId).subscribe(result => {
                this.items = result.data;
             });

          });
      }
      else {
        this.baseValueService
          .update(this.createBaseValueCommand)
          .subscribe((result) => {
            //--------finish and close the page----
            this.saving = false;
            this.baseValueService.GetAllByBaseValueTypeId(this._baseValueTypeId).subscribe(result => {
                this.items = result.data;
             });
          });

          this.pageMode = PageMode.Add;
      }
    }
  }

  public editItem(item: any) {
    this.selectedItem = item;
}

deleteItem(item: any) {
    this.baseValueService.delete(item).subscribe(item => {
    });
  }

  close(){

this.onClose.emit(false);
  }

}
