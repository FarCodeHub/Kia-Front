

import { Component, Inject, OnInit } from "@angular/core";

import { merge, Observable, of } from "rxjs";

import { BaseValueService } from "../../services/basevalue.service";
import { ProjectService } from "../../services/project.service";

import { Project } from "app/shared/models/project.model";

import { FuseAlertService } from "@fuse/components/alert";
import { PagedList } from "app/shared/models/paged-list";
import { CrudBase } from "../../models/CrudBase";
import { LoaderService } from "app/core/base/loader.service";
import { map, startWith, switchMap } from "rxjs/operators";

import { DialogData } from "./add-project/add-project.component";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from "environments/environment";
import { FuseConfirmationService } from "@fuse/services/confirmation";
@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent extends CrudBase<Project> {

  serverUrl: String = environment.imageUrl;
  // apiUrl: String = environment.apiUrl;
  constructor(
    private projectService: ProjectService,
    public loaderService: LoaderService,
    private _fuseAlertService: FuseAlertService,
    public dialog: MatDialog,
    private fuseConfirmationService: FuseConfirmationService) {
    super(fuseConfirmationService);
    this.drawerMode = 'over';
  }

  imageUrl: String = `${environment.imageUrl}`;



  ngAfterViewInit(): void {

    this._sort.sortChange.subscribe(() => (this.pagination.pageIndex = 0));
    this.loadData();

  }


  loadData() {
    merge(this._sort.sortChange, this._paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.projectService.getAll(this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map(x => this.filters[x].toServerCondition())
          );
        }),
        map((result: PagedList<Project[]>) => {
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


  deleteItem(item: any) {
    this.confirmDelete().then(x => {
      this.projectService.delete(item.id).subscribe(item => {
        this.loadData();
      });
    });
  }


  show(name: string): void {
    this._fuseAlertService.show(name);
  }


  showImage(value: string) {
    this.dialog.open(ShowImageDialog, {
      data: {
        image: value,
      },
    });
  }

  getFileExtension(filePath: string) {
    if (filePath == null)
      return '';
    return filePath.split('.')[1].toUpperCase();
  }

  isFileImage(filePath: string) {
    return ['PNG', 'JPG', 'JPEG'].includes(this.getFileExtension(filePath));
  }
}



@Component({
  selector: 'dialog-data-example-dialog',
  template: `<div mat-dialog-content class="p-16">

<div class="bg-purple-300 ...">
  <img class="object-contain h-48 w-96" src="{{url}}/{{imageUrl}}">
</div>
</div>`,
})
export class ShowImageDialog {
  imageUrl: string;
  url: String = `${environment.imageUrl}`;
  baseUrl: String = `${environment.apiUrl}`;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.imageUrl = data.image
  }
}
