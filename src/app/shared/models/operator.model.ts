import { BaseEntity } from "./base.model";

export interface Operator extends BaseEntity {
    extentionNumber: number;
    queueNumber: number;
    employeeId: number;
    fullName: string;
    personId: number;
    unitPositionTitle: string;
    avatar: string;
    status: string;
    profilePhotoUrl: string;
}