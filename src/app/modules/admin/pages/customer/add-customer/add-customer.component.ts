import { CreateCustomerCommand } from './../../../models/command/create-customer-command';
import { Customer } from 'app/shared/models/customer.model';

import { EmployeeService } from './../../../services/employee.service';
import { Employee } from './../../../../../shared/models/employee.model';
import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'app/core/base/loader.service';
import { AddPageBase } from 'app/modules/admin/models/add-page-base';
import { BaseValue } from 'app/shared/models/base-value.model';
import { GlobalService } from 'app/shared/services/global.service';
import { CountryDivisionService } from 'app/modules/admin/services/country-division.service';
import { CountryDivision } from 'app/shared/models/country-division';
import { clone } from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageMode } from 'app/shared/models/enums';
import { CustomerService } from 'app/modules/admin/services/customer.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent extends AddPageBase implements OnInit {

  customerAddCommand: CreateCustomerCommand = <CreateCustomerCommand>{
    consultantId: 0, presentorId: 0, statusId: 0, firstName: '', lastName: '', fatherName: '', nationalCode: '',
    identityCode: '', birthPlaceId: 0, birthDate: new Date(), genderBaseId: 0, email: '', postalCode: '',
    zipCodeId: 0, address: '', profilePhotoUrl: '', phone1: '', phone2: '', phone3: ''
  };
  genders: BaseValue[];
  consultants: Employee[];
  presentors: Employee[];
  provinces: any[];
  birthPlaceProvinces: any[];
  allCities: CountryDivision[];



  @Input()
  set updateItem(value: Customer) {
    /* ---------- Form Builder with validation ---------------- */

    this.form = this.globalService.mapToAbstractControl(this.customerAddCommand, null) as FormGroup;
    /* ---------- check value is null or not ---------------- */
    if (value != null) {
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Update;
      this.form.reset(<CreateCustomerCommand>{
        consultantId: 0, presentorId: 0, statusId: 0,
        firstName: value.personModel.firstName,
        lastName: value.personModel.lastName,
        fatherName: value.personModel.fatherName,
        nationalCode: value.personModel.nationalCode,
        identityCode: value.personModel.identityCode,
        birthPlaceId: value.personModel.birthPlaceId,
        birthDate: value.personModel.birthDate,
        genderBaseId: value.personModel.genderBaseId,
        email: value.personModel.email,
        postalCode: value.personModel.postalCode,
        zipCodeId: value.personModel.zipCodeId,
        address: value.personModel.address,
        profilePhotoUrl: value.personModel.profilePhotoUrl,
        phone1: value.personModel.phone1, phone2: value.personModel.phone2, phone3: value.personModel.phone3
      });
      this.customerAddCommand.id = value.id;
    }
    else
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Add;
  }

  constructor(private customerService: CustomerService,
    private employeeService: EmployeeService,
    private countryDivision: CountryDivisionService,
    private globalService: GlobalService,
    private fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: FormBuilder) {
    super(fuseConfirmationService);

    this.employeeService.getAllByPositionName("consultant").subscribe(result => {
      this.consultants = result;
    });
    this.employeeService.getAllByPositionName("presenter").subscribe(result => {
      this.presentors = result;
    });
    this.countryDivision.getAllCities().subscribe(result => {
      this.allCities = result;
      this.provinces = this.allCities.filter(item => item.parentId == null);
      this.provinces.forEach(p => p.cities = this.allCities.filter(cd => cd.parentId == p.id))

      this.birthPlaceProvinces = clone(this.provinces);
    });
    this.genders = this.globalService.getBaseValue("gender")
  }

  searchCountryDivision(term: string) {
    let filteredCities = this.allCities.filter(item => item.title.indexOf(term) > -1);
    let parentIds = filteredCities.map(x => x.parentId);

    this.provinces = this.allCities.filter(item => item.parentId == null && parentIds.indexOf(item.id) > -1);
    this.provinces.forEach(p => p.cities = filteredCities.filter(cd => cd.parentId == p.id))
  }

  searchBirthPlace(term: string) {
    let filteredCities = this.allCities.filter(item => item.title.indexOf(term) > -1);
    let parentIds = filteredCities.map(x => x.parentId);

    this.birthPlaceProvinces = this.allCities.filter(item => item.parentId == null && parentIds.indexOf(item.id) > -1);
    this.birthPlaceProvinces.forEach(p => p.cities = filteredCities.filter(cd => cd.parentId == p.id))
  }

  ngOnInit(): void {

  }

  save() {
    if (!this.form.valid) {
      this.validationErrorDialog();
      return;
    }
    /* ---------- Check form is valid) ---------------- */
    if (this.form.valid) {
      /* ---------- change form value to model ---------------- */
      const id = this.customerAddCommand?.id;
      this.customerAddCommand = <CreateCustomerCommand>this.form.getRawValue();
      this.customerAddCommand.id = id;

      //--------set saving----
      this.saving = true;
      if (this.pageMode == PageMode.Add) {

        this.customerService
          .add(this.customerAddCommand)
          .subscribe((result) => {
            this.saving = false;
            this.onClose.emit(true);

          });
      }
      else {
        this.customerService
          .updateFull(this.customerAddCommand)
          .subscribe((result) => {
            this.saving = false;
            this.onClose.emit(true);
          });
      }
    }
  }


}
