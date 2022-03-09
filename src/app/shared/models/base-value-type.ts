export interface BaseValueType {
    id:number
    parentId: number;
    title: string;
    uniqueName: string;
    groupName: string;
    isReadOnly: boolean | null;
    subSystem: string;
    levelCode:string
}
