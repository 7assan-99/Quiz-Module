export enum QuestionType {
  MCQ = 'mcq',
  SHORTANSWER = 'sa',
  CODE = 'code',
}

export interface Question {
  ID?: string;

  Question: string;

  functionName?: string;

  Question_Type: QuestionType;

  Choices?: {};

  Answer?: {};

  Points: number;

  Created_By?: number;

  Created_On?: Date;

  Updated_By?: number;

  Updated_On?: Date;

  testFilePath?: string;

  C_ID: number;

  QB_ID: string;
}
