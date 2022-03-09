import { User } from "./user.model";
import { Role } from "./role.model";
import { Person } from "./person.model";
import { BaseEntity } from "./base.model";
import { UnitPosition } from "./unit-position.model";

export interface Employee extends Person {
    personId: number;
    unitPositionId: number | null;
    employeeCode: string;
    employmentDate: string;
    leaveDate: string | null;
    branchId: number;
    branchTitle: string;
    unitId: number;
    unitPositionTitle: string;
    // positionUniqueName: string;
    ownerRole: Role;
    // operator: Operator;
    //person: Person;
    personModel: Person;
    unitPosition: UnitPosition;
    extentionNumber:string;
    isOperator:boolean;
}
