import { Component, OnInit } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LoaderService } from 'app/core/base/loader.service';
import { Branch } from 'app/shared/models/branch.model';
import { PagedList } from 'app/shared/models/paged-list';
import { merge, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CrudBase } from '../../models/CrudBase';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent extends CrudBase<Branch> {

  branches$: Observable<PagedList<Branch[]>>

  constructor(private branchService: BranchService,
    public loaderService: LoaderService,
    private fuseConfirmationService: FuseConfirmationService) {
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
          return this.branchService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition()));
        }),
        map((result: PagedList<Branch[]>) => {
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
    this.confirmDelete().then(x => {
      this.branchService.delete(item.id).subscribe(item => {
        this.loadData();
      });
    })
  }

}
