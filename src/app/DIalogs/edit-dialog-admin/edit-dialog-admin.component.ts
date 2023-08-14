import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog-admin',
  templateUrl: './edit-dialog-admin.component.html',
  styleUrls: ['./edit-dialog-admin.component.scss'],
})
export class EditDialogAdminComponent {
  form: any;
  isMasterAdmin: Boolean=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditDialogAdminComponent>
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ])
      ),
      isMasterAdmin: new FormControl(false, Validators.required),
    });
    this.form.setValue({
      name: this.data.Name,
      isMasterAdmin: this.data.isMasterAdmin,
    });
    this.isMasterAdmin = this.data.isMasterAdmin
  }

  confirm(data: any) {
    this.dialogRef.close({
      name: data.name,
      isMasterAdmin: data.isMasterAdmin,
    });
  }

  onChange(event: any) {
    let target = event.target.checked;
    this.form.controls['isMasterAdmin'].setValue(target);
  }
}
