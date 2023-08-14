import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/Services/student.service';
import { User } from 'src/app/entities/user.entity';
import md5 from 'md5';
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent {
  constructor(private sService: StudentService, private snackBar: MatSnackBar) {}

  form: any;

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.pattern('[0-9]*')])
      ),
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}"),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&_])(?=[^A-Z]*[A-Z]).{8,30}$/
          ),
        ])
      ),
      major: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}"),
        ])
      ),
    });
  }

  create(data: any){
    let u: User = {ID: data.id,Name: data.name, Email: data.email, Password: md5(data.password)}
    this.sService.createStudent(u,data.major).subscribe((val: any)=>{
      this.snackBar.open('Student Created Successfully.', 'Dismiss', {
        duration: 2500,
        panelClass: 'success-snack-bar',
      });
      this.form.reset()
    },()=>{
      this.snackBar.open('Failed to create student.', 'Dismiss', {
        duration: 2500,
        panelClass: 'danger-snack-bar',
      });
    })
  }
}
