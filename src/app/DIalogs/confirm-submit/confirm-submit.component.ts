import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-submit',
  templateUrl: './confirm-submit.component.html',
  styleUrls: ['./confirm-submit.component.scss']
})
export class ConfirmSubmitComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmSubmitComponent>) {}
  confirm(){
    this.dialogRef.close({data:{isConfirmed: true}})
  }

  cancel(){
    this.dialogRef.close({data:{isConfirmed: false}})
  }
}
