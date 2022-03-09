/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
import { BaseEntity } from "./base.model";


export interface BaseValue extends BaseEntity {
    baseValueTypeId: number;
    baseValueTypeTitle: string;
    baseValueTypeUniqueName: string;
    parentId: number | null;
    levelCode: string;
    title: string;
    uniqueName: string;
    value: string | null;
    orderIndex: number;
    isReadOnly: boolean;
}
