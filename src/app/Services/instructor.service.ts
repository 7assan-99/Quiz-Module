import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entities/user.entity';
import { API_URL } from '../api';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  constructor(private http: HttpClient) {}

  api = API_URL;

  public createInstructor(u: User, speciality: string) {
    return this.http.post<User>(
      `${this.api}/user/create-instructor/${speciality}`,
      u
    );
  }

  public getInstructors() {
    return this.http.get<any[]>(`${this.api}/instructor`);
  }

  public deleteInstructor(id: number) {
    return this.http.delete(`${this.api}/instructor/delete/${id}`);
  }

  public updateInstructor(id: number, u: any) {
    return this.http.put(`${this.api}/instructor/update/${id}`, u);
  }

  public publishExamGrades(eId: string, pub: boolean) {
    return this.http.post(
      `${this.api}/instructor/publishGradesByExam/${eId}/${pub}`,
      ''
    );
  }

  public getGradesList(cId: string) {
    return this.http.get(
      `${this.api}/instructor/getCourseExamsGradeListForInstructor/${cId}`
    );
  }
}
