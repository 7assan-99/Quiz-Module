import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CourseIdService } from 'src/app/Services/course-id.service';
import { ExamService } from 'src/app/Services/exam.service';
import { Exam } from 'src/app/entities/exam.entity';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DeletePromptComponent } from 'src/app/DIalogs/delete-prompt/delete-prompt.component';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss'],
})
export class CreateExamComponent implements OnInit, OnDestroy {
  form: any;
  courseId: string;
  subscription: Subscription;
  canCreate: Boolean = false;
  startTime: string;
  endTime: string;
  currentExam: Exam = {} as Exam;
  editExam: boolean = false

  isGradesPublished: boolean = false;

  alreadyExamExist: boolean = false;

  constructor(
    private cIdService: CourseIdService,
    private eService: ExamService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //creating form group
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      timeToStart: new FormControl('', Validators.required),
      timeToEnd: new FormControl('', Validators.required),
      timeToAttempt: new FormControl('', Validators.required),
      attempts: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      qbName: new FormControl('', Validators.required),
    });
    //get the course id
    this.subscription = this.cIdService.getCourseId().subscribe((val) => {
      this.courseId = val;
    });
    //check if user can create Exam
    this.eService.canCreateExam(this.courseId).subscribe(
      (val: Boolean) => {
        this.canCreate = val;
      },
      //on error
      () => {},
      //on complete
      () => {
        //check if exam cannot be created to fetch
        if (!this.canCreate) {
          this.eService
            .getCurrentExamByCourse(this.courseId)
            .subscribe((val: any) => {
              this.currentExam = val[0];
              //changing format of time
              this.startTime = moment(
                this.currentExam.TimeToStart,
                'YYYY-MM-DDTHH:mm:ss'
              ).add(3,'hours').format('DD MMM YYYY HH:mm');

              //changing format of time
              this.endTime = moment(
                this.currentExam.TimeToEnd,
                'YYYY-MM-DDTHH:mm:ss'
              )
                .add(3, 'hours')
                .format('DD MMM YYYY HH:mm');
            });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(data: any) {
    //creating exam object
    let e: Exam = {
      Course_ID: this.courseId,
      Description: data.description,
      TimeToStart: data.timeToStart,
      TimeToEnd: data.timeToEnd,
      TimeToAttempt: data.timeToAttempt,
      NoOfAttempts: data.attempts,
      Grade: data.grade,
      Title: data.title,
    };

    //creating exam
    this.eService.createExam(e, data.qbName).subscribe(
      (val) => {
        this.snackBar.open('Exam Created Successfully', 'Dismiss', {
          duration: 2500,
        });
        this.ngOnInit();
      },
      (err) => {
        this.snackBar.open(
          "Can't create exam. There is already an exam created and not finished yet.",
          'Dismiss',
          {
            duration: 3500,
          }
        );
      }
    );
  }
  onChange(event: any) {
    let target = event.target.checked;
    this.eService.publishExam(this.currentExam.ID || '', target).subscribe(()=>{
      this.snackBar.open(target ? 'Exam Published Successfully' :'Exam Hided Successfully','Dismiss',{duration: 2500})
    })
  }
  prepareFormForEdit(){
    let ce = this.currentExam
    ce.TimeToStart = new Date(moment(this.currentExam.TimeToStart).add(3,'h').toString())
    ce.TimeToEnd = new Date(
      moment(this.currentExam.TimeToEnd).add(3, 'h').toString()
    );
    this.form.setValue({
      title: ce.Title,
      description: ce.Description,
      timeToStart: ce.TimeToStart.toISOString().substring(0, 16),
      timeToEnd: ce.TimeToEnd.toISOString().substring(0, 16),
      timeToAttempt: ce.TimeToAttempt,
      attempts: ce.NoOfAttempts,
      grade: ce.Grade,
      qbName: ' ',
    });
  }

  editExamForm(data: any){
    let e: Exam = {
      ID: this.currentExam.ID,
      Course_ID: this.courseId,
      Description: data.description,
      TimeToStart: data.timeToStart,
      TimeToEnd: data.timeToEnd,
      TimeToAttempt: data.timeToAttempt,
      NoOfAttempts: data.attempts,
      Grade: data.grade,
      Title: data.title,
      QuestionBank: this.currentExam.QuestionBank
    };
    console.log(e)
    this.eService.updateExam(e).subscribe((val)=>{
      this.snackBar.open('Exam Edited Successfully', 'Dismiss', {
        duration: 2500,
        panelClass: 'success-snack-bar',
      });
      this.editExam = false
      this.currentExam = e
    },()=>{
      this.snackBar.open('Failed To Edit Exam', 'Dismiss', {
        duration: 2500,
        panelClass: 'danger-snack-bar',
      });
    })
  }

  enableEditExam(){
    this.prepareFormForEdit()
    this.editExam = true;
  }

  delete(id: any) {
    let d = this.dialog.open(DeletePromptComponent);

    d.afterClosed().subscribe(({ data }) => {
      if (data) {
        if (data.isConfirmed) {
          this.eService.deleteExam(id).subscribe(
            () => {
              this.snackBar.open('Exam Deleted Successfully.', 'Dismiss', {
                duration: 2500,
              });
              this.ngOnInit();
            },
            () => {
              this.snackBar.open('Dailed To Delete Exam.', 'Dismiss', {
                duration: 2500,
              });
            }
          );
        }
      }
    });
  }
}
