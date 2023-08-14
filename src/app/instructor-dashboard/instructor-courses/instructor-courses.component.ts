import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourseService } from 'src/app/Services/course.service';
import { Course } from 'src/app/entities/course.entity';
import * as moment from 'moment'
import { ChangeTimeToTextFormat } from 'src/app/Utils/changeTimeFormat';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit{
  
  courses: any

  constructor(private cService: CourseService){}

  ngOnInit(): void {
    this.cService.getCoursesByInstructor().subscribe((val: any)=> {
      this.courses = ChangeTimeToTextFormat(val)
    })
  }

}
