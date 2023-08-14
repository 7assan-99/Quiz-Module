import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../entities/course.entity';
import { API_URL } from '../api';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  API = API_URL;

  public createCourse(c: Course) {
    return this.http.post<Course>(`${this.API}/course/create`, c);
  }

  public getCourses() {
    return this.http.get<Course[]>(`${this.API}/course`);
  }

  public deleteCourse(id: number) {
    return this.http.delete(`${this.API}/course/delete/${id}`);
  }

  public updateCourse(id: number, c: any) {
    return this.http.put(`${this.API}/course/update/${id}`, c);
  }

  public searchCourseByName(q: string) {
    return this.http.get(`${this.API}/course/searchCourseName/${q}`);
  }

  public addStudentsToCourse(students: any[], courseId: string) {
    return this.http.post(
      `${this.API}/course/addStudentsToCourse/${courseId}`,
      students
    );
  }

  public addInstructorsToCourse(instructors: any[], courseId: string) {
    return this.http.post(
      `${this.API}/course/addInstructorsToCourse/${courseId}`,
      instructors
    );
  }

  public getCoursesByInstructor() {
    return this.http.get(`${this.API}/course/getCoursesByInstructor`);
  }

  public getCoursesByStudent() {
    return this.http.get(`${this.API}/course/getCoursesByStudent`);
  }

  public getCourse(id: string) {
    return this.http.get<Course>(`${this.API}/course/${id}`);
  }
}
