/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
import { BaseEntity } from "./base.model";
import { Branch } from "./branch.model";


export interface Unit extends BaseEntity {
    id:number;
    branchId: number;
    title: string;
    levelCode: string;
    parentId: number | null;
    branch: Branch;
    branchTitle:string;
    parentTitle:string;
    children?:Unit[];
    // createdByNavigation: User;
    // modifiedByNavigation: User;
    // ownerRole: Role;
    // parent: Unit;
    // inverseParent: Unit[];
    // unitPositions: UnitPosition[];
}
