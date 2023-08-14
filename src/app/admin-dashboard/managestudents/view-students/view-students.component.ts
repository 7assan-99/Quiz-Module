import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/Services/student.service';
import { Student } from 'src/app/entities/student.entity';
import { MatDialog } from '@angular/material/dialog';
import { DeletePromptComponent } from 'src/app/DIalogs/delete-prompt/delete-prompt.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDialogComponent} from 'src/app/DIalogs/edit-dialog/edit-dialog.component';
@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss'],
})
export class ViewStudentsComponent implements OnInit {
  constructor(private sService: StudentService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  data: any[]=[];
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.sService.getStudents().subscribe((val: Student[]) => {
      this.data = val;
      this.dataSource.data = this.data;
    });
  }

  displayedColumns: string[] = [
    'ID',
    'Name',
    'Email',
    'Major',
    'Actions',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFieldById(id: number){
    return this.data.filter((val: any)=> val.ID == id);
  }

  showDialog(id: any) {
    let fieldsData = this.getFieldById(id)[0];
    //TODO: create dialog for edit
    const d = this.dialog.open(EditDialogComponent,{data: fieldsData})
    d.afterClosed().subscribe((val: any)=>{
      
      if(val){
        fieldsData.Name = val.name;
        fieldsData.Major = val.major;
        this.sService.updateStudent(id, fieldsData).subscribe(() => {
          this.data.filter((val) => val.ID == id, { fieldsData });
        });
      }
      
    })
  }


  deleteRecord(id:any){
    const d = this.dialog.open(DeletePromptComponent,{disableClose: true});
    d.afterClosed().subscribe(({data}: any)=>{
      if(data){
        if (data.isConfirmed == true) {
         this.sService.deleteStudent(id).subscribe(()=>{
          this.data = this.data.filter((val)=> val.ID !== id)
          this.dataSource.data = this.data
         })
        }
      }
    })
  }
}
