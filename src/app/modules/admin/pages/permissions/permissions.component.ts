import { Component, OnInit } from "@angular/core";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { LoaderService } from "app/core/base/loader.service";
import { PagedList } from "app/shared/models/paged-list";
import { Permission } from "app/shared/models/permission.model";
import { merge, Observable } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import { CrudBase } from "../../models/CrudBase";
import { PermissionService } from "../../services/permission.service";

@Component({
  selector: "app-permissions",
  templateUrl: "./permissions.component.html",
  styleUrls: ["./permissions.component.scss"],
})
export class PermissionsComponent extends CrudBase<Permission> {
  updateItem: Permission;
  permissions$: Observable<PagedList<Permission[]>>;

  constructor(
    private permissionService: PermissionService,
    public loaderService: LoaderService
    , private fuseConfirmationService: FuseConfirmationService) {
    super(fuseConfirmationService);
    this.drawerMode = "over";
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
          return this.permissionService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition())
          );
        }),
        map((result: PagedList<Permission[]>) => {
          if (this._paginator.pageIndex == 0)
            this.pagination.length = result.totalCount;
          return result.data;
        })
      )
      .subscribe((result) => {
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
  }

  deleteItem(item: any) {
    this.permissionService.delete(item.id).subscribe((item) => { });
  }
}
