import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog-course',
  templateUrl: './edit-dialog-course.component.html',
  styleUrls: ['./edit-dialog-course.component.scss'],
})
export class EditDialogCourseComponent {
  form: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditDialogCourseComponent>
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ),
      description: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
        ])
      ),
    });
    this.form.setValue({ name: this.data.Name, description: this.data.Description });
  }

  confirm(data: any) {
    this.dialogRef.close({ name: data.name, description: data.description });
  }
}
