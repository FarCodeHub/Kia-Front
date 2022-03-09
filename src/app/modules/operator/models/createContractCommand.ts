import { Dictionary } from "lodash";

export interface CreateContractCommand {
    taskId: number;
    descriptions: string,
    caseId: number;
    attachmentsUrl: string[];
    projectsId: number[];
    involvedEmployeesCommision: Dictionary<number>;

}