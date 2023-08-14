import { Category } from "../entities/category.entity";
import { Question, QuestionType } from "../entities/question.entity";

export const isCategory = (obj: any): obj is Category => {
    return ('ID' in obj && 'Name' in obj && 'no_questions_to_appear_in_exam' in obj);
}

export const isQuestion = (obj: any): obj is Question =>{
    return 'Question_Type' in obj && 'Question' in obj
}

export const isQuestionType = (obj: any[]):boolean => {
    const q = obj.includes('mmcq') || obj.includes('mcq') || obj.includes('code') || obj.includes('sa')
    return q
}

