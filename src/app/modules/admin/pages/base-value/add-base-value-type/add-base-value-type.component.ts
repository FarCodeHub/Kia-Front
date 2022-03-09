import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateBaseValueCommand } from 'app/modules/admin/models/command/create-base-value-command';
import { CreateBaseValueTypeCommand } from 'app/modules/admin/models/command/create-base-value-type-command';
import { BaseValueTypeService } from 'app/modules/admin/services/base-value-type.service';
import { BaseValueService } from 'app/modules/admin/services/basevalue.service';

import { BaseValueType } from 'app/shared/models/base-value-type';
import { BaseValue } from 'app/shared/models/base-value.model';
import { PageMode } from 'app/shared/models/enums';
import { PagedList } from 'app/shared/models/paged-list';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogData } from '../../projects/add-project/add-project.component';


@Component({
    selector: 'app-add-base-value-type',
    templateUrl: './add-base-value-type.component.html',
    styleUrls: ['./add-base-value-type.component.scss'],
})
export class AddBaseValueTypeComponent implements OnInit {


    @Output()
    baseValueComponent: EventEmitter<any> = new EventEmitter()
    pageMode: PageMode = PageMode.Add;
    title: string = "ذخیره";
    isUpdate: number = 1;
    basevalueItem: BaseValue;
    baseValueTypeForm: FormGroup;
    baseValueForm: FormGroup;
    baseValueTypes$: Observable<PagedList<BaseValueType[]>>;
    baseValueTypeCombo$: Observable<BaseValueType[]>;
    baseValueType: BaseValueType;

    createBaseValueTypeCommad: CreateBaseValueTypeCommand = {
        title: '',
        uniqueName: '',
        groupName: '',
        parentId: null,
        saveChanges: true,
        isReadOnly: false,
        subSystem: '',
        id: 0
    };

    constructor(
        private _formBuilder: FormBuilder,
        private baseValueService: BaseValueService,
        private baseValueTypeService: BaseValueTypeService,
        private route: ActivatedRoute,
        public matDialogRef: MatDialogRef<AddBaseValueTypeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {

        this.baseValueTypeForm = this._formBuilder.group({
            saveChanges: true,
            parentId: 0,
            uniqueName: '',
            groupName: '',
            subSystem: '',
            title: '',
        });


    }

    ngOnInit(): void {
        if (this.data != null) {
            this.pageMode = PageMode.Update;
            this.editItem(this.data);
        }
        this.baseValueTypes$ = this.baseValueTypeService.getAll();
        this.baseValueTypeCombo$ = this.baseValueTypeService.getAll().pipe(map(x => x.data));
    }

    save() {
        this.createBaseValueTypeCommad.uniqueName = this.baseValueTypeForm.get('uniqueName').value;
        this.createBaseValueTypeCommad.title = this.baseValueTypeForm.get('title').value;
        this.createBaseValueTypeCommad.saveChanges = true;

        if (this.pageMode == PageMode.Add) {
            this.baseValueTypeService.add(this.createBaseValueTypeCommad).subscribe((result) => {
                this.baseValueTypeCombo$ = this.baseValueTypeService.getAll().pipe(map(x => x.data));
                this.baseValueComponent.emit(result);
                this.matDialogRef.close();
            });
        }
        else {
            this.baseValueTypeService.update(this.createBaseValueTypeCommad).subscribe((result) => {
                this.title = "ذخیره";
                this.isUpdate = 1;
                this.baseValueComponent.emit(result);
                this.matDialogRef.close();
            });
            this.matDialogRef.close();
        }
    }

    editItem(item: any) {
        this.baseValueTypeForm.controls['title'].setValue(item.title);
        this.baseValueTypeForm.controls['uniqueName'].setValue(item.uniqueName);
        this.createBaseValueTypeCommad.id = item.id;

    }


    saveAndClose(): void {
        // Save the message as a draft


        // Close the dialog
        this.matDialogRef.close();
    }

    cancel() {
        this.matDialogRef.close();
    }
}
