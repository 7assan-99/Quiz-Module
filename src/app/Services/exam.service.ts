import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../api';
import { Exam } from '../entities/exam.entity';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
    
  constructor(private http: HttpClient){}

  api = API_URL

  public createExam(e: Exam,qb: string){
      return this.http.post<Exam>(`${this.api}/exam/create/${qb}`,e)
  }

  public canCreateExam(cId: string){
    return this.http.get<Boolean>(`${this.api}/exam/canCreateExam/${cId}`)
  }

  public getCurrentExamByCourse(cId: string){
    return this.http.get<Exam>(`${this.api}/exam/getCurrentExamByCourse/${cId}`)
  }

  public getCurrentExamByCourseForStudent(cId: string){
    return this.http.get<Exam>(
      `${this.api}/exam/getCurrentExamByCourseForStudent/${cId}`
    );
  }

  public deleteExam(id: string){
    return this.http.delete(`${this.api}/exam/deleteExam/${id}`)
  }

  public getExam(id: string){
    return this.http.get<Exam>(
      `${this.api}/exam/getExamById/${id}`
    );
  }

  public publishExam(eId: string, pub: boolean){
    return this.http.put(`${this.api}/exam/publishExam/${pub}/${eId}`, '');
  }

  public getExamAttempt(eaId: any){
    return this.http.get(`${this.api}/student/getExamAttemptById/${eaId}`);
  }

  public submitExamAttempt(eaId: string){
    return this.http.put(`${this.api}/student/submitExamAttempt/${eaId}`,'')
  }

  public getCourseExamGradeListByStudent(cId: string){
    return this.http.get(`${this.api}/student/getCourseExamGradeListByStudent/${cId}`);
  }

  public updateExam(e: Exam){
    return this.http.put(`${this.api}/exam/updateExam`,e)
  }
}