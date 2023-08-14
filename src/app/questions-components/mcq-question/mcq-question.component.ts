import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmSubmitComponent } from 'src/app/DIalogs/confirm-submit/confirm-submit.component';
import { StudentService } from 'src/app/Services/student.service';
import { Question } from 'src/app/entities/question.entity';

@Component({
  selector: 'app-mcq-question',
  templateUrl: './mcq-question.component.html',
  styleUrls: ['./mcq-question.component.scss']
})
export class McqQuestionComponent implements OnInit{
  
  mcqForm: any;

  @Input() question: any
  @Input() id: number;
  @Input() questionsLength: number;
  @Output() nextQ = new EventEmitter();
  @Output() submitExam = new EventEmitter();

  examAttemptId: string;
  currentAnswer: number;
  constructor(
    private fb: FormBuilder,
    private sService: StudentService,
    private route : ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog  
  ){}
  
  ngOnInit(): void {
    this.examAttemptId = this.route.snapshot.paramMap.get('aId') || ''
    this.mcqForm = new FormGroup({
      options: new FormArray([]),
      answer: new FormControl(this.question.Student_Answer ? parseInt(this.question.Student_Answer) : '',[Validators.required])
    })
    this.buildOptions()
    this.currentAnswer = this.mcqForm.controls['answer'].value;
  }

  get optionsForm(){
    return this.mcqForm.get('options') as FormArray
  }

  buildOptions(){
    let opts: any[] = Object.values(<any>this.question.Choices)
    opts.forEach((val,i)=>{
      this.optionsForm.push(this.fb.control(val))
      this.optionsForm.get(i.toString())?.addValidators(Validators.required)
    })
  }

  next(){
    this.question.Student_Answer = this.mcqForm.controls['answer'].value;
    const {Points,...q} = this.question;
    if(this.currentAnswer !== this.question.Student_Answer){
      this.sService
        .sendQuestionResponse(q, this.examAttemptId)
        .subscribe((val) => {
          this.snackBar.open('Response Saved Successfully', 'Dismiss', {
            duration: 2000,
          });
          this.currentAnswer = this.mcqForm.controls['answer'].value;
          this.nextQ.emit(++this.id);
        });
    }
    else{
      this.nextQ.emit(++this.id);
    }
  }

  prev(){
    this.nextQ.emit(--this.id);
  }
  onChange(data: any){
    this.mcqForm.controls['answer'].setValue(data)
  }

  submit(){
    let d = this.dialog.open(ConfirmSubmitComponent);
    d.afterClosed().subscribe(({ data }: any) => {
      if (data) {
        if (data.isConfirmed) {
          this.question.Student_Answer = this.mcqForm.controls['answer'].value;
          const { Points, ...q } = this.question;
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
    });
  }
}
