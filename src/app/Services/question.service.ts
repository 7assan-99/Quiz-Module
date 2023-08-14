import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../api';
import { Question } from '../entities/question.entity';

@Injectable({
  providedIn: 'root'
})
export class QuestionService{

    constructor(private http: HttpClient){}

    api = API_URL

    public createQuestion(q: Question){
      return this.http.post(`${this.api}/question/create`,q)
    }

    public getQuestionsByExam(eId: string){
      return this.http.get<Question[]>(`${this.api}/question/getQuestionsByExam/${eId}`)
    }

    public deleteQuestion(id: string){
      return this.http.delete(`${this.api}/question/delete/${id}`)
    }

    public updateQuestion(q: Question){
      return this.http.put(`${this.api}/question/update`,q)
    }

    public getQuestionsByAttempt(eaId: string){
      return this.http.get(`${this.api}/question/getQuestionsByAttempt/${eaId}`);
    }

    public getUserCode(url: string){
      return this.http.get(`${this.api}/question/getCodeFile/${url}`,{responseType: 'text'})
    }
}