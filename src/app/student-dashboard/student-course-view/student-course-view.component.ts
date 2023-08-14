import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseIdService } from 'src/app/Services/course-id.service';
import { CourseService } from 'src/app/Services/course.service';
import { Course } from 'src/app/entities/course.entity';

@Component({
  selector: 'app-student-course-view',
  templateUrl: './student-course-view.component.html',
  styleUrls: ['./student-course-view.component.scss'],
})
export class StudentCourseViewComponent {
  constructor(
    private route: ActivatedRoute,
    private cService: CourseService,
    private cIdService: CourseIdService
  ) {}

  ///initialize course object
  course: Course = {} as Course;

  ngOnInit(): void {
    let id: any = this.route.snapshot.paramMap.get('id');
    this.cService.getCourse(id).subscribe((val: any) => (this.course = val));
    this.cIdService.setCourseId(id);
  }
}
