/* eslint-disable @typescript-eslint/ban-types */
import { Role } from "app/shared/models/role.model";

export interface CreateUserCommand {
    saveChanges: boolean;
    personId: number;
    username: String;
    newPassword:string;
    password: String;
    rolesIdList: Role [];
    id? : number;
}
