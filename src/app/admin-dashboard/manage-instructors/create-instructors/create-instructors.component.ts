import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstructorService } from 'src/app/Services/instructor.service';
import { User } from 'src/app/entities/user.entity';
import md5 from 'md5';
@Component({
  selector: 'app-create-instructors',
  templateUrl: './create-instructors.component.html',
  styleUrls: ['./create-instructors.component.scss'],
})
export class CreateInstructorsComponent {
  constructor(
    private iService: InstructorService,
    private snackBar: MatSnackBar
  ) {}

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
      speciality: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}"),
        ])
      ),
    });
  }

  create(data: any) {
    let u: User = {
      ID: data.id,
      Name: data.name,
      Email: data.email,
      Password: md5(data.password),
    };
    this.iService.createInstructor(u, data.speciality).subscribe(
      (val: any) => {
        this.snackBar.open('Instructor Created Successfully.', 'Dismiss', {
          duration: 2500,
          panelClass: 'success-snack-bar',
        });
        this.form.reset()
      },
      () => {
        this.snackBar.open('Failed to create instructor.', 'Dismiss', {
          duration: 2500,
          panelClass: 'danger-snack-bar',
        });
      }
    );
  }
}
