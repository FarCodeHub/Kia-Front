import { BaseEntity } from "./base.model";

export interface Menu extends BaseEntity {
    parentId: number | null;
    title: string;
    subTitle: string;
    uniqueName: string;
    link: string;
    icon: string;
    children: Menu[]
}
