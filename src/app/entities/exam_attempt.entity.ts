export interface Exam_Attempt {
  ID: string;

  Exam_ID: string;

  Student_ID: number;

  StartTime: Date;

  TimeToEnd: Date;

  FinishTime?: Date;

  Score?: number;

  isPublished?: Boolean;

  isFeedbackAllowed: Boolean;
}
