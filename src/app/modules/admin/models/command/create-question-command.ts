export interface CreateQuestionCommand{
    saveChanges:  boolean
    questionTypBaseId: number
    title: string
    answerTypeBaseId: number
    answerOptionBaseTypeId: number
    id:number
}
