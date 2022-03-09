/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BranchService } from '../../../services/branch.service';
import { UnitService } from '../../../services/unit.service';
import { PositionService } from '../../../services/position.service';
import { CreateUnitCommand } from '../../../models/command/create-uint-command';
import { Unit } from 'app/shared/models/unit.model';
import { Position } from 'app/shared/models/position.model';
import { PagedList } from 'app/shared/models/paged-list';
import { PageMode } from 'app/shared/models/enums';



@Component({
    selector: 'app-addunit',
    templateUrl: './addunit.component.html',
    styleUrls: ['./addunit.component.scss'],
})
export class AddunitComponent implements OnInit {
    //---To use in html
    public PageMode = PageMode;

    /* ---------- OnClose for save(with result=true) and cancel(with result=false) ---------------- */
    @Output()
    onClose = new EventEmitter<boolean>();

    pageMode: PageMode = PageMode.Add;
    saving = false;


    form: FormGroup;
    units: Unit[];
    positions: Position[];

    unitAddCommand: CreateUnitCommand = <CreateUnitCommand>{
        branchId: 0,
        parentId: 0,
        positionList: [],
        saveChanges: false,
        title: '',
        id: 0
    };

    @Input()
    set updateItem(value: any) {
        /* ---------- Form Builder with validation ---------------- */
        this.form = this._formBuilder.group({
            parentId: 0,
            branchId: [0, Validators.required],
            description: ['', Validators.required],
            title: ['', Validators.required],
            positionList: [[], Validators.required],
        });
        /* ---------- check value is null or not ---------------- */
        if (value != null) {
            /* ---------- Set Page Mode ---------------- */
            this.pageMode = PageMode.Update;
            this.form.controls['parentId'].setValue(value.parentId ? value.parentId : 0);
            this.form.controls['branchId'].setValue(value.branchId ? value.branchId : 0);
            this.form.controls['title'].setValue(value.title);
            this.form.controls['description'].setValue(value.description);
            this.form.controls['positionList'].setValue(value.permissionsIdList);
            this.unitAddCommand.id = value.id;
        }
        else
            /* ---------- Set Page Mode ---------------- */
            this.pageMode = PageMode.Add;
    }

    constructor(
        private unitService: UnitService,
        private positionService: PositionService,
        private _formBuilder: FormBuilder) {

        this.unitService.getAll().
            subscribe((result) => (this.units = result.data));
        this.positionService
            .getAll()
            .subscribe((items) => (this.positions = items.data));
    }

    ngOnInit(): void {

    }

    save() {
        if (this.form.valid) {

            //--------set saving----
            this.saving = true;

            this.unitAddCommand.branchId = this.form.get('branchId').value;
            this.unitAddCommand.parentId = this.form.get('parentId').value;
            this.unitAddCommand.title = this.form.get('title').value;
            this.unitAddCommand.positionList = this.form.get('positionList').value;
            this.unitAddCommand.saveChanges = true;
            if (this.pageMode == PageMode.Add)
                this.unitService.add(this.unitAddCommand).subscribe((result) => {
                    this.saving = false;
                    this.onClose.emit(true);
                });
            else
                this.unitService.update(this.unitAddCommand).subscribe((result) => {
                    this.saving = false;
                    this.onClose.emit(true);
                });
        }

    }

    cancel() {
        this.onClose.emit(false);
    }
}
