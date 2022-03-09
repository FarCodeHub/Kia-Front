export interface Censuses {
    totalTasks: number;
    totalCommunications: number;
    totalCases: number;
    totalCommmissionsAmount: number;
    totalCommmissionsCount: number;
    totalContracts: number;
    openCases: number;
    closedCases: number;
    paidCommmissionsAmount: number;
    unPaidCommmissionsAmount: number;
    paidCommmissionsCount: number;
    unPaidCommmissionsCount: number;
    incomingCommunications: number;
    outgoingCommunications: number;

    notDoneTasks: number;
    doneTasks: number;
    userId: number;
    employeeId: number;
    unitId: number;
    branchId: number;
    branch?: any;
    employee?: any;
    unit?: any;
    user?: any;
    id: number;
    createdAt: Date;
    modifiedById?: any;
    modifiedAt: Date;
    isDeleted: boolean;
    ownerRoleId: number;
    createdById: number;
}