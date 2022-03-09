/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/ban-types */
import { BaseEntity } from "./base.model";

export interface Permission extends BaseEntity {
    parentId: number | null;
    title: String;
    uniqueName: String;
    levelCode: String;
    children: Permission[]
}
