export interface CreateAdvertisementSourceCommand {
    saveChanges: boolean;
    hostName: string | null;
    title: string | null;
    advertisementTypeBaseId: number;
    advertisementSourceBaseId: number;
    reputation: number;
    contentTypeBaseId: number;
    headLineNumberBaseId: number;
    feedbackNumber: number;
    content: string | null;
    expense: number;
    startDateTime: string;
    endDateTime: string;
    descriptions: string;
    id: number;
    fileAttachmentReletiveaddress:string;
}
