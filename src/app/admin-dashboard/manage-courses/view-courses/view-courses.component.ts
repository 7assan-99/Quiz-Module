import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table'
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../entities/course.entity';
import { MatDialog } from '@angular/material/dialog';
import { DeletePromptComponent } from 'src/app/DIalogs/delete-prompt/delete-prompt.component';
import { EditDialogCourseComponent } from 'src/app/DIalogs/edit-dialog-course/edit-dialog-course.component';
@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss'],
})
export class ViewCoursesComponent implements OnInit {
  constructor(private cService: CourseService, private dialog: MatDialog) {}

  data: any[] = [];
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.cService.getCourses().subscribe((val: Course[]) => {
      this.data = val;
      this.dataSource.data = this.data;
    });
  }

  displayedColumns: string[] = [
    'Name',
    'Description',
    'Created_By',
    'Created_On',
    'Actions',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCourseById(id:any){
    return this.data.filter((val)=> val.ID == id)
  }

  showDialog(id: any) {
    
    let datafields: any = this.getCourseById(id)[0];
    
    let d = this.dialog.open(EditDialogCourseComponent,{data: datafields});

    d.afterClosed().subscribe((val)=>{
      if(val){
        datafields.Name = val.name
        datafields.Description = val.description
      }
    })
  }

  deleteRecord(id: any) {
    const d = this.dialog.open(DeletePromptComponent, { disableClose: true });
    d.afterClosed().subscribe(({ data }: any) => {
      if (data) {
        if (data.isConfirmed == true) {
          this.cService.deleteCourse(id).subscribe(() => {
            this.data = this.data.filter((val) => val.ID !== id);
            this.dataSource.data = this.data;
          });
        }
      }
    });
  }
}
