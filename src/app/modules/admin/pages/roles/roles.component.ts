
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Role } from 'app/shared/models/role.model';
import { Permission } from 'app/shared/models/permission.model';
import { merge, Observable } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { PagedList } from 'app/shared/models/paged-list';
import { LoaderService } from 'app/core/base/loader.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CrudBase } from '../../models/CrudBase';
import { clone } from 'lodash';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { CanComponentDeactivate } from 'app/core/auth/guards/can-deactivate.guard';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent extends CrudBase<Role> {

  permissions$: Observable<PagedList<Permission[]>>;

  constructor(private roleService: RoleService,
    private fuseConfirmationService: FuseConfirmationService,
    public loaderService: LoaderService) {// ------------ LoaderService----------
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
          return this.roleService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition()));
        }),
        map((result: PagedList<Role[]>) => {
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
      this.roleService.delete(item.id).subscribe(item => {
        this.loadData();
      });
    });
  }
}
