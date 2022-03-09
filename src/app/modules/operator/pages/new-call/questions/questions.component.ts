
import { QuestionType } from './../../../models/questionType.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseValue } from 'app/shared/models/base-value.model';
import { Question } from 'app/shared/models/question.model';
import { SessionSurveyService } from 'app/modules/operator/services/session-survey.service';
import { SessionSurvey } from 'app/modules/operator/models/session-survey.model';
import { GlobalService } from 'app/shared/services/global.service';
import { QuestionService } from 'app/modules/operator/services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  @Input()
  loadAnswer: boolean;

  @Input()
  taskId: number;

  @Output()
  onQuestionChanged = new EventEmitter<Question[]>();

  @Input()
  questions: Question[];

  @Output()
  questionsChange = new EventEmitter<Question[]>();

  // @Input()
  questionTypes: QuestionType[];


  constructor(private sessionSurveyService: SessionSurveyService,
    private _questionService: QuestionService,
    private globalService: GlobalService
  ) {
    this.questionTypes = this.globalService.getBaseValue("questionType") as QuestionType[];

    this._questionService.getAll().subscribe(result => {
      this.questions = result.data;
      this.questionTypes.forEach(qt => {
        qt.questions = this.questions.filter(x => x.questionTypBaseId == qt.id);
      });
      this.questionsChange.emit(this.questions);
    })
  }

  ngOnInit(): void {

  }

  save() {

  }
}
