import { ServiceResult } from './../models/result.model';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/base/base.service';
import { BaseValue } from '../models/base-value.model';
import { PagedList } from '../models/paged-list';
import { isNumber } from 'lodash';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
const Base_Value_Key = "baseValues";
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  baseValues: BaseValue[];
  constructor(private dataService: BaseService) { }

  loadBaseValue(): Promise<BaseValue[]> {
    return new Promise(resolve => {
      this.baseValues = JSON.parse(localStorage.getItem(Base_Value_Key));
      if (this.baseValues == null) {
        this.dataService
          .postJsonData<ServiceResult<PagedList<BaseValue[]>>>(
            { PageSize: 10000, PageIndex: 1 }, "BaseValue", "GetAll").subscribe((result) => {

              localStorage.setItem(Base_Value_Key, JSON.stringify(result.objResult.data));
              return resolve(result.objResult.data);
            });
      }
      return resolve(this.baseValues);
    });

  }
  getBaseValue(type: string | number) {
    if (this.baseValues == null)
      this.baseValues = JSON.parse(localStorage.getItem('baseValue'));
    if (isNumber(type))
      return this.baseValues.filter(x => x.baseValueTypeId == type);
    else
      return this.baseValues.filter(x => x.baseValueTypeUniqueName == type);
  }

  getBaseValueByUniqueName(uniqueName: string) {
    if (this.baseValues == null)
      this.baseValues = JSON.parse(localStorage.getItem('baseValue'));

    return this.baseValues.find(x => x.uniqueName == uniqueName);
  }

  mapToAbstractControl(data: any, validators: Validators): AbstractControl {

    if (data != null && !Array.isArray(data) && typeof data === 'object') {

      const formGroupDescription: any = {};
      const keys = Object.keys(data);
      if (keys.length > 0) {
        keys.forEach(key => {


          if (key.includes("phone") || key.includes("tel"))
            validators = Validators.pattern('[- +()0-9]+');
          else if (key.includes("email"))
            validators = Validators.email;
          // else if (column != null)
          //   validators = column?.validators;

          formGroupDescription[key] = this.mapToAbstractControl(data[key], validators);
          validators = null;
        });
        return new FormGroup(formGroupDescription);
      }
      else
        return new FormControl(data, validators);
    } else if (data != null && Array.isArray(data)) {

      const formArrayDescription: any[] = [];
      data.forEach(elem => {
        formArrayDescription.push(this.mapToAbstractControl(elem, validators));
      });
      return new FormArray(formArrayDescription);

    } else {

      return new FormControl(data, validators);

    }

  }

}
