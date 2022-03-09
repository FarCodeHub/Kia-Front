export interface AdvertisementSource {
    id: number;
    hostName: string;
    title: string;
    advertisementTypeBaseId: number;
    advertisementSourceBaseId: number;
    advertisementTypeBaseTitle: string;
    advertisementSourceBaseTitle: string;
    reputation: number;
    contentTypeBaseId: number;
    contentTypeBaseTitle: string;
    headLineNumberBaseId: number;
    headLineNumberBaseTitle: string;
    feedbackNumber: number;
    content: string;
    expense: number;
    startDateTime: string;
    endDateTime: string;
    descriptions: string;
    createdByFullName:string;
    feedbackCounter:number;
}
