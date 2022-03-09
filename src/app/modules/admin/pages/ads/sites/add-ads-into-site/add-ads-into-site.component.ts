import { BaseValue } from 'app/shared/models/base-value.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'app/core/base/loader.service';
import { CreateAdvertisementSourceCommand } from 'app/modules/admin/models/command/create-Advertisement-Source-Command';
import { AdvertiseService } from 'app/modules/admin/services/advertise.service';
import { PageMode, PageName } from 'app/shared/models/enums';
import { GlobalService } from 'app/shared/services/global.service';
@Component({
  selector: 'app-add-ads-into-site',
  templateUrl: './add-ads-into-site.component.html',
  styleUrls: ['./add-ads-into-site.component.scss']
})
export class AddAdsIntoSiteComponent implements OnInit {

  //---To use in html
  public PageMode = PageMode;

  /* ---------- OnClose for save(with result=true) and cancel(with result=false) ---------------- */
  @Output()
  onClose = new EventEmitter<boolean>();

  pageMode: PageMode = PageMode.Add;
  pageTitle: string;
  saving = false;
  headLineNumbers$: BaseValue[];

  _sourceId: BaseValue;
  @Input()
  set sourceId(value: BaseValue) {

    this._sourceId = value;
    if (this._sourceId.uniqueName == 'divar')
      this.pageTitle = "دیوار"
    else
      this.pageTitle = "شیپور"


  }
  form: FormGroup;
  createAdsCommand: CreateAdvertisementSourceCommand = {
    advertisementSourceBaseId: 0,
    content: '',
    advertisementTypeBaseId: 0,
    saveChanges: true,
    contentTypeBaseId: 0,
    descriptions: '',
    endDateTime: '',
    expense: 0,
    feedbackNumber: 0,
    headLineNumberBaseId: 0,
    hostName: '',
    reputation: 0,
    startDateTime: '',
    title: '',
    id: 0,
    fileAttachmentReletiveaddress: ''
  };

  @Input()
  set updateItem(value: any) {
    /* ---------- Form Builder with validation ---------------- */

    this.form = this._formBuilder.group({
      endDateTime: ['', Validators.required],
      startDateTime: ['', Validators.required],
      headLineNumberBaseId: ['', Validators.required],
      descriptions: ['', Validators.required],
      feedbackNumber: ['', Validators.required],
      title: ['', Validators.required],
      expense: ['', Validators.required],
      saveChanges: true,
      // hostName: ['', Validators.required],
      // reputation: ['', Validators.required],
      // advertisementTypeBaseId: ['', Validators.required],
    });
    /* ---------- check value is null or not ---------------- */
    if (value != null) {
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Update;
      this.form.controls['title'].setValue(value.title);
      // this.form.controls['hostName'].setValue(value.hostName);
      // this.form.controls['reputation'].setValue(value.reputation);
      // this.form.controls['advertisementTypeBaseId'].setValue(value.advertisementTypeBaseId);
      this.form.controls['feedbackNumber'].setValue(value.feedbackNumber);
      this.form.controls['startDateTime'].setValue(value.startDateTime);
      this.form.controls['endDateTime'].setValue(value.endDateTime);
      this.form.controls['expense'].setValue(value.expense);
      this.form.controls['descriptions'].setValue(value.descriptions);
      this.form.controls['headLineNumberBaseId'].setValue(value.headLineNumberBaseId);
      this.createAdsCommand.id = value.id;
    }
    else
      /* ---------- Set Page Mode ---------------- */
      this.pageMode = PageMode.Add;
  }

  constructor(private _formBuilder: FormBuilder,
    private globalService: GlobalService,
    private advertiseService: AdvertiseService,
    public loaderService: LoaderService) {
    this.headLineNumbers$ = this.globalService.getBaseValue('smsHeadLine');
  }

  ngOnInit(): void {

  }

  save() {

    if (this.form.valid) {
      const id = this.createAdsCommand?.id;
      this.createAdsCommand = <CreateAdvertisementSourceCommand>this.form.getRawValue();
      this.createAdsCommand.advertisementSourceBaseId = this._sourceId.id;
      this.createAdsCommand.hostName = this.pageTitle;
      this.createAdsCommand.reputation = 0;
      this.createAdsCommand.advertisementTypeBaseId = this.globalService.getBaseValue('advertiseType')[0].id;
      this.createAdsCommand.id = id;
      this.createAdsCommand.saveChanges = true;

      this.saving = true;
      if (this.pageMode == PageMode.Add) {

        this.advertiseService
          .add(this.createAdsCommand)
          .subscribe((result) => {
            //--------finish and close the page----
            this.saving = false;
            this.onClose.emit(true);

          });
      }
      else {
        this.advertiseService
          .update(this.createAdsCommand)
          .subscribe((result) => {
            //--------finish and close the page----
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
