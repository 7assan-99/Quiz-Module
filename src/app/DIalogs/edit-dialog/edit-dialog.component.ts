import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit{
  
  form: any;
  constructor(@Inject(MAT_DIALOG_DATA)private data: any, private dialogRef: MatDialogRef<EditDialogComponent>){
    
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}"),
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
    this.form.setValue({name: this.data.Name,major: this.data.Major});
  }

  confirm(data: any){
    this.dialogRef.close({name: data.name,major: data.major})
  }

}
