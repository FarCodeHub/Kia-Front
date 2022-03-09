import { Employee } from './employee.model';
import { Project } from './project.model';
import { Person } from './person.model';
import { BaseEntity } from './base.model';

export interface Comission extends BaseEntity {
    amount: number,
    isPaid: boolean,
    paidAt: Date
}
