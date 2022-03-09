import { Component, OnInit } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LoaderService } from 'app/core/base/loader.service';
import { CrudBase } from 'app/modules/admin/models/CrudBase';
import { AdvertiseService } from 'app/modules/admin/services/advertise.service';
import { AdvertisementSource } from 'app/shared/models/advertisement-source.model';
import { Condition } from 'app/shared/models/condition-model';
import { PageMode, PageName } from 'app/shared/models/enums';
import { PagedList } from 'app/shared/models/paged-list';
import { GlobalService } from 'app/shared/services/global.service';
import { merge, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
})
export class SmsComponent extends CrudBase<AdvertisementSource>  {
  public PageMode = PageMode;

  updateItem: AdvertisementSource;

  constructor(private advertiseService: AdvertiseService,
    private globalService: GlobalService,
    public loaderService: LoaderService
    , private fuseConfirmationService: FuseConfirmationService) {
    super(fuseConfirmationService);
    this.drawerMode = 'over';
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
          let conditions: Condition[] = [];
          conditions.push({
            propertyName: 'AdvertisementSourceBaseId',
            comparison: 'equal',
            values: [this.globalService.getBaseValueByUniqueName("sms").id],
          });
          let filterCondition = Object.keys(this.filters).map(x => this.filters[0].toServerCondition());
          if (filterCondition.length > 0)
            conditions.push(...filterCondition);

          return this.advertiseService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            conditions);
        }),
        map((result: PagedList<AdvertisementSource[]>) => {
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
    this.loadData();
  }

  updateGrid(item: any) {
    this.loadData();
    // ------------ show add/edit----------
    this.addVisible = true;
  }

  deleteItem(item: any) {
    this.advertiseService.delete(item.id).subscribe((item) => { });
  }


}
