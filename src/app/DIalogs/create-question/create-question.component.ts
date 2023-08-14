import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef,
  ViewChild,
  AfterViewChecked,
  ViewContainerRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from 'src/app/Services/question.service';
import { CustomSelectBoxComponent } from 'src/app/custom-select-box/custom-select-box.component';
import { Category } from 'src/app/entities/category.entity';
import { Exam } from 'src/app/entities/exam.entity';
import { Question, QuestionType } from 'src/app/entities/question.entity';
import { DeletePromptComponent } from '../delete-prompt/delete-prompt.component';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit, AfterViewChecked {
  /*
    for the questions that will be fetched from 
    the backend the isEdit value will be true
  */

  //section for identifying the view container reference
  @ViewChild('questionTypeSelection', { read: ViewContainerRef, static: false })
  qType: ViewContainerRef;
  @ViewChild('qCategory', { read: ViewContainerRef })
  qCategory: ViewContainerRef;

  //declaring the input and output

  /*
    this event will be emitted when the user wants to
    delete question that has already been created
  */
  @Output() delete = new EventEmitter();
  /*
    responsible for clearing the form and hiding the form in 
    case user cancel the creation of question
  */
  @Output() cancelQuestionCreate = new EventEmitter();
  /*this event will be emitted when question has 
    been created successfully in order to push the 
    question to appear inthe accordion
  */
  @Output() questionCreated = new EventEmitter();

  /*this event will be emitted when question has 
    been edited successfully in order to update the 
    question to appear in the accordion
  */
  @Output() questionEdited = new EventEmitter();
  /*
    id that distinguishes the id's of the select boxes and accordion child cards
  */
  @Input() accordionId: string;
  @Input() categoryList: Category[];
  @Input() isEdit: boolean = false;
  @Input() isCreate: boolean = false;
  @Input() e: Exam = {} as Exam;
  @Input() q: any;

  form: any;

  code: any;
  cqType = QuestionType

  list: any = [QuestionType.MCQ, QuestionType.SHORTANSWER, QuestionType.CODE];

  constructor(
    private qService: QuestionService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      questionType: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      options: this.fb.array([]),
      functionName: new FormControl(''),
      codeTestCases: this.fb.array([]),
      answer: this.fb.array([]),
      points: new FormControl('', [Validators.required, Validators.min(1)]),
    });

    //creating selectbox components
    setTimeout(() => {
      //creating custom selectbox component for question type
      const qTypeComponent = this.qType.createComponent(
        CustomSelectBoxComponent
      );
      qTypeComponent.instance.ls = this.list;
      qTypeComponent.instance.id = this.accordionId;
      if (this.q) {
        qTypeComponent.instance.selectedElement = this.q.Question_Type;
      }
      qTypeComponent.instance.selectedOption.subscribe((val) => {
        this.questionTypeSelected(val);
      });

      const qCategoryComponent = this.qCategory.createComponent(
        CustomSelectBoxComponent
      );
      qCategoryComponent.instance.ls = this.categoryList;
      qCategoryComponent.instance.id = this.accordionId + 1;
      if (this.q) {
        let c: string = this.categoryList
          .filter((val) => val.ID == this.q.C_ID)
          .map((val) => val.Name)[0];
        qCategoryComponent.instance.selectedElement = c;
        qCategoryComponent.instance.selectId = this.q.C_ID;
      }
      qCategoryComponent.instance.title = 'Category';
      qCategoryComponent.instance.selectedOption.subscribe((val) => {
        this.categorySelected(val);
      });

      if (this.isEdit) this.prepareFormForEditQuestions();
    }, 0);
  }

  cancelQuestionCreation() {
    this.cancelQuestionCreate.emit(true);
    this.form.reset();
  }

  prepareFormForEditQuestions() {
    this.removeFormControls(this.answerForms)
    this.removeFormControls(this.optionForms)
    this.removeFormControls(this.codeTestForms)
    this.form.get('functionName').removeValidators(Validators.required);
    this.form.setValue({
      name: this.q.Question,
      questionType: this.q.Question_Type,
      category: this.q.C_ID,
      points: this.q.Points,
      functionName: '',
      options: [],
      codeTestCases: [],
      answer: [],
    });
    
    if (this.q.Question_Type == QuestionType.MCQ) {
      let opts: any = this.q.Choices;
      let opt = Object.values(opts);
      //looping through the options to create options forms
      opt.forEach((val, i) => {
        this.optionForms.push(this.fb.control(val));
        this.optionForms.get(i.toString())?.addValidators(Validators.required);
      });
      let ans = Object.values(<any>this.q.Answer);
      this.answerForms.push(this.fb.control(ans[0]));
      this.answerForms
        .get('0')
        ?.addValidators([
          Validators.required,
          Validators.min(0),
          Validators.max(3),
        ]);
    } else if (this.q.Question_Type == QuestionType.SHORTANSWER) {
      let ans = Object.values(<any>this.q.Answer);
      ans.map((val, i) => {
        this.answerForms.push(this.fb.control(val));
        this.answerForms
          .get(i.toString())
          ?.addValidators([Validators.required]);
      });
    }
    else if(this.q.Question_Type === QuestionType.CODE){
      console.log(this.q)
      this.form
        .get('functionName')
        .addValidators(Validators.required);
      this.form.get('functionName').setValue(this.q.functionName)
    }
  }

  //when option is selected from questionType selectBox
  questionTypeSelected(event: any) {
    this.form.controls['questionType'].setValue(event);
    this.createFormControlBasedOnType(event);
  }

  get codeTestForms(){
    return this.form.get('codeTestCases') as FormArray
  }

  //function for getting options from array to access controls
  get optionForms() {
    return this.form.get('options') as FormArray;
  }

  //function for getting answers from array to access controls
  get answerForms() {
    return this.form.get('answer') as FormArray;
  }

  //function for resetting form array
  removeFormControls(form: FormArray) {
    while (form.length !== 0) {
      form.removeAt(0);
    }
  }

  createFormControlBasedOnType(data: any) {
    this.removeFormControls(this.optionForms);
    this.removeFormControls(this.answerForms);
    this.removeFormControls(this.codeTestForms);
    this.form.get('functionName').removeValidators(Validators.required);
    switch (data) {
      case 'mcq':
        //creating 4 options form fields
        for (let i = 0; i < 4; i++) {
          this.optionForms.push(this.fb.control(''));
          this.optionForms
            .get(i.toString())
            ?.addValidators(Validators.required);
        }
        this.answerForms.push(this.fb.control(''));
        this.answerForms
          .get('0')
          ?.addValidators([
            Validators.required,
            Validators.min(0),
            Validators.max(3),
          ]);
        break;

      case 'sa':
        this.answerForms.push(this.fb.control(''));
        this.answerForms.get('0')?.addValidators(Validators.required);
        break;
      
      case 'code':
         this.form.get('functionName').addValidators(Validators.required);
        this.addTestCaseGroup()

    }
  }

  addTestCaseGroup(){
    let formGroup = this.fb.group({
      parameters: this.fb.control('',[Validators.required]),
      expectedOutput: this.fb.control('',[Validators.required])
    })
    this.codeTestForms.push(formGroup)
  }

  //when option is selected from questionType selectBox
  categorySelected(event: any) {
    this.form.controls['category'].setValue(event);
  }

  addShortAnswer() {
    setTimeout(() => {
      let size = this.answerForms.length;
      this.answerForms.push(this.fb.control(''));
      this.answerForms.get(size.toString())?.addValidators(Validators.required);
    }, 0);
  }

  deleteQuestion(el: string) {
    let d = this.dialog.open(DeletePromptComponent);

    d.afterClosed().subscribe(({ data }) => {
      if (data) {
        if (data.isConfirmed) {
          this.delete.emit(el);
        }
      }
    });
  }

  //function for packing the object and returns the object
  async prepareDataObjectToBeSent(data: any) {
    let q: Question = {} as Question;

    q.Question = data.name;
    q.Question_Type = data.questionType;
    q.Points = data.points;
    q.QB_ID = this.e.QuestionBank || '';
    q.C_ID = data.category;

    if(this.isEdit) q.ID = this.accordionId

    switch (data.questionType) {
      case 'mcq':
        q.Choices = {
          0: data.options[0],
          1: data.options[1],
          2: data.options[2],
          3: data.options[3],
        };
        q.Answer = { 0: data.answer[0] };
        break;
      case 'sa':
        let obj: any = {};
        for (let i = 0; i < this.answerForms.length; i++) {
          obj[i] = data.answer[i];
        }
        q.Answer = obj;
        break;
      case 'code':
        q.functionName = this.form.get('functionName').value
        let ob: any ={};
        for(let i=0; i< this.codeTestForms.length;i ++){
          ob[i] = {parameters: data.codeTestCases[i].parameters,expectedOutput: data.codeTestCases[i].expectedOutput}
        }
        await this.uploadFileToBackend(this.createFile(ob)).then(()=>{
          q.testFilePath = this.code;
        })
        
        console.log
        break;
    }
    return q;
  }

  createFile(ob: any){
    let testCase: any= Object.values(ob)
    if(this.isEdit){
      return null
    }
    else{
      let code = `
    const filePath = process.env.npm_config_filePath || '';
    const func = require(filePath);
    `;
      for (let i = 0; i < testCase.length; i++) {
        code += `test('${i}',()=>{
        expect(func(${testCase[i].parameters})).toBe(${testCase[i].expectedOutput})
      });
      `;
      }
      let file = new File(
        [code],
        `code.js`
      );
      return file;
    }
  }

  getToken(){
    return localStorage.getItem('token')
  }

  //function for editing the question
  async edit(data: any) {
    let q = await this.prepareDataObjectToBeSent(data);

    this.qService.updateQuestion(q).subscribe(
      () => {
        this.snackBar.open('Question Updated Successfully', 'Dismiss', {
          duration: 2500,
        });
        this.questionEdited.emit(q)
      },
      () => {
        this.snackBar.open('Failed to Update Question', 'Dismiss', {
          duration: 2500,
        });
      }
    );
  }

  //upload the test case file to back end
  async uploadFileToBackend(file: any){
    let formData = new FormData();
    formData.append('file', file);
    await fetch(`http://localhost:3000/question/upload_file/testCase`, {
      method: 'POST',
      body: formData,
      headers:{
        Authorization: `Bearer ${this.getToken()}`
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          this.code = data.url
        }
      });
  }
  cancelQuestionEdit() {
    this.prepareFormForEditQuestions();
  }

  //function for creating question
  async create(data: any) {
    let q= await this.prepareDataObjectToBeSent(data)

    this.qService.createQuestion(q).subscribe(
      (val: any) => {
        this.snackBar.open('Question Created Successfully.', 'dismiss', {
          duration: 2500,
        });
        this.questionCreated.emit(q);
        this.form.reset();
      },
      () => {
        this.snackBar.open('Failed to Create Question.', 'dismiss', {
          duration: 2500,
        });
      }
    );
  }
}
