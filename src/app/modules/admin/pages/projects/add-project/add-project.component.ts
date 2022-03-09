import { GlobalService } from 'app/shared/services/global.service';
import { AddPageBase } from 'app/modules/admin/models/add-page-base';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'app/core/base/loader.service';
import { CreateProjectCommand } from 'app/modules/admin/models/command/create-project-command';
import { BaseValueService } from 'app/modules/admin/services/basevalue.service';
import { ProjectService } from 'app/modules/admin/services/project.service';
import { UploadFileService } from 'app/modules/admin/services/upload-file.service';

import { BaseValue } from 'app/shared/models/base-value.model';
import { PageMode } from 'app/shared/models/enums';
import { PagedList } from 'app/shared/models/paged-list';
import { Project } from 'app/shared/models/project.model';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';




export interface DialogData {
  image: '';

}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent extends AddPageBase implements OnInit {

  name: string;
  baseUrl: String = `${environment.apiUrl}`;
  uploadedFile: { progressStatus: '' | 'in-progress' | 'uploaded', progress: number, filePath: string, fullFilePath: string, extention: string } = {
    progressStatus: '',
    progress: 0,
    filePath: '',
    fullFilePath: '',
    extention: '',
  };

  projects$: Observable<PagedList<Project[]>>;
  priorities: BaseValue[];
  lonLat: number[] = [0, 0];
  createProjectCommand: CreateProjectCommand = <CreateProjectCommand>{
    lat: 0,
    lng: 0,
    priorityBaseId: 0,
    title: '',
    filePath: '',
    address: '',
    id: 0,
    children: []
  };

  @Input()
  set updateItem(value: Project) {
    /* ---------- Form Builder with validation ---------------- */

    this.form = this._formBuilder.group({
      saveChanges: true,
      filePath: [value ? value.filePath : '', Validators.required],
      title: [value ? value.title : '', Validators.required],
      address: [value ? value.address : '', Validators.required],
      priorityBaseId: [value ? value.priorityBaseId : '', Validators.required],
      lat: [value ? value.lat : 0.0, Validators.required],
      lng: [value ? value.lng : 0.0, Validators.required],
      children: this._formBuilder.array(value && value?.children ? value.children.map(x => this._formBuilder.group({ title: [x.title] })) : []),
    });
    /* ---------- check value is null or not ---------------- */
    if (value != null) {
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Update;

      this.lonLat = [value.lng, value.lat];
      this.createProjectCommand.id = value.id;
    }
    else
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Add;
  }


  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  files = [];



  constructor(private uploadFileService: UploadFileService,
    private _formBuilder: FormBuilder,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private basevalueService: BaseValueService,
    private fuseConfirmationService: FuseConfirmationService,
    private globalService: GlobalService,
    public loaderService: LoaderService) {
    super(fuseConfirmationService);
  }

  ngOnInit(): void {
    this.priorities = this.globalService.getBaseValue('priorityLevels');

  }

  ngAfterViewInit(): void {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      this.uploadFile({ data: file, inProgress: false, progress: 0 });

    };
  }



  onClickUpload() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.click();
  }

  uploadFile(file) {
    let formData = new FormData();
    formData.set('file', file.data);

    this.uploadedFile.progressStatus = 'in-progress';
    this.uploadFileService
      .upload(formData)
      .pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadedFile.progress = Math.round(
              (event.loaded * 100) / event.total
            );
            break;
          case HttpEventType.Response:
            let fileName = event.body.objResult;
            this.form.get('filePath').setValue(fileName);
            this.uploadedFile.extention = fileName.split(".")[1].toUpperCase();
            this.uploadedFile.filePath = fileName;
            this.uploadedFile.fullFilePath = `${environment.imageUrl}` + "/" + fileName;
            this.uploadedFile.progressStatus = 'uploaded';
            // console.log("File Uploaded" + this.extentionFile + " " + fileName);
            return fileName;
        }
      }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          console.log(event.body);
        }
      });
  }

  addSubItem() {
    const item = this._formBuilder.group({ title: [''] });

    // Add the phone number form group to the phoneNumbers form array
    (this.form.get('children') as FormArray).push(item);
  }

  isFileImage() {
    return ['PNG', 'JPG', 'JPEG'].includes(this.uploadedFile.extention);
  }

  removeSubItem(index: number) {
    const formArray = this.form.get('children') as FormArray;
    formArray.removeAt(index);
  }


  save() {
    if (!this.form.valid) {
      this.validationErrorDialog();
      return;
    }
    /* ---------- Check form is valid) ---------------- */
    if (this.form.valid) {
      /* ---------- change form value to model ---------------- */
      const id = this.createProjectCommand?.id;
      this.createProjectCommand = <CreateProjectCommand>this.form.getRawValue();
      this.createProjectCommand.id = id;

      this.createProjectCommand.lng = this.lonLat[0];
      this.createProjectCommand.lat = this.lonLat[1];
      this.createProjectCommand.saveChanges = true;
      // this.createProjectCommand.children = this.subItems;
      //--------set saving----
      this.saving = true;
      if (this.pageMode == PageMode.Add) {

        this.projectService
          .add(this.createProjectCommand)
          .subscribe((result) => {
            //--------finish and close the page----
            this.saving = false;
            this.onClose.emit(true);

          });
      }
      else {
        this.projectService
          .update(this.createProjectCommand)
          .subscribe((result) => {
            //--------finish and close the page----
            this.saving = false;
            this.onClose.emit(true);
          });
      }
    }
  }


  cancel() {
    this.onClose.emit(false);
  }


  locationChange(loc: number[]) {
    this.lonLat = loc;
  }

  removeImage() {
    this.form.get('filePath').setValue('');
    this.uploadedFile = {
      progressStatus: '',
      progress: 0,
      filePath: '',
      fullFilePath: '',
      extention: '',
    };
  }

  // showMap(lat: number, lng: number) {

  //     const dialogRef = this.dialog.open(MapDialogComponent, {
  //         width: '250px',
  //         data: { lat: lat, lng:lng },
  //       });

  //       dialogRef.afterClosed().subscribe(result => {
  //         console.log('The dialog was closed');
  //         this.name = result;
  //       });

  // }



}
