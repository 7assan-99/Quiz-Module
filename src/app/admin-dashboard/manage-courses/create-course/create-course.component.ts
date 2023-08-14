import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../entities/course.entity';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  form: any;

  constructor(private cService: CourseService,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      description: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }

  create(data: any){
    let c: Course = {Name: data.title, Description: data.description}
    this.cService.createCourse(c).subscribe((val: any)=>{
      this.snackBar.open('Course Created Successfully.', 'Dsimiss', {
        duration: 2500,
        panelClass: 'success-snack-bar',
      });
      
    },()=>{
      this.snackBar.open('Failed to create course', 'Dsimiss', {
        duration: 2500,
        panelClass: 'danger-snack-bar',
      });
    })
  }
}
