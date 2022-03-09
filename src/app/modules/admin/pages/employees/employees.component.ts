import { environment } from 'environments/environment';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */

import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { merge, Observable } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { fuseAnimations } from '@fuse/animations';
import { Employee } from 'app/shared/models/employee.model';
import { ParamModel } from 'app/shared/models/param-model';
import { PagedList } from 'app/shared/models/paged-list';
import { CrudBase } from '../../models/CrudBase';
import { LoaderService } from 'app/core/base/loader.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Condition } from 'app/shared/models/condition-model';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class EmployeesComponent extends CrudBase<Employee> implements OnInit {
    serverUrl = environment.imageUrl;

    _unitId: number;
    @Input()
    set unitId(value: number) {
        this._unitId = value;
        if (this._unitId != undefined && this._unitId != null)
            this.loadData();
    }

    constructor(
        private employeeService: EmployeeService,
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
        let conditions: Condition[] = [];
        if (this._unitId != undefined && this._unitId != null) {
            conditions.push({
                propertyName: 'UnitId',
                comparison: 'equal',
                values: [this._unitId],
            });
        }
        let filterCondition = Object.keys(this.filters).map(x => this.filters[0].toServerCondition());
        if (filterCondition.length > 0)
            conditions.push(...filterCondition);
        merge(this._sort.sortChange, this._paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.employeeService.GetAllByParam(conditions, this._paginator.pageSize, this._paginator.pageIndex + 1,
                        this._sort.active,
                        this._sort.direction);
                }),
                map((result: PagedList<Employee[]>) => {
                    if (this._paginator.pageIndex == 0)
                        this.pagination.length = result.totalCount;
                    return result.data;
                }),
            ).subscribe(result => {
                this.items = result;
            });
    }
    deleteItem(item: any) {
        this.confirmDelete().then(x => {
            this.employeeService.delete(item).subscribe(item => {
                this.loadData();
            });
        });
    }
}
