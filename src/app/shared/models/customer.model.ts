import { Operator } from "./operator.model";
import { BaseEntity } from "./base.model";
import { Person } from "./person.model";

export interface Customer extends BaseEntity {
    personId: number;
    id:number;

    currentOperatorId: number;
    personModel: Person;

}
