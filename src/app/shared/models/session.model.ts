
import { BaseEntity } from "./base.model";
import { Customer } from "./customer.model";
import { Employee } from "./employee.model";
import { Operator } from "./operator.model";

export interface Task extends BaseEntity {
    id: number;
    parentId: null;
    communicationId: number;
    typeBaseId: number;
    employeeId: number;
    customerId: number;
    customerFullName: string;
    customerFirstName: string,
    customerLastName: string,
    extentionNumber: string,
    employeeFullName: string,
    customerPhoneNumber1: string,
    customerPhoneNumber2: string,
    customerPhoneNumber3: string;

    projectId: number;
    startAt: Date;
    duoAt: Date;
    endAt: Date;
    status: number;
    statusTitle: string;
    resultBaseId: number;
    projectTitle: string;
    createdAt: Date;
    sessionSurveys: any[];
    caseId: number;
    // customer: Customer;
    // operator: Operator;
    // employeeModel: Employee;

    typeBaseTitle: string;
    typeBaseUniqueName: string;
    resultBaseTitle: string;
    resultBaseUniqueName: string;
    descriptions?: any;
}

export interface ActionTask extends Task {
    actionTitle: string;
}