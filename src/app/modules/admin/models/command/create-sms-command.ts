import { Condition } from "app/shared/models/condition-model";

export interface CreateSMSCommand {
    saveChanges: true,
    hostName: string,
    title: string,
    adveertismentTypeBaseId: number,
    advertisementSourceBaseId: number;
    adveertismentLocationBaseId: number,
    reputation: number,
    contentTypeBaseId: number,
    headLineNumberBaseId: number,
    feedbackNumber: number,
    content: string,
    expense: number,
    startDateTime: string,
    endDateTime: string,
    descriptions: string,
    fileAttachmentReletiveaddress: string,
    message: string,
    numbers: string[],
    headLineNumber: string,
    id: 0,
    conditions: Condition[]
}
