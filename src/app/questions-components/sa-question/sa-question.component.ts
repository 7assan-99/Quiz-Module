import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmSubmitComponent } from 'src/app/DIalogs/confirm-submit/confirm-submit.component';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-sa-question',
  templateUrl: './sa-question.component.html',
  styleUrls: ['./sa-question.component.scss'],
})
export class SaQuestionComponent implements OnInit {
  @Input() question: any;
  @Input() id: any;
  @Input() questionsLength: number;
  @Output() nextQ = new EventEmitter();
  @Output() submitExam = new EventEmitter();

  examAttemptId: string;
  currentAnswer: string;

  saForm: any;
  constructor(
    private sService: StudentService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.examAttemptId = this.route.snapshot.paramMap.get('aId') || '';
    this.saForm = new FormGroup({
      answer: new FormControl(
        this.question.Student_Answer ? this.question.Student_Answer.toString().replaceAll("\"","") : '',
        Validators.required
      ),
    });
    this.currentAnswer = this.question.Student_Answer;
  }

  next() {
    this.question.Student_Answer = this.saForm.controls['answer'].value;
    const { Points, ...q } = this.question;
    if(this.currentAnswer !== this.question.Student_Answer){
      this.sService
        .sendQuestionResponse(q, this.examAttemptId)
        .subscribe((val) => {
          this.snackBar.open('Response Saved Successfully', 'Dismiss', {
            duration: 2000,
          });
          this.currentAnswer = this.question.Student_Answer;
          this.nextQ.emit(++this.id);
        });
    }
    else{
      this.nextQ.emit(++this.id)
    }
  }

  prev() {
    this.nextQ.emit(--this.id);
  }

  submit() {
    let d = this.dialog.open(ConfirmSubmitComponent)
    this.question.Student_Answer = this.saForm.controls['answer'].value;
    const { Points, ...q } = this.question;
    d.afterClosed().subscribe(({data}: any)=>{
      if(data){
        if(data.isConfirmed){
          //sending the user response to backend to be saved
           this.sService
             .sendQuestionResponse(q, this.examAttemptId)
             .subscribe((val) => {
               this.snackBar.open('Response Saved Successfully', 'Dismiss', {
                 duration: 2000,
               });
               this.submitExam.emit(true);
             });
          
        }
      }
    })
    
  }
}
