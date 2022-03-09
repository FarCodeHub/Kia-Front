/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
import { BaseEntity } from "./base.model";
import { Branch } from "./branch.model";


export interface Project extends BaseEntity {
    parentId: number | null;
    title: String;
    lat: number;
    lng: number;
    fileUrl: String;
    filePath: string;
    priorityBaseId: number;
    priorityBaseTitle: string;
    address: string;
    contractsCounter: number;
    children: Project[];
}

// export interface ProjectSubItem {
//     title: string;
// }
