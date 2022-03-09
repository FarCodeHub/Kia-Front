import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'app/core/base/loader.service';
import { AdvertiseService } from 'app/modules/admin/services/advertise.service';
import { AdvertisementSource } from 'app/shared/models/advertisement-source.model';
import { PageMode, PageName } from 'app/shared/models/enums';
import { PagedList } from 'app/shared/models/paged-list';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Pagination } from 'app/shared/models/pagination';
import { merge, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CrudBase } from 'app/modules/admin/models/CrudBase';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { BaseValue } from 'app/shared/models/base-value.model';
import { GlobalService } from 'app/shared/services/global.service';
import { Condition } from 'app/shared/models/condition-model';
import { MatDialog } from '@angular/material/dialog';
import { AdvertismentChartDialogComponent } from '../advertisment-chart-dialog/advertisment-chart-dialog.component';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent extends CrudBase<AdvertisementSource> {

  sourceId: BaseValue;

  constructor(private advertiseService: AdvertiseService,
    private activatedroute: ActivatedRoute,
    public loaderService: LoaderService,
    private globalService: GlobalService,
    private fuseConfirmationService: FuseConfirmationService,
    private _matDialog: MatDialog) {


    super(fuseConfirmationService);

    this.activatedroute.params.subscribe(routeParams => {
      console.log("page changed: " + routeParams.uniqueName)
      this.sourceId = this.globalService.getBaseValueByUniqueName(routeParams.uniqueName);
      if (this._sort)
        this.loadData();

    });
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
            values: [this.sourceId.id],
          });
          let filterCondition = Object.keys(this.filters).map(x => this.filters[0].toServerCondition());
          if (filterCondition.length > 0)
            conditions.push(...filterCondition);
          return this.advertiseService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            conditions
          );
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



  deleteItem(item: any) {
    this.advertiseService.delete(item.id).subscribe((item) => { });
  }

  advertismentChart(item:any)
  {
    const dialogRef = this._matDialog.open(AdvertismentChartDialogComponent, {
      data: item,
      height: '70%',
      width: '60%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

}
