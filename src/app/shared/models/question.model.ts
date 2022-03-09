export interface Question {
    id: number;
    questionTypBaseId: number;
    title: string;
    answerTypeBaseId: number;
    answerOptionBaseTypeId: number;
    answerTypeBaseUniqueName: string;
    questionTypBaseTitle: string;
    questionTypBaseUniqueName: string;
    answerTypeBaseTitle: string;
    answerOptionBases: AnswerOption[];
    answer: any;
}

export interface AnswerOption {
    id: number;
    baseValueTypeId: number;
    parentId: number;
    title: string;
    uniqueName: string;
    value: null;
    orderIndex: number;
    levelCode: string;
    isReadOnly: boolean;
}
