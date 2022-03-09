import { SessionSurvey } from "./session-survey.model";

export interface EndTaskCommand {
    taskId: number;
    resultBaseId: number;
    communicationId: number;
    dueAt: Date;
    saveChanges: boolean;
    sessionSurveyCreateModels: SessionSurvey[],
    descriptions : string,
    assignToEmployeeId : number,

}
