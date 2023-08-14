import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/entities/category.entity';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss'],
})
export class CreateCategoryDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private dt: any,
    private snackBar: MatSnackBar,
    private diagRef: MatDialogRef<CreateCategoryDialogComponent>,
    private cService: CategoryService
  ) {}

  form: any;
  isEdit: boolean = false;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      noOfQuestions: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });

    if (this.dt.edit) {
      this.isEdit = true;
      this.form.setValue({
        name: this.dt.c.Name,
        noOfQuestions: this.dt.c.no_questions_to_appear_in_exam,
      });
    }
  }

  create(data: any) {
    let examID = this.dt.id;
    let category: Category = {
      Exam_ID: examID,
      Name: data.name,
      no_questions_to_appear_in_exam: data.noOfQuestions,
    };
    if (this.dt.edit) {
      category.ID = this.dt.c.ID
      //update category
      this.cService.updateCategory(category).subscribe((val)=>{
        this.snackBar.open('Category Edited Successfully', 'Dismiss', {
          duration: 2500,
          panelClass: 'success-snack-bar',
        });
        this.diagRef.close({ c: category });
      },()=>{
        this.snackBar.open('Failed to Edit Category', 'Dismiss', {
          duration: 2500,
          panelClass: 'danger-snack-bar',
        });
      })
      
    } 
    else {
      this.cService.createCategory(category).subscribe((val: any)=>{
        category.ID = val.identifiers[0].ID;
        this.snackBar.open('Category Created Successfully', 'Dismiss', {
          duration: 2500,
          panelClass: 'success-snack-bar',
        });
        this.diagRef.close({ c: category });
      },()=>{
        this.snackBar.open('Failed to Create Category', 'Dismiss', {
          duration: 2500,
          panelClass: 'danger-snack-bar',
        });
      })
    }
  }
}
