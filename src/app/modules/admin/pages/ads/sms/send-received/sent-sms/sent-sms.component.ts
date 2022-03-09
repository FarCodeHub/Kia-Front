import { Component, OnInit } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LoaderService } from 'app/core/base/loader.service';
import { CrudBase } from 'app/modules/admin/models/CrudBase';
import { SmsService } from 'app/modules/admin/services/sms.service';
import { AdvertisementSource } from 'app/shared/models/advertisement-source.model';
import { PageMode } from 'app/shared/models/enums';
import { PagedList } from 'app/shared/models/paged-list';
import { SmsModel } from 'app/shared/models/sms-model';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sent-sms',
  templateUrl: './sent-sms.component.html',
  styleUrls: ['./sent-sms.component.scss']
})
export class SentSmsComponent extends CrudBase<SmsModel> {


  public PageMode = PageMode;

  startDate: string = '1399/01/01';
  endDate: string = '1400/12/30';

  constructor(private smsService: SmsService, public loaderService: LoaderService
    , private fuseConfirmationService: FuseConfirmationService) {
    super(fuseConfirmationService);
  }

  ngAfterViewInit(): void {

    this._sort.sortChange.subscribe(() => (this.pagination.pageIndex = 0));
    this.loadData();

  }

  loadData() {
    merge(this._sort.sortChange, this._paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.smsService.getAllSended(
            this.startDate,
            this.endDate,
            this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition()));
        }),
        map((result: PagedList<SmsModel[]>) => {
          if (this._paginator.pageIndex == 0)
            this.pagination.length = result.data.length;
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
    this.loadData();
  }

}
