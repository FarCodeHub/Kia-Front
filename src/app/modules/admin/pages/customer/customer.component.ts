import { Component, OnInit } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LoaderService } from 'app/core/base/loader.service';
import { BaseValue } from 'app/shared/models/base-value.model';
import { Customer } from 'app/shared/models/customer.model';
import { PagedList } from 'app/shared/models/paged-list';
import { GlobalService } from 'app/shared/services/global.service';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CrudBase } from '../../models/CrudBase';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends CrudBase<Customer> implements OnInit {


  constructor(public loaderService: LoaderService,
    private customerService: CustomerService,
    private globalService: GlobalService
    , private fuseConfirmationService: FuseConfirmationService) {
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
          return this.customerService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition())
          );
        }),
        map((result: PagedList<Customer[]>) => {
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
    this.customerService.delete(item.id).subscribe(item => {

    });
  }

}
