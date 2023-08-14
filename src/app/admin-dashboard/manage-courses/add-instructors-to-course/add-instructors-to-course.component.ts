import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs';
import { CourseService } from 'src/app/Services/course.service';

@Component({
  selector: 'app-add-instructors-to-course',
  templateUrl: './add-instructors-to-course.component.html',
  styleUrls: ['./add-instructors-to-course.component.scss'],
})
export class AddInstructorsToCourseComponent {
  form: any;
  options: any = [];
  isFocused: boolean = false;
  selectedCourse: any;
  courses: any[] = [];

  constructor(private cService: CourseService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    //initialize the form
    this.form = new FormGroup({
      instructor: new FormControl(''),
      course: new FormControl('', Validators.required),
      courseName: new FormControl('', Validators.required),
    });
  }

  instructors: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  //function for the removing the chip data
  remove(s: string): void {
    const index = this.instructors.indexOf(s);

    if (index >= 0) {
      this.instructors.splice(index, 1);
    }
  }

  //on focus of course field
  onFocus() {
    this.isFocused = true;
  }

  //on blur of course field
  onBlur() {
    this.isFocused = false;
  }

  //function for adding the chip when adding instructors
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.instructors.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.form.controls['instructor'].setValue(null);
  }

  //trigerred when data changes in the cours e field
  onChange(event: any) {
    let value: string = event.target.value;
    value = value.trim();
    if (value.length != 0) {
      this.cService.searchCourseByName(value).subscribe((val: any) => {
        this.courses = val;
      });
    }
  }


  // function trigerred on click of the li element for course
  selectCourse(data: any) {
    this.selectedCourse = data;
    this.form.controls['course'].setValue(data.ID);
    this.form.controls['courseName'].setValue(data.Name);
    this.onBlur();
  }


  //function trigerred when the form is submitted
  submit(data: any): any {
    if (this.instructors.length == 0) {
      this.snackBar.open('Enter Instructor ID.', 'Dismiss', {
        duration: 2500,
        panelClass: 'danger-snack-bar',
      });
    } else {
      //check if the value is from the options
      let checkData = this.courses.filter((val) => val.ID == data.course);
      if (checkData.length != 0) {
        this.cService
          .addInstructorsToCourse(this.instructors, data.course)
          .subscribe(() => {
            this.snackBar.open('Instructors added successfully', 'Dismiss', {
              duration: 2500,
              panelClass: 'success-snack-bar',
            });
          });
      }
    }
  }
}
