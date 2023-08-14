import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InstructorService } from 'src/app/Services/instructor.service';
import { DeletePromptComponent } from 'src/app/DIalogs/delete-prompt/delete-prompt.component';
import { Instructor } from 'src/app/entities/instructor.entity';
import { EditDialogComponent } from 'src/app/DIalogs/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-view-instructors',
  templateUrl: './view-instructors.component.html',
  styleUrls: ['./view-instructors.component.scss'],
})
export class ViewInstructorsComponent {
  constructor(private iService: InstructorService, private dialog: MatDialog) {}

  data: any[] = [];
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.iService.getInstructors().subscribe((val: Instructor[]) => {
      this.data = val;
      this.dataSource.data = this.data;
    });
  }

  displayedColumns: string[] = ['ID', 'Name', 'Email', 'Speciality', 'Actions'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getFieldById(id: number) {
    return this.data.filter((val: any) => val.ID == id);
  }

  showDialog(id: any) {
    let fieldsData = this.getFieldById(id)[0];
    let data = {...fieldsData,Major: fieldsData.Speciality}
    //TODO: create dialog for edit
    const d = this.dialog.open(EditDialogComponent, {
      data: data,
    });
    d.afterClosed().subscribe((val: any) => {
      if(val){
        fieldsData.Name = val.name;
        fieldsData.Speciality = val.major;
        const {major,...fields} = fieldsData;
        this.iService.updateInstructor(id, fieldsData).subscribe(() => {
          this.data.filter((val) => val.ID == id, { fieldsData });
        });
      }
    });
  
  }

  deleteRecord(id: any) {
    const d = this.dialog.open(DeletePromptComponent, { disableClose: true });
    d.afterClosed().subscribe(({ data }: any) => {
      if (data) {
        if (data.isConfirmed == true) {
          this.iService.deleteInstructor(id).subscribe(() => {
            this.data = this.data.filter((val) => val.ID !== id);
            this.dataSource.data = this.data;
          });
        }
      }
    });
  }
}
