import { BaseEntity } from "./base.model";

export interface Case extends BaseEntity {

    consultantFullName: string;
    consultantId: number;
    customerFullName: string;
    customerId: number;
    presentorFullName: string;
    presentorId: number;
    projectId: number;
    projectTitle: string;
    statusBaseId: number;
    statusBaseTitle: string;

    projectIds: number;
}