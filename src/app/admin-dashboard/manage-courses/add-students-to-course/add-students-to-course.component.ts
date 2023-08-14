import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { CourseService } from 'src/app/Services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-students-to-course',
  templateUrl: './add-students-to-course.component.html',
  styleUrls: ['./add-students-to-course.component.scss'],
})
export class AddStudentsToCourseComponent implements OnInit {
  
  form: any;
  options: any=[];
  filteredOptions: any;
  isFocused: boolean=false
  selectedCourse: any;
  courses:any[] = [];

  constructor(private cService: CourseService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.form = new FormGroup({
      student: new FormControl(''),
      course: new FormControl('', Validators.required),
      courseName: new FormControl('', Validators.required),
    });
    this.filteredOptions = this.form.controls['course'].valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  students: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  remove(s: string): void {
    const index = this.students.indexOf(s);

    if (index >= 0) {
      this.students.splice(index, 1);
    }
  }

  onFocus(){
    this.isFocused=true
  }

  onBlur(){
    this.isFocused=false
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.students.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.form.controls['student'].setValue(null);
  }

  onChange(event: any){
    
    let value: string = event.target.value;
    value = value.trim();
    if (value.length != 0) {
      this.cService.searchCourseByName(value).subscribe((val: any) => {
        this.courses = val;
      });
    }
    
  }

  selectCourse(data: any){
    this.selectedCourse = data
    this.form.controls['course'].setValue(data.ID)
    this.form.controls['courseName'].setValue(data.Name);
    this.onBlur()
  }

  submit(data: any): any{
    if(this.students.length == 0){
      this.snackBar.open('Enter Student ID.', 'Dismiss', {
        duration: 2500,
        panelClass: 'danger-snack-bar',
      });
    }
    else{
      console.log(this.courses)
      //check if the value is from the options
      let checkData = this.courses.filter((val) => val.ID == data.course);
      if (checkData.length != 0) {
        this.cService.addStudentsToCourse(this.students,data.course).subscribe(()=>{
          this.snackBar.open('Students added successfully', 'Dismiss', {
            duration: 2500,
            panelClass: 'success-snack-bar',
            
          });
        })
      }
    }
    
  }

}
