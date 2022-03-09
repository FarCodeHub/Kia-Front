import { ContractService } from './../../services/contract.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudBase } from 'app/modules/admin/models/CrudBase';
import { Contract } from 'app/shared/models/contract..model';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PagedList } from 'app/shared/models/paged-list';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PageMode } from 'app/shared/models/enums';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent extends CrudBase<Contract> implements OnInit {

  public PageMode = PageMode;
  selectedItem: Contract;

  constructor(private contractService: ContractService,
    private router: Router,
    private fuseConfirmationService: FuseConfirmationService) {
    super(fuseConfirmationService);

  }

  ngOnInit(): void {
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
          return this.contractService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition()));
        }),
        map((result: PagedList<Contract[]>) => {
          if (this._paginator.pageIndex == 0)
            this.pagination.length = result.totalCount;
          return result.data;
        }),
      ).subscribe(result => {
        this.items = result;
      });
  }

  detail(item: Contract) {
    this.selectedItem = item;
    this.addVisible = true;
  }

  public closeView(result: boolean) {
    this.addVisible = false;
  }

}
