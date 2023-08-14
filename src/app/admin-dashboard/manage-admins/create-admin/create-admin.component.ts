import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/Services/admin.service';
import { User } from 'src/app/entities/user.entity';
import md5 from 'md5'
@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss'],
})
export class CreateAdminComponent {
  constructor(
    private aService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  form: any;
  isChecked: any;
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
      isMasterAdmin: new FormControl(
        false,
        Validators.required
        )
    });
  }

  onChange(event: any){
   let target = event.target.checked
   this.form.controls['isMasterAdmin'].setValue(target)
  }

  create(data: any) {
    let u: User = {
      ID: data.id,
      Name: data.name,
      Email: data.email,
      Password: md5(data.password),
    };
    this.aService.createAdmin(u, data.isMasterAdmin).subscribe(
      (val: any) => {
        this.snackBar.open('Admin Created Successfully.', 'Dismiss', {
          duration: 2500,
          panelClass: 'success-snack-bar',
        });
        this.form.reset();
      },
      () => {
        this.snackBar.open('Failed to create admin.', 'Dismiss', {
          duration: 2500,
          panelClass: 'danger-snack-bar',
        });
      }
    );
  }
}
