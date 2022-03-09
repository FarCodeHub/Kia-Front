import { Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { MatSort } from "@angular/material/sort";
import { FuseConfirmationConfig, FuseConfirmationService } from "@fuse/services/confirmation";
import { CanComponentDeactivate } from "app/core/auth/guards/can-deactivate.guard";
import { Filter } from "app/shared/components/data-table/data-table-filter-menu/data-table-filter-menu.component";
import { Pagination } from "app/shared/models/pagination";

@Component({
    template: ''
})
export abstract class CrudBase<T> implements CanComponentDeactivate {
    deleteDialogConfig = <FuseConfirmationConfig>{
        title: 'تایید حذف',
        message: 'آیا از حذف آیتم مطمئن می باشسد',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation',
            color: 'warn',
        },
        actions: {
            confirm: {
                show: true,
                label: 'بله',
                color: 'primary',
            },
            cancel: {
                show: true,
                label: 'خیر',
            },
        },
        dismissible: false
    };
    @ViewChild('matDrawer', { static: true }) protected matDrawer: MatDrawer;
    @ViewChild(MatPaginator) protected _paginator: MatPaginator;
    @ViewChild(MatSort) protected _sort: MatSort;

    public drawerMode: 'side' | 'over';
    public addVisible = false;
    public showFilters = false;
    public pagination: Pagination = <Pagination>{
        pageIndex: 0,
        size: 25
    };
    public updateItem: T;
    public items: T[] = [];
    public form: FormGroup;
    public filters: { [id: string]: Filter; } = {};

    constructor(private _fuseConfirmationService: FuseConfirmationService,) {
        this.drawerMode = 'over';
    }

    abstract loadData();

    public applyFilter(filters) {
        this.loadData();
        //console.log(this.filters);
    }

    public editItem(item: any) {
        this.updateItem = item;
        // ------------ show add/edit----------
        this.addVisible = true;
    }

    // ------------ show add/edit----------
    public showAdd() {

        this.updateItem = null;
        this.addVisible = true;
    }

    // ------------ close add/edit----------
    public closeAdd(result: boolean) {
        this.addVisible = false;
        if (result) {
            this.loadData();
        }
    }

    public canDeactivate(): Promise<boolean> {
        const dialogConfig = <FuseConfirmationConfig>{
            title: 'تایید خروج',
            message: 'آیا می خواید از صفحه خارج شوید؟',
            icon: {
                show: true,
                name: 'heroicons_outline:question-mark-circle',
                color: 'info',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'بله',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'خیر',
                },
            },
            dismissible: false
        };

        // Subscribe to afterClosed from the dialog reference

        return new Promise<boolean>((resolve) => {

            if (!this.addVisible) {
                resolve(true);
            } else {
                const dialogRef = this._fuseConfirmationService.open(dialogConfig);
                dialogRef.afterClosed().subscribe((result) => {
                    resolve(result == 'confirmed');
                });
            }
        });

    }

    confirmDelete(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {

            const dialogRef = this._fuseConfirmationService.open(this.deleteDialogConfig);
            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed')
                    resolve(true);

            });
        });
    }



}
