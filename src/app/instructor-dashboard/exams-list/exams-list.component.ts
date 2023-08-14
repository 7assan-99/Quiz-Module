import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CourseIdService } from 'src/app/Services/course-id.service';
import { ExamService } from 'src/app/Services/exam.service';
import { InstructorService } from 'src/app/Services/instructor.service';
import { ChangeDateFormat } from 'src/app/Utils/changeTimeFormat';

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.scss'],
})
export class ExamsListComponent {
  constructor(
    private iService: InstructorService,
    private cIdService: CourseIdService,
    private snackBar: MatSnackBar
  ) {}

  data: any[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    let cId: string = '';
    this.cIdService.getCourseId().subscribe((val) => {
      cId = val;
    });
    this.iService.getGradesList(cId).subscribe((val: any) => {
      this.data = val;

      this.data.forEach((val) => {
        val.forEach((vl: any) => {
          vl.StartTime = ChangeDateFormat(vl.StartTime);
          vl.FinishTime = ChangeDateFormat(vl.FinishTime);
        });
      });
      console.log(this.data.length)
      this.isLoading = false
       console.log(this.data);
    });
   
  }

  onGradePublishChange(event: any,id: any) {
    let target = event.target.checked;
    this.iService
      .publishExamGrades(id,target)
      .subscribe(() => {
        this.snackBar.open(
          target
            ? 'Exam Grades Published Successfully'
            : 'Exam Grades Hided Successfully',
          'Dismiss',
          { duration: 2500, panelClass: 'success-snack-bar' }
        );
      });
  }

  displayedColumns: string[] = [
    'Title',
    'Student_ID',
    'StartTime',
    'FinishTime',
    'Score',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  getFieldById(id: number) {
    return this.data.filter((val: any) => val.ID == id);
  }
}
