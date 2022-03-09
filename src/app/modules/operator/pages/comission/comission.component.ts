import { Comission } from './../../../../shared/models/comission.mode';
import { CommissionService } from './../../services/commission.service';
import { ContractService } from './../../services/contract.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudBase } from 'app/modules/admin/models/CrudBase';
import { Contract } from 'app/shared/models/contract..model';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PagedList } from 'app/shared/models/paged-list';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { UpdateComissionCommand } from '../../models/updateComissionCommand';

@Component({
  selector: 'app-comission',
  templateUrl: './comission.component.html',
  styleUrls: ['./comission.component.scss']
})
export class ComissionComponent extends CrudBase<Comission> implements OnInit {

  saving = false;
  constructor(private comissionService: CommissionService,
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
          return this.comissionService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition()));
        }),
        map((result: PagedList<Comission[]>) => {
          if (this._paginator.pageIndex == 0)
            this.pagination.length = result.totalCount;
          return result.data;
        }),
      ).subscribe(result => {
        this.items = result;
      });
  }

  pay(item: Comission) {
    const dialogConfig = <FuseConfirmationConfig>{
      title: ' تایید پرداخت',
      message: 'آیا از پرداخت کمیسیون مطمئن می باشید',
      icon: {
        show: true,
        name: 'heroicons_outline:question-mark-circle',
        color: 'info',
      },
      actions: {
        confirm: {
          show: true,
          label: 'تایید',
          color: 'primary',
        },
        cancel: {
          show: true,
          label: 'انصرف',
        },
      },
      dismissible: false
    };

    const dialogRef = this.fuseConfirmationService.open(dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirmed') {
        this.saving = true;
        this.comissionService.update(<UpdateComissionCommand>{
          id: item.id,
          amount: item.amount,
          isPaid: true,
          paidAt: new Date()
        }).subscribe((result) => {
          this.saving = false;
          this.loadData();
        });
      }

    });


  }

}
