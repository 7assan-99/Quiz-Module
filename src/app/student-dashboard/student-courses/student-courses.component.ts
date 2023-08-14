import { Component } from '@angular/core';
import { CourseService } from 'src/app/Services/course.service';
import { ChangeTimeToTextFormat } from 'src/app/Utils/changeTimeFormat';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.scss'],
})
export class StudentCoursesComponent {
  courses: any;

  constructor(private cService: CourseService) {}

  ngOnInit(): void {
    this.cService.getCoursesByStudent().subscribe((val: any) => {
      this.courses = ChangeTimeToTextFormat(val);
    });
  }
}
