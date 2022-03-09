import { GlobalService } from 'app/shared/services/global.service';
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { LoaderService } from 'app/core/base/loader.service';
import { CreateSMSCommand } from 'app/modules/admin/models/command/create-sms-command';
import { Condition } from 'app/shared/models/condition-model';
import { AdvertiseService } from 'app/modules/admin/services/advertise.service';
import { BaseValueService } from 'app/modules/admin/services/basevalue.service';
import { CountryDivisionService } from 'app/modules/admin/services/country-division.service';
import { OperatorService } from 'app/modules/admin/services/operator.service';
import { SmsService } from 'app/modules/admin/services/sms.service';
import { UploadFileService } from 'app/modules/admin/services/upload-file.service';
import { BaseValue } from 'app/shared/models/base-value.model';
import { CountryDivision } from 'app/shared/models/country-division';
import { PageMode } from 'app/shared/models/enums';
import { Operator } from 'app/shared/models/operator.model';
import { PagedList } from 'app/shared/models/paged-list';
import { Pagination } from 'app/shared/models/pagination';
import { SmsModel } from 'app/shared/models/sms-model';
import { environment } from 'environments/environment';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-add-sms',
    templateUrl: './add-sms.component.html',
    styleUrls: ['./add-sms.component.scss'],
})
export class AddSmsComponent implements OnInit {
    files = [];
    isUpload: boolean = false;
    baseUrl: String = `${environment.apiUrl}`;
    public drawerMode: 'side' | 'over';
    public pagination: Pagination = <Pagination>{
        pageIndex: 0,
        size: 5
    };
    public PageMode = PageMode;
    pageMode: PageMode = PageMode.Add;
    saving = false;
    type = true;

    form: FormGroup;
    isUpdate: number;
    title: string;

    createSmsCommand: CreateSMSCommand;
    taskResults: BaseValue[];
    headLineNumbers$: BaseValue[];
    contents$: BaseValue[];
    items: SmsModel[] = [];
    extentionFile: string;
    provinces: CountryDivision[];
    countryDivision: CountryDivision[];
    cities: CountryDivision[];
    smsFilterForm: FormGroup;
    operators: Operator[];
    conditions: Condition[] = [];

    @ViewChild('matDrawer', { static: true }) protected matDrawer: MatDrawer;
    @ViewChild(MatPaginator) protected _paginator: MatPaginator;

    sort: MatSort
    @ViewChild(MatSort)
    set _sort(element: MatSort) {
        this.sort = element;
        if (element) {

            this.smsFilterForm = this._formBuilder.group({
                message: '',
                taskResultIds: [],
                zipCodeId: [],
                employeeId: 0,
                provinceId: 0,
                address: '',
                operatorIds: []
            })

            this.smsFilterForm.valueChanges.subscribe(items => {


                this.conditions = [];
                if (this.smsFilterForm.get('zipCodeId').value)
                    this.conditions.push({ propertyName: "zipCodeId", comparison: "equal", values: [this.smsFilterForm.get('zipCodeId').value] });
                if (this.smsFilterForm.get('operatorIds')?.value?.length > 0)
                    this.conditions.push({ propertyName: "employeeId", comparison: "in", values: this.smsFilterForm.get('operatorIds').value });
                if (this.smsFilterForm.get('address').value)
                    this.conditions.push({ propertyName: "address", comparison: "contains", values: this.smsFilterForm.get('address').value });
                if (this.smsFilterForm.get('taskResultIds')?.value?.length > 0)
                    this.conditions.push({ propertyName: "lastTaskResultId", comparison: "in", values: this.smsFilterForm.get('taskResultIds').value });

                this.smsService.getAllToSend(this._paginator.pageSize, this._paginator.pageIndex + 1, this.conditions).subscribe(s => { this.items = s.data; this.pagination.length = s.totalCount; });

            });

            this.smsFilterForm.get('provinceId').valueChanges.subscribe(provinceId => {
                this.cities = this.countryDivision.filter(cd => cd.parentId == provinceId);
            })

            this.provinces = this.countryDivision.filter(items => items.parentId == null);


            this.taskResults = this.globalService.getBaseValue("resultTypes");
            this.sort.sortChange.subscribe(() => (this.pagination.pageIndex = 0));
            this.loadData();
        }
    }

    @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

    /* ---------- OnClose for save(with result=true) and cancel(with result=false) ---------------- */
    @Output()
    onClose = new EventEmitter<boolean>();


    @ViewChild('picker') picker;

    @Input()
    set updateItem(value: any) {
        /* ---------- Form Builder with validation ---------------- */
        this.form = this._formBuilder.group({

            message: ['', Validators.required],
            endDateTime: ['', Validators.required],
            descriptions: ['', Validators.required],
            headLineNumberBaseId: ['', Validators.required],
            feedbackNumber: ['', Validators.required],
            title: ['', Validators.required],
            advertisementSourceBaseId: ['', Validators.required],
            advertisementContentBaseId: ['', Validators.required],
            fileAttachmentReletiveaddress: '',
        });
        // this.form.get("advertisementSourceBaseId")?.valueChanges.subscribe(val=>{
        //     if(val==1){

        //     }

        // })

        if (value != null) {

            this.pageMode = PageMode.Update;
            this.form.reset(value);
            this.createSmsCommand.id = value.id;
        } else this.pageMode = PageMode.Add;

    }

    constructor(
        private globalService: GlobalService,
        private _formBuilder: FormBuilder,
        private advertiseService: AdvertiseService,
        private operatorService: OperatorService,
        public loaderService: LoaderService,
        private uploadFileService: UploadFileService,
        private smsService: SmsService,
        private countryDivisionService: CountryDivisionService
    ) {
        this.headLineNumbers$ = this.globalService.getBaseValue('smsHeadLine');
        this.contents$ = this.globalService.getBaseValue('advertiseSource');

        this.countryDivisionService.getAllCities().subscribe(items => this.countryDivision = items);
        this.operatorService.getAll().subscribe(items => this.operators = items.data)
    }



    onClickUpload() {
        const fileUpload = this.fileUpload.nativeElement;
        fileUpload.onchange = () => {
            const file = fileUpload.files[0];
            this.uploadFile({ data: file, inProgress: false, progress: 0 });

        };
        fileUpload.click();
    }

    uploadFile(file) {
        let formData = new FormData();
        formData.set('file', file.data);

        file.inProgress = true;
        this.uploadFileService
            .upload(formData)
            .pipe(map((event) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        file.progress = Math.round(
                            (event.loaded * 100) / event.total
                        );
                        break;
                    case HttpEventType.Response:


                        this.isUpload = true;
                        let fileName = event.body.objResult;
                        this.extentionFile = fileName.split(".")[1].toUpperCase();
                        this.form.controls['fileAttachmentReletiveaddress'].setValue(fileName);
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


    ngAftmerViewInit(): void { }

    loadData() {
        merge(this.sort.sortChange, this._paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.smsService.getAllToSend(this._paginator.pageSize, this._paginator.pageIndex + 1);
                }),
                map((result: PagedList<SmsModel[]>) => {
                    if (this._paginator.pageIndex == 0)
                        this.pagination.length = result.totalCount;
                    return result.data;
                }),
            ).subscribe(result => {
                this.items = result;
            });
    }

    onBackdropClicked(): void {
        // Go back to the list
    }


    ngOnInit(): void {
        this.smsFilterForm = this._formBuilder.group({
            message: '',
            taskResultIds: [],
            zipCodeId: [],
            employeeId: 0,
            provinceId: 0,
            address: '',
            operatorIds: []
        });

    }

    selectedProvince(value: any) {

    }

    save() {
        if (this.form.valid) {
            const id = this.createSmsCommand?.id;
            this.createSmsCommand = <CreateSMSCommand>(this.form.getRawValue());
            this.createSmsCommand.advertisementSourceBaseId = this.globalService.getBaseValueByUniqueName("sms").id;
            this.createSmsCommand.conditions = this.conditions;

            this.createSmsCommand.saveChanges = true;
            this.createSmsCommand.id = id;
            this.saving = true;
            if (this.pageMode == PageMode.Add) {
                this.smsService
                    .add(this.createSmsCommand)
                    .subscribe((result) => {
                        this.saving = false;
                        this.onClose.emit(true);
                    });
            }
        }
    }

    isUsableFeedbackNumber(feedbackNumber: number, endDateTime: Date) {
        this.advertiseService
            .isUsableFeedbackNumber(feedbackNumber, '', endDateTime)
            .subscribe((result) => {
                if (!result)
                    this.form
                        .get('feedbackNumber')
                        .setErrors({ invalidNumber: true });
            });
    }
    cancel() {
        this.onClose.emit(false);
    }





}
