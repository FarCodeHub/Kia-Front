import { BaseEntity } from "./base.model";
import { Permission } from "./permission.model";

export interface Role extends BaseEntity {
    levelCode: string;
    title: string;
    uniqueName: string | null;
    description: string | null;
    parentId: number | null;
    parentTitle: string;
    permissionsIdList: Permission[];

}
