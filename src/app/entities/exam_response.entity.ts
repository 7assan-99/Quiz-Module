export interface Exam_Response {
  ExamAttempt_ID: string;

  Question_ID: string;

  Student_Answer: JSON;

  codeFilePath?: string;

  PointsEarned: number;
}
