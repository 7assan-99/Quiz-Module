import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/Services/exam.service';
import { QuestionService } from 'src/app/Services/question.service';
import { Exam_Attempt } from 'src/app/entities/exam_attempt.entity';
import { QuestionType } from 'src/app/entities/question.entity';
import * as moment from 'moment';
import { calculateTimeToEnd } from 'src/app/Utils/canTakeExam';

@Component({
  selector: 'app-exam-attempt',
  templateUrl: './exam-attempt.component.html',
  styleUrls: ['./exam-attempt.component.scss']
})
export class ExamAttemptComponent implements OnInit{

  remainingTime: any;
  examAttemptObj: Exam_Attempt;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qService: QuestionService,
    private eService: ExamService
    ){}
  qType = QuestionType
  examAttempt: string;
  questions: any=[];
  isLoading: boolean = true;
  questionCounter: number=0;

  ngOnInit(): void {
    this.examAttempt = this.route.snapshot.paramMap.get('aId') || '';
    this.eService.getExamAttempt(this.examAttempt).subscribe((val: any)=>{
      this.examAttemptObj = val;
    },()=>{},()=>{
      //calculating time
      var t = moment(this.examAttemptObj.TimeToEnd, 'YYYY-MM-DDTHH:mm:ss')
        .add(3, 'hours')
        .format('YYYY-MM-DDTHH:mm:ss');
      setInterval(() => {
        this.remainingTime = calculateTimeToEnd(t)
        if(this.remainingTime == '00:00'){
          this.submit('ff')
        }
      }, 1000);
    })
    this.qService.getQuestionsByAttempt(this.examAttempt).subscribe((val: any)=>{
      if(val.length !== 0){
        this.questions = val;
      }
      else{
        setTimeout(()=>{
          this.router.navigate(['sd/courses']);
        },5000)
      }
      this.isLoading= false
    })
    
  }

  submit(data: any){
    this.eService.submitExamAttempt(this.examAttempt).subscribe((val)=>{
      this.router.navigate(['sd/courses']);
    })
  }
  

  changeQuestion(data: any){
    this.questionCounter = data
  }
}
