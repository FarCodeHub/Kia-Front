import { PermissionDirective } from './directives/permission.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { FuseCardModule } from '@fuse/components/card';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JalaliDatePipe } from 'app/core/pipes/jalali-date-pipe';
import { JalaliPipe } from 'app/core/pipes/jalali-pipe';
import { FilterItemDirective } from './directives/filter-item.directive';
import { DataTableFilterMenuComponent } from './components/data-table/data-table-filter-menu/data-table-filter-menu.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TreeviewComponent } from './components/treeview/treeview.component';
import { DataTableColumnComponent } from './components/data-table/data-table-column/data-table-column.component';
import { DataTatableFiltersHeaderComponent } from './components/data-table/data-tatable-filters-header/data-tatable-filters-header.component';
import { AddCustomerComponent } from 'app/modules/admin/pages/customer/add-customer/add-customer.component';
import { AddEditSideBarComponent } from './components/add-edit-side-bar/add-edit-side-bar.component';
import { PageAddHeaderComponent } from './components/page-add-header/page-add-header.component';
import { CasesCardComponent } from './pages/cases-card/cases-card.component';
import { InboxComponent } from 'app/modules/operator/pages/inbox/inbox.component';

@NgModule({
    declarations: [
        JalaliDatePipe,
        JalaliPipe,
        FilterItemDirective,
        PermissionDirective,
        DataTableFilterMenuComponent,
        DataTableComponent,
        TreeviewComponent,
        DataTableColumnComponent,
        DataTatableFiltersHeaderComponent,
        PageAddHeaderComponent,
        AddEditSideBarComponent,
        AddCustomerComponent,
        CasesCardComponent,
        InboxComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatPaginatorModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTreeModule,
        MatMenuModule,
        MatSidenavModule,
        MatExpansionModule,
        MatDividerModule,
        MatListModule,
        MatAutocompleteModule,
        MatIconModule,
        MatTreeModule,

    ],

    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FuseCardModule,
        JalaliDatePipe,
        JalaliPipe,

        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatPaginatorModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTreeModule,
        MatMenuModule,
        MatSidenavModule,
        MatExpansionModule,
        MatDividerModule,
        MatListModule,
        MatAutocompleteModule,
        MatIconModule,
        MatTreeModule,

        FilterItemDirective,
        PermissionDirective,
        DataTableFilterMenuComponent,
        DataTableComponent,
        DataTableColumnComponent,
        TreeviewComponent,
        DataTatableFiltersHeaderComponent,
        PageAddHeaderComponent,
        AddEditSideBarComponent,
        AddCustomerComponent,
        CasesCardComponent,
        InboxComponent
    ]
})
export class SharedModule {
}
