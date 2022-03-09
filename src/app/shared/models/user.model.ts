import { BaseEntity } from "./base.model";
import { Person } from "./person.model";

export interface User extends BaseEntity {
    username: string;
    name: string;
    email: string;
    avatar?: string;
    status?: 'ready' | 'busy' | 'away' | 'unregistered',
    extentionNumber: string;
    queueNumber: string;

    isLoggedIn: boolean;
    isBlocked: boolean;
    blockedReason: string | null;
    password: string | null;
    failedCount: number;


    dateOfBirth: string;
    fatherName: string;
    fullName: string;
    gender: string;
    levelCode: string;
    mobilePhone: string;
    nationalNumber: string;
    employeeId: number;
    personId: number;
    unitId: number;
    positionId: number;
    unitPositionId: number;
    unitTitle: string;
    positionTitle: string;
    unitPositionTitle: string;
    profilePhotoUrl: String;
    // operatorId: number;
    // OwnerRoleId: number;
    refreshToken: string;
    userRoleName: string;
    rolesIdList: number[]
    userRolesTitle: string[];
    permissions: string[];

    person: Person;
}
