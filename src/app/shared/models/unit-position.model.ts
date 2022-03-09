import { BaseEntity } from "./base.model";
import { Position } from "./position.model";
import { Unit } from "./unit.model";

export interface UnitPosition extends BaseEntity {
    unitId: number;
    positionId: number;
    position: Position;
    unit: Unit;
    unitTitle:string
    positionTitle:string
    // employees: Employee[];
}
