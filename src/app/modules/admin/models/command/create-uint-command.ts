/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/ban-types */

import { Position } from "app/shared/models/position.model";

export interface CreateUnitCommand {
    saveChanges: boolean;
    id: number;
    branchId: number;
    title: String;
    parentId: number;
    positionList: Position[];
}
