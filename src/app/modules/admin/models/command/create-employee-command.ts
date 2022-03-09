export interface CreateEmployeeCommand {
    id: number;
    personId: number;
    employeeCode: '';
    unitPositionId: 0;
    unitId: 0;//utility
    positionId: 0;//utility
    isOperator: boolean | null;//utility
    employmentDate: Date | null;
    extentionNumber: string | null;

    firstName: string | null;
    lastName: string | null;
    fatherName: string | null;
    nationalCode: string | null;
    identityCode: string | null;
    birthPlaceId: number | null;
    birthDate: Date | null;
    genderBaseId: number  | null;
    email: string | null;
    postalCode: string | null;
    zipCodeId: number | null;
    address: string | null;
    profilePhotoUrl: string | null;
    phone1: string | null;
    phone2: string | null;
    phone3: string | null;


}
