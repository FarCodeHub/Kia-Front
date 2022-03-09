
import { BaseEntity } from "./base.model";
import { CountryDivision } from "./country-division";

import { Customer } from "./customer.model";
import { Employee } from "./employee.model";
import { PersonPhoneNumber } from "./person-phone-number.model";

export interface Person extends BaseEntity {
    firstName: string | null;
    lastName: string | null;
    fatherName: string | null;
    fullName: string;
    nationalCode: string | null;
    identityCode: string | null;
    birthPlace: CountryDivision;
    birthPlaceId: number;
    birthPlaceTitle: string;
    birthDate: Date | null;
    genderBaseId: number;
    genderBaseTitle: string;
    email: string | null;
    postalCode: string | null;
    zipCodeId: number | null;
    address: string | null;
    profilePhotoUrl: string | null;
    personPhoneNumberPersons: PersonPhoneNumber[];
    saveChanges:boolean;
    zipCode: CountryDivision;
    zipCodePlaceTitle: string;
    phone1: string;
    phone2: string;
    phone3: string;

    // ownerRole: Role;
    // employee: Employee;
    // users: User[];
    // customer: Customer;
}
