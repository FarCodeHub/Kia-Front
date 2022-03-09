/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LoaderService } from 'app/core/base/loader.service';
import { PageMode } from 'app/shared/models/enums';
import { PagedList } from 'app/shared/models/paged-list';
import { User } from 'app/shared/models/user.model';
import { environment } from 'environments/environment';
import { filter } from 'lodash';
import { merge, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CrudBase } from '../../models/CrudBase';
import { UserAdminService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends CrudBase<User> {
  serverUrl = environment.imageUrl;
  public PageMode = PageMode;
  updateItem: User;
  selectedItemForm: FormGroup;
  users$: User[] = [];
  selectedUser: User | null = null;
  constructor(private userService: UserAdminService, private _formBuilder: FormBuilder, public loaderService: LoaderService
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
          return this.userService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition())
          );
        }),
        map((result: PagedList<User[]>) => {
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
    this.selectedItemForm = this._formBuilder.group({
      roleTitle: '',
    });
    this.loadData();
  }


  closeDetails(): void {
    this.selectedUser = null;
  }

  updateGrid(item: any) {
    this.loadData();
    // ------------ show add/edit----------
    this.addVisible = true;
  }

  deleteItem(item: any) {
    this.confirmDelete().then(x => {
      this.userService.delete(item.id).subscribe(item => {
        this.loadData();
      });
    });
  }

}
