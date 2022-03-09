export interface CreateCustomerCommand {
    id: number;
    personId: number;
    consultantId: number;
    presentorId: number;
    statusId: number

    firstName: string | null;
    lastName: string | null;
    fatherName: string | null;
    nationalCode: string | null;
    identityCode: string | null;
    birthPlaceId: number | null;
    birthDate: Date | null;
    genderBaseId: number;
    email: string | null;
    postalCode: string | null;
    zipCodeId: number | null;
    address: string | null;
    profilePhotoUrl: string | null;
    phone1: string;
    phone2: string;
    phone3: string;


}
