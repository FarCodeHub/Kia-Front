import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'app/core/base/loader.service';
import { CreateBranchCommand } from 'app/modules/admin/models/command/create-branch-command';
import { BranchService } from 'app/modules/admin/services/branch.service';
import { Branch } from 'app/shared/models/branch.model';
import { PageMode } from 'app/shared/models/enums';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {


  public PageMode = PageMode;


  @Output()
  onClose = new EventEmitter<boolean>();

  pageMode: PageMode = PageMode.Add;
  saving = false;

  form: FormGroup;
  lonLat: number[] = [0, 0];
  createBranchCommand: CreateBranchCommand = {
    lat: 0,
    lng: 0,
    saveChanges: true,
    title: '',
    address: '',
    id: 0

  };



  @Input()
  set updateItem(value: any) {
    /* ---------- Form Builder with validation ---------------- */

    this.form = this._formBuilder.group({

      title: ['', Validators.required],
      address: ['', Validators.required],
      lat: [value ? value.lat : 0.0, Validators.required],
      lng: [value ? value.lng : 0.0, Validators.required],

    });
    /* ---------- check value is null or not ---------------- */
    if (value != null) {
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Update;
      this.lonLat = [value.lng, value.lat];
      this.form.reset(value);
      this.createBranchCommand.id = value.id;
    }
    else
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Add;
  }


  constructor(private _formBuilder: FormBuilder,
    private branchService: BranchService, public loaderService: LoaderService,) { }

  ngOnInit(): void {

  }

  locationChange(loc: number[]) {
    this.lonLat = loc;
  }

  save() {
    /* ---------- Check form is valid) ---------------- */
    if (this.form.valid) {
      /* ---------- change form value to model ---------------- */
      const id = this.createBranchCommand?.id;
      this.createBranchCommand = <CreateBranchCommand>this.form.getRawValue();
      this.createBranchCommand.id = id;
      this.createBranchCommand.lng = this.lonLat[0];
      this.createBranchCommand.lat = this.lonLat[1];
      this.createBranchCommand.saveChanges = true;

      //--------set saving----
      this.saving = true;
      if (this.pageMode == PageMode.Add) {

        this.branchService
          .add(this.createBranchCommand)
          .subscribe((result) => {
            //--------finish and close the page----
            this.saving = false;
            this.onClose.emit(true);

          });
      }
      else {
        this.branchService
          .update(this.createBranchCommand)
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
