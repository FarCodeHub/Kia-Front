// import { ProjectSubItem } from './../../../../shared/models/project.model';
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/ban-types */



export interface CreateProjectCommand {
    id: number
    saveChanges: boolean;
    title: string;
    filePath: string;
    lat: number;
    lng: number;
    priorityBaseId: number;
    address: string;
    children: CreateProjectCommand[]
    //projectSubItemModels: ProjectSubItem[];
}
