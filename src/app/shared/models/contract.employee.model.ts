import { User } from "./user.model";
import { Role } from "./role.model";
import { Person } from "./person.model";
import { BaseEntity } from "./base.model";
import { UnitPosition } from "./unit-position.model";
import { Employee } from "./employee.model";

export interface ContractEmployee {
    isDeleted: boolean;
    isNew: boolean;


    id: number;
    contractId: number;
    amount: number;
    employeeId: number;
    employeeFullName: string;
    isPaid: boolean;
    paidAt?: any;
    projectId: number;
    projectTitle: string;
    createdAt: Date;
    branchTitle: string;
    unitPositionTitle: string;
}
