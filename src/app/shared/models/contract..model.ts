import { Project } from './project.model';
import { Person } from './person.model';
import { BaseEntity } from './base.model';
import { Task } from './session.model';
import { ContractEmployee } from './contract.employee.model';

export interface Contract extends BaseEntity {
    contractAttachmentModels: []

    createdByFullName: string;
    createdById: number

    taskModel: Task;
    projectModels: Project[];
    involvedEmployees: ContractEmployee[];

    descriptions: string;
}

