import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CourseIdService } from 'src/app/Services/course-id.service';
import { ExamService } from 'src/app/Services/exam.service';
import { ChangeDateFormat } from 'src/app/Utils/changeTimeFormat';

@Component({
  selector: 'app-student-result-list',
  templateUrl: './student-result-list.component.html',
  styleUrls: ['./student-result-list.component.scss'],
})
export class StudentResultListComponent {
  constructor(private eService: ExamService,private cIdService: CourseIdService){}

  data: any[] = [];
  dataSource = new MatTableDataSource();
  isLoading: boolean = true
  ngOnInit(): void {
    let cId: string='';
    this.cIdService.getCourseId().subscribe((val)=>{
        cId = val
    })
    this.eService.getCourseExamGradeListByStudent(cId).subscribe((val: any) => {
      this.data = val;
      this.data.forEach((val)=>{
        val.StartTime = ChangeDateFormat(val.StartTime)
        val.FinishTime = ChangeDateFormat(val.FinishTime)
      })
      this.dataSource.data = this.data;
      this.isLoading = false
    });
  }

  displayedColumns: string[] = ['Title', 'StartTime', 'FinishTime', 'Score'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getFieldById(id: number) {
    return this.data.filter((val: any) => val.ID == id);
  }
}
