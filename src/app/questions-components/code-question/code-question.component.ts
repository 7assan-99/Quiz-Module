import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as ace from 'ace-builds';
import { ConfirmSubmitComponent } from 'src/app/DIalogs/confirm-submit/confirm-submit.component';
import { QuestionService } from 'src/app/Services/question.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-code-question',
  templateUrl: './code-question.component.html',
  styleUrls: ['./code-question.component.scss'],
})
export class CodeQuestionComponent implements OnInit, AfterViewInit {
  @Input() question: any;
  @Input() id: number;
  @Input() questionsLength: number;
  @Output() nextQ = new EventEmitter();
  @Output() submitExam = new EventEmitter();

  examAttemptId: string

  code: string;
  codePath: any;
  answerCode: string;
  @ViewChild('editor') private editorEl: ElementRef<HTMLElement>;

  constructor(
    private sService: StudentService,
    private qService: QuestionService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ){}

  ngOnInit() {
    this.examAttemptId = this.route.snapshot.paramMap.get('aId') || '';
  }

  ngAfterViewInit(): void {
    //configuring the ace js editor
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    ace.config.set('fontSize', '14px');
    const editor = ace.edit(this.editorEl?.nativeElement);
    editor.setTheme('ace/theme/twilight');
    //setting the language that is used
    editor.session.setMode('ace/mode/javascript');
    //on change function for the code
    editor.on('change', () => {
      //getting the code in the editor and adding the module export at the end
      this.code =
        editor.session.getValue() +`\nmodule.exports=${this.question.functionName}`;
    });
    if (this.question.codeFilePath) {
      console.log(this.question.codeFilePath)
      this.qService.getUserCode(this.question.codeFilePath).subscribe((val: any)=>{
        this.answerCode = val;
        //remove the last line in code which is module.exports
        val = val.replace(/\n.*$/, '');
        editor.session.setValue(val)
      })
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  //upload the test case file to back end
  async uploadFileToBackend(file: any) {
    if(this.code !== '' && this.answerCode !== this.code){
      let formData = new FormData();
      formData.append('file', file);
      await fetch(`http://localhost:3000/question/upload_file/code_attempt`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.errors) {
            alert(data.errors);
          } else {
            this.codePath = data.url;
            this.question.codeFilePath = data.url;
          }
        });
    }
    
  }

  async next() {
    if(this.code !== '' && this.answerCode !== this.code){
      let file = new File(
        [this.code],
        this.question.codeFilePath
          ? this.question.codeFilePath
          : 'code-answer-attempt.js'
      );
      const { Points, ...q } = this.question;
      await this.uploadFileToBackend(file).then(() => {
        q.codeFilePath = this.codePath;
      });
      this.sService
        .sendQuestionResponse(q, this.examAttemptId)
        .subscribe((val) => {
          this.snackBar.open('Response Saved Successfully', 'Dismiss', {
            duration: 2000,
          });
          this.nextQ.emit(++this.id);
          this.answerCode = this.code
        });
    }
    else if(this.answerCode === this.code){
      this.nextQ.emit(++this.id)
    }
  }

  async submit(){
      let d = this.dialog.open(ConfirmSubmitComponent);
      
      d.afterClosed().subscribe(async ({ data }: any) => {
        const { Points, ...q } = this.question;
        if (data) {
          if (data.isConfirmed) {
            //creating a file to be sent to back end
            let file = new File([this.code], 'code-answer-attempt.js');
            //uploading file to backend
            await this.uploadFileToBackend(file).then(() => {
              //getting the file path url from the backend
              q.codeFilePath = this.codePath;
            });
            //saving the response to backend
            this.sService
              .sendQuestionResponse(q, this.examAttemptId)
              .subscribe((val) => {
                this.snackBar.open('Response Saved Successfully', 'Dismiss', {
                  duration: 2000,
                });
                this.submitExam.emit(++this.id);
              });
          }
        }
      });
  }

  prev() {
    this.nextQ.emit(--this.id);
  }
}
