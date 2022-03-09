/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/ban-types */
import { Permission } from "app/shared/models/permission.model";

export interface CreateRoleCommand {

    saveChanges: boolean;
    title: String;
    uniqueName: String;
    description: String;
    parentId: number;
    permissionsIdList: Permission [];
    id:number;
}
