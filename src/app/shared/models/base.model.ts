export interface BaseEntity {
    id: number;
    createdAt: Date;
    modifiedBy: number | null;
    modifiedAt: string;
    isDeleted: boolean;
    ownerRoleId: number;
    createdBy: Date;
}