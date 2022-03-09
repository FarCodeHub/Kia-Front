import { GlobalService } from 'app/shared/services/global.service';
import { CaseService } from './../../services/case.service';
import { Case } from './../../../../shared/models/case.model';
import { Component, OnInit } from '@angular/core';
import { CrudBase } from 'app/modules/admin/models/CrudBase';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PagedList } from 'app/shared/models/paged-list';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-cases-report',
  templateUrl: './cases-report.component.html',
  styleUrls: ['./cases-report.component.scss']
})
export class CasesReportComponent extends CrudBase<Case> implements OnInit {

  applyToContractId: number;

  viewMode: 'grid' | 'card';
  constructor(private caseService: CaseService,
    private globalService: GlobalService,
    private router: Router,
    private fuseConfirmationService: FuseConfirmationService) {
    super(fuseConfirmationService);
    this.viewMode = 'grid';
    this.applyToContractId = this.globalService.getBaseValueByUniqueName("applyToContract").id;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._sort.sortChange.subscribe(() => (this.pagination.pageIndex = 0));
    this.loadData();
  }

  changeView() {
    if (this.viewMode == 'card')
      this.viewMode = 'grid';
    else
      this.viewMode = 'card';
  }

  loadData() {
    merge(this._sort.sortChange, this._paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.caseService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition()));
        }),
        map((result: PagedList<Case[]>) => {
          if (this._paginator.pageIndex == 0)
            this.pagination.length = result.totalCount;
          return result.data;
        }),
      ).subscribe(result => {
        this.items = result;
      });
  }

  loadUnsortData() {

  }

  detail(item: Case) {
    this.router.navigate([`/detail/${item.customerId}`]);

  }

  addContract(item: Case) {

    this.router.navigate([`/add-contract/${item.customerId}/${item.customerId}/${item.id}`]);
  }
}
