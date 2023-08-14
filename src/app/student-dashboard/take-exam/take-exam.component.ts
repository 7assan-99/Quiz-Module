import { Component, OnInit } from '@angular/core';
import { CourseIdService } from 'src/app/Services/course-id.service';
import { ExamService } from 'src/app/Services/exam.service';
import { Exam } from 'src/app/entities/exam.entity';
import * as moment from 'moment'
import { canTakeExam } from 'src/app/Utils/canTakeExam';
import { StudentService } from 'src/app/Services/student.service';
import { Exam_Attempt } from 'src/app/entities/exam_attempt.entity';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.scss'],
})
export class TakeExamComponent implements OnInit {
  constructor(
    private cIdService: CourseIdService,
    private eService: ExamService,
    private sService: StudentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  exam: Exam = {} as Exam;
  startTime: string;
  endTime: string;
  canAttempt: boolean = false;
  onGoingAttempt:any;
  
  ngOnInit() {
    let c: string = '';
    this.cIdService.getCourseId().subscribe((val) => {
      c = val;
    });

    this.eService.getCurrentExamByCourseForStudent(c).subscribe((val: any) => {
      this.exam = val[0];
      if(this.exam){
        let st = moment(this.exam.TimeToStart, 'YYYY-MM-DDTHH:mm:ss');
        st.add(3, 'h');

        //changing format of time
        this.startTime = st.format('DD MMM YYYY HH:mm');

        let et = moment(this.exam.TimeToEnd, 'YYYY-MM-DDTHH:mm:ss');
        et.add(3, 'h');
        //changing format of time
        this.endTime = et.format('DD MMM YYYY HH:mm');
      }
    },()=>{},
      ()=>{
        if(this.exam)
          this.canTake()
        this.getOngoingAttempt();
      }
    );
    
  }

  canTake(){
    this.canAttempt = canTakeExam(this.exam)
  }

  createAttempt(){
    this.sService.createExamAttempt(<string>this.exam.ID).subscribe((val: any)=>{
      setTimeout(()=>{
        this.router.navigate(['/sd/exam/attempt/', val.identifiers[0].ID]);
      },3000)
      
    },({error}: any)=>{
      this.snackBar.open(error.message, 'Dismiss', {
        duration: 2500,
        panelClass: 'danger-snack-bar',
      });
    })
  }

  getOngoingAttempt(){
    this.sService.getOnGoingAttempt(<string>this.exam.ID).subscribe((val: any)=>{
      this.onGoingAttempt = val
    })
  }
  
}
