import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entities/user.entity';
import { API_URL } from '../api';
import { Student } from '../entities/student.entity';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  api = API_URL;

  public createStudent(u: User, major: string) {
    return this.http.post<User>(`${this.api}/user/create-student/${major}`, u);
  }

  public getStudents() {
    return this.http.get<any[]>(`${this.api}/student`);
  }

  public deleteStudent(id: number) {
    return this.http.delete(`${this.api}/student/delete/${id}`);
  }

  public updateStudent(id: number, s: any) {
    return this.http.put(`${this.api}/student/update/${id}`, s);
  }

  public createExamAttempt(eId: string) {
    return this.http.post(`${this.api}/student/createAttempt/${eId}`, null);
  }

  public getOnGoingAttempt(eId: string) {
    return this.http.get(`${this.api}/student/getOngoingAttempt/${eId}`);
  }

  public sendQuestionResponse(q: any, eaID: string) {
    return this.http.post(`${this.api}/student/addQuestionResponse/${eaID}`,q)
  }
  //TODO: implement get students in course
}
