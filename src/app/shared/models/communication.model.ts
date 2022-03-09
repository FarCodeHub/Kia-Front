import { BaseEntity } from "./base.model";

export interface Communication extends BaseEntity {

    typeBaseId: number;
    typeBaseTitle: string;
    typeBaseUniqueName: string;
    advertismentId: number;
    advertismentTitle: string;
    voipUniqueNumber?: string;
    customerId: number;
    customerConnectedNumber: string;
    customerFirstName: string;
    customerLastName: string;
    customerFullName: string;
    smsUniqueNumber: string;
    employeeId: number;
    employeeUnitPositionTitle: string;
    createdAt: Date;
    extentionNumber: string;

    hasTask: boolean;
    taskId: number;

}