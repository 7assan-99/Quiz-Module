export interface Exam {
  ID?: string;

  Title: string;

  Description: string;

  TimeToStart: Date;

  TimeToEnd: Date;

  TimeToAttempt: number;

  NoOfAttempts: number;

  Grade: number;

  QuestionBank?: string;

  isPublished?: Boolean;

  Created_By?: number;

  Created_On?: Date;

  Course_ID: string;
}
