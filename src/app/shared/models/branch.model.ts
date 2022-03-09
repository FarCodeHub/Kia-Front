/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
import { BaseEntity } from "./base.model";


export interface Branch extends BaseEntity {
    title: string;
    address: string;
    lat: number;
    lng: number;
    // location: Geometry | null;
    // createdByNavigation: User;
    // modifiedByNavigation: User;
    // ownerRole: Role;
    // units: Unit[];
}
