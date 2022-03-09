import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PagedList } from 'app/shared/models/paged-list';
import { Pagination } from 'app/shared/models/pagination';
import { CallService } from '../../services/call.service';
import { ActionTask, Task } from 'app/shared/models/session.model';
import { CrudBase } from 'app/modules/admin/models/CrudBase';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddResultDialogComponent } from './add-result-dialog/add-result-dialog.component';
import { User } from 'app/shared/models/user.model';
import { GlobalService } from 'app/shared/services/global.service';
import { UserService } from 'app/core/user/user.service';
import { Condition } from 'app/shared/models/condition-model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent extends CrudBase<Task> implements OnInit {

@Input()
isDone:boolean = false;

  conditions: Condition[] = [];
  isLoading: boolean = false;
  user: User;
  searchInputControl: FormControl = new FormControl();
  selectedItem: Task | null = null;
  selectedItemForm: FormGroup;
  pagination: Pagination = {
    length: 10,
    size: 0,
    pageIndex: 10,
    lastPage: 10,
    startIndex: 1,
    endIndex: 10,
  };

  constructor(private callService: CallService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private fuseConfirmationService: FuseConfirmationService, private _matDialog: MatDialog, private userService: UserService) {
    super(fuseConfirmationService);


  }

  ngAfterViewInit(): void {
    this.user = this.userService.currentUser;
    this.conditions.push({ propertyName: "employeeId", comparison: "equal", values: [this.user.employeeId] })
    if (this.isDone == true)
    {
        this.conditions.push({ propertyName: "endAt", comparison: "equal", values: [null] })
    }
    this._sort.sortChange.subscribe(() => (this.pagination.pageIndex = 0));
    this.loadData();
  }


  loadData() {
    this.callService.getAll(this.conditions)
      .pipe(map(data => {
        data.data.forEach(t => {
          let item = t as ActionTask;
          if (item.typeBaseUniqueName == 'requestCancel')
            item.actionTitle = 'تایید انصراف';
          else if (item.typeBaseUniqueName == 'requestAppointment' || item.typeBaseUniqueName == 'confirmAppointment')
            item.actionTitle = ' تایید قرار حضوری';
          else if (item.typeBaseUniqueName == 'requestApplyToVisitTheLand' || item.typeBaseUniqueName == 'applyToVisitTheLand')
            item.actionTitle = 'تایید بازدید';
          else if (item.typeBaseUniqueName == 'applyToContract')
            item.actionTitle = 'ثبت قرارداد';
          else if (item.typeBaseUniqueName == 'requestReference')
            item.actionTitle = 'تایید ارجاع';
          else if (item.typeBaseUniqueName == 'cancleContract')
            item.actionTitle = 'لغو قرارداد';

        })
        return data.data;

      }))
      .subscribe(result => {
        this.items = result;
      });
  }

  ngOnInit(): void {

  }

  addContract(item: Task) {
    this.router.navigate([`/add-contract/${item.customerId}/${item.id}/${item.caseId}`]);
  }

  detail(item: Task) {
    this.router.navigate([`/detail/${item.customerId}`]);
  }


  /**
   * Close the details
   */
  closeDetails(): void {
    this.selectedItem = null;
  }


  addResult(item: Task) {
    const dialogRef = this._matDialog.open(AddResultDialogComponent, {
      data: item
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

}
