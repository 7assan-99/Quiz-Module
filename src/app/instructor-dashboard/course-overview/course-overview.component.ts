import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseIdService } from 'src/app/Services/course-id.service';
import { CourseService } from 'src/app/Services/course.service';
import { Course } from 'src/app/entities/course.entity';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss'],
})
export class CourseOverviewComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cIdService: CourseIdService,
    private cService: CourseService
  ) {}

  id: string = '';
  course: Course = {} as Course
  ngOnInit() {
    this.subscription =  this.cIdService.getCourseId().subscribe((val)=>{
      this.id = val
    })
    this.cService.getCourse(this.id).subscribe((val: Course)=> this.course = val)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
