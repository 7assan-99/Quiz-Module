import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseIdService } from 'src/app/Services/course-id.service';
import { CourseService } from 'src/app/Services/course.service';
import { Course } from 'src/app/entities/course.entity';

@Component({
  selector: 'app-instructor-course-view',
  templateUrl: './instructor-course-view.component.html',
  styleUrls: ['./instructor-course-view.component.scss'],
})
export class InstructorCourseViewComponent implements OnInit{
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
