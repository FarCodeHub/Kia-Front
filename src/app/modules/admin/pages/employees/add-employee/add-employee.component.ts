import { GlobalService } from 'app/shared/services/global.service';
import { UnitPosition } from 'app/shared/models/unit-position.model';
import { Unit } from 'app/shared/models/unit.model';
import { EmployeeService } from './../../../services/employee.service';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddPageBase } from 'app/modules/admin/models/add-page-base';
import { CreateEmployeeCommand } from 'app/modules/admin/models/command/create-employee-command';
import { UnitService } from 'app/modules/admin/services/unit.service';
import { BaseValue } from 'app/shared/models/base-value.model';
import { CountryDivision } from 'app/shared/models/country-division';
import { Employee } from 'app/shared/models/employee.model';
import { PageMode } from 'app/shared/models/enums';
import { UnitpositionService } from 'app/modules/admin/services/unitposition.service';
import { UploadFileService } from 'app/modules/admin/services/upload-file.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { CountryDivisionService } from 'app/modules/admin/services/country-division.service';
import { clone } from 'lodash';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent extends AddPageBase implements OnInit {

  employeeCommand: CreateEmployeeCommand = <CreateEmployeeCommand>{
    personId: 0, employeeCode: '', unitPositionId: 0, unitId: 0, extentionNumber: '', isOperator: false,
    firstName: '', lastName: '', fatherName: '', nationalCode: '',
    identityCode: '', birthPlaceId: 0, birthDate: new Date(), genderBaseId: 0, email: '', postalCode: '',
    zipCodeId: 0, address: '', profilePhotoUrl: '', phone1: '', phone2: '', phone3: '', id: 0
  };

  genders: BaseValue[];
  provinces: any[];
  birthPlaceProvinces: any[];
  allCities: CountryDivision[];
  units: Unit[];
  unitPositions: UnitPosition[];
  uploadedFile: { progressStatus: '' | 'in-progress' | 'uploaded', progress: number, filePath: string, fullFilePath: string, extention: string } = {
    progressStatus: '',
    progress: 0,
    filePath: '',
    fullFilePath: '',
    extention: '',
  };

  @Input()
  set updateItem(value: any) {
    /* ---------- Form Builder with validation ---------------- */
    if (value != null) {
      this.pageMode = PageMode.Update;
      this.employeeCommand.id = value.id
      this.setDataToForm(value);
    }
    else
      this.pageMode = PageMode.Add;
  }
  //To check value set from outside
  _unitId: number;

  @Input()
  set unitId(value: number) {
    this._unitId = value;
    this.form.get("unitId").setValue(value);
  }

  constructor(private unitService: UnitService,
    private employeeService: EmployeeService,
    private globalService: GlobalService,
    private unitPositionService: UnitpositionService,
    private countryDivision: CountryDivisionService,
    private fuseConfirmationService: FuseConfirmationService,
    private uploadFileService: UploadFileService,) {
    super(fuseConfirmationService);

    this.form = this.globalService.mapToAbstractControl(this.employeeCommand, null) as FormGroup

    this.genders = this.globalService.getBaseValue("gender");
    this.unitService.getAll().subscribe((result) => {
      this.units = result.data;
    });
    this.countryDivision.getAllCities().subscribe(result => {
      this.allCities = result;
      this.provinces = this.allCities.filter(item => item.parentId == null);
      this.provinces.forEach(p => p.cities = this.allCities.filter(cd => cd.parentId == p.id))

      this.birthPlaceProvinces = clone(this.provinces);
    });
    this.form.get("unitId").valueChanges.subscribe(unitId => {
      this.unitPositionService.GetAllByUnitId(unitId)
        .subscribe((items) => {
          this.unitPositions = items.data
        });
    })
  }

  setDataToForm(value: Employee) {
    this.form.reset(<CreateEmployeeCommand>{
      personId: value.personId,
      employeeCode: value.employeeCode,
      unitPositionId: value.unitPositionId,
      unitId: value.unitId,
      extentionNumber: value.extentionNumber,
      isOperator: value.extentionNumber != null ? true : false,
      firstName: value.personModel.firstName?.trim(),
      lastName: value.personModel.lastName?.trim(),
      fatherName: value.personModel.fatherName?.trim(),
      nationalCode: value.personModel.nationalCode?.trim(),
      identityCode: value.personModel.identityCode?.trim(),
      birthPlaceId: value.personModel.birthPlaceId,
      birthDate: value.personModel.birthDate,
      genderBaseId: value.personModel.genderBaseId,
      email: value.personModel.email?.trim(),
      postalCode: value.personModel.postalCode?.trim(),
      zipCodeId: value.personModel.zipCodeId,
      address: value.personModel.address?.trim(),
      profilePhotoUrl: value.personModel.profilePhotoUrl,
      phone1: value.personModel.phone1?.trim(),
      phone2: value.personModel.phone2?.trim(),
      phone3: value.personModel.phone3?.trim(),
      id: value.id

    });
  }

  searchBirthPlace(term: string) {
    let filteredCities = this.allCities.filter(item => item.title.indexOf(term) > -1);
    let parentIds = filteredCities.map(x => x.parentId);

    this.birthPlaceProvinces = this.allCities.filter(item => item.parentId == null && parentIds.indexOf(item.id) > -1);
    this.birthPlaceProvinces.forEach(p => p.cities = filteredCities.filter(cd => cd.parentId == p.id))
  }


  searchCountryDivision(term: string) {
    let filteredCities = this.allCities.filter(item => item.title.indexOf(term) > -1);
    let parentIds = filteredCities.map(x => x.parentId);

    this.provinces = this.allCities.filter(item => item.parentId == null && parentIds.indexOf(item.id) > -1);
    this.provinces.forEach(p => p.cities = filteredCities.filter(cd => cd.parentId == p.id))
  }

  ngOnInit(): void {
  }

  removeAvatar() {
    this.form.controls['profilePhotoUrl'].setValue('');
    this.uploadedFile = {
      progressStatus: '',
      progress: 0,
      filePath: '',
      fullFilePath: '',
      extention: '',
    };
  }

  uploadAvatar(file) {
    let formData = new FormData();
    formData.set('file', file);

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
            this.form.controls['profilePhotoUrl'].setValue(fileName);
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


  save() {
    if (!this.form.valid) {
      this.validationErrorDialog();
      return;
    }
    /* ---------- Check form is valid) ---------------- */
    if (this.form.valid) {
      /* ---------- change form value to model ---------------- */
      const id = this.employeeCommand?.id;
      this.employeeCommand = <CreateEmployeeCommand>this.form.getRawValue();
      this.employeeCommand.id = id;

      //--------set saving----
      this.saving = true;
      if (this.pageMode == PageMode.Add) {

        this.employeeService
          .add(this.employeeCommand)
          .subscribe((result) => {
            this.saving = false;
            this.onClose.emit(true);

          });
      }
      else {
        this.employeeService
          .update(this.employeeCommand)
          .subscribe((result) => {
            this.saving = false;
            this.onClose.emit(true);
          });
      }
    }
  }

  cancel() {
    this.onClose.emit(false);
  }

}
