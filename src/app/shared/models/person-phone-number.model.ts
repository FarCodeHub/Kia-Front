import { BaseEntity } from "./base.model";
import { Person } from "./person.model";


export interface PersonPhoneNumber extends BaseEntity {
    personId: number | null;
    phoneNumber: string | null;

    // person: Person;
}