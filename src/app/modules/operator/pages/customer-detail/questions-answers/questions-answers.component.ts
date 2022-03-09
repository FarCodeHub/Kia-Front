import { Component, Input, OnInit } from '@angular/core';
import { QuestionType } from 'app/modules/operator/models/questionType.model';
import { SessionSurvey } from 'app/modules/operator/models/session-survey.model';
import { QuestionService } from 'app/modules/operator/services/question.service';
import { SessionSurveyService } from 'app/modules/operator/services/session-survey.service';
import { GlobalService } from 'app/shared/services/global.service';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss']
})
export class QuestionsAnswersComponent implements OnInit {

  @Input()
  compact: boolean = false;

  _caseId: number;
  @Input()
  set caseId(value: number) {
    this._caseId = value;
    this.sessionSurveyService.getByCaseId(this._caseId).subscribe(result => {
      this.initData(result.data);
    })
  }

  _task: number;
  @Input()
  set taskId(value: number) {
    this._task = value;
    this.sessionSurveyService.getByTaskId(this._task).subscribe(result => {
      this.initData(result.data);
    })
  }

  // @Input()
  questionTypes: QuestionType[];
  questionsAnswers: SessionSurvey[];


  constructor(private sessionSurveyService: SessionSurveyService,
    // private _questionService: QuestionService,
    private globalService: GlobalService
  ) {
    this.questionTypes = this.globalService.getBaseValue("questionType") as QuestionType[];
  }

  ngOnInit(): void {

  }

  initData(data) {
    this.questionsAnswers = data;
    this.questionTypes.forEach(qt => {
      qt.questionAnswers = this.questionsAnswers.filter(x => x.questionTypeId == qt.id);
    });
  }

}
