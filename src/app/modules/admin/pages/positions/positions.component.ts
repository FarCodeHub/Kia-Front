/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';
import { merge, Observable } from 'rxjs';
import { CreatePositionCommand } from '../../models/command/create-position-command';
import { PositionService } from '../../services/position.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Position } from 'app/shared/models/position.model';
import { PagedList } from 'app/shared/models/paged-list';
import { LoaderService } from 'app/core/base/loader.service';
import { CrudBase } from '../../models/CrudBase';
import { map, startWith, switchMap } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
})

export class PositionsComponent extends CrudBase<Position> {
  isLoading: boolean = false;
  addVisible = false;

  updateItem: Position;
  positions$: Observable<PagedList<Position[]>>;

  constructor(private positionService: PositionService,
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
          return this.positionService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition())
          );
        }),
        map((result: PagedList<Position[]>) => {
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
  }


  deleteItem(item: any) {
    this.confirmDelete().then(x => {
      this.positionService.delete(item.id).subscribe(item => {
        this.loadData();
      });
    });
  }

}
