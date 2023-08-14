import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-delete-prompt',
  templateUrl: './delete-prompt.component.html',
  styleUrls: ['./delete-prompt.component.scss']
})
export class DeletePromptComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeletePromptComponent>) {}
  confirm(){
    this.dialogRef.close({data:{isConfirmed: true}})
  }

  cancel(){
    this.dialogRef.close({data:{isConfirmed: false}})
  }


}
