import { SessionSurvey } from './session-survey.model';
import { BaseValue } from "app/shared/models/base-value.model";
import { Question } from "app/shared/models/question.model";

export interface QuestionType extends BaseValue {
    baseValueTypeId: number;
    parentId: number | null;
    levelCode: string;
    title: string;
    uniqueName: string;
    value: string | null;
    orderIndex: number;
    isReadOnly: boolean;

    questions: Question[];
    questionAnswers: SessionSurvey[];
}
