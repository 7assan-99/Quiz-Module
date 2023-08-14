import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseIdService {

  private _courseId = new BehaviorSubject<string>('')

  private _courseId$ = this._courseId.asObservable();

  getCourseId(): Observable<string>{
    return this._courseId$;
  }

  setCourseId(id: string){
    return this._courseId.next(id)
  }
}
