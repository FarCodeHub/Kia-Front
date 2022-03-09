import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { LoaderService } from "app/core/base/loader.service";
import { PagedList } from "app/shared/models/paged-list";
import { Question } from "app/shared/models/question.model";
import { merge } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import { CrudBase } from "../../models/CrudBase";
import { QuestionService } from "../../services/question.service";
import { AnswerDetailComponent } from "./answer-detail/answer-detail.component";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.scss"],
})
export class QuestionsComponent extends CrudBase<Question> {
  constructor(
    private questionService: QuestionService,
    private fuseConfirmationService: FuseConfirmationService,
    public loaderService: LoaderService,
    private _matDialog: MatDialog
  ) {
    // ------------ LoaderService----------
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
          return this.questionService.getAll(
            this._paginator.pageSize,
            this._paginator.pageIndex + 1,
            this._sort.active,
            this._sort.direction,
            Object.keys(this.filters).map((x) =>
              this.filters[x].toServerCondition()
            )
          );
        }),
        map((result: PagedList<Question[]>) => {
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

  deleteItem(item: any) {
    this.confirmDelete().then(x => {
      this.questionService.delete(item.id).subscribe(item => {
        this.loadData();
      });
    });
  }

  showAnswers(item) {
    const dialogRef = this._matDialog.open(AnswerDetailComponent, {
      data: {
        items: item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }
}
