import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, Output, Renderer2, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CreateCategoryDialogComponent } from 'src/app/DIalogs/create-category-dialog/create-category-dialog.component';
import { CreateQuestionComponent } from 'src/app/DIalogs/create-question/create-question.component';
import { DeletePromptComponent } from 'src/app/DIalogs/delete-prompt/delete-prompt.component';
import { CategoryService } from 'src/app/Services/category.service';
import { ExamService } from 'src/app/Services/exam.service';
import { QuestionService } from 'src/app/Services/question.service';
import { Category } from 'src/app/entities/category.entity';
import { Exam } from 'src/app/entities/exam.entity';

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.component.html',
  styleUrls: ['./manage-exam.component.scss'],
})
export class ManageExamComponent implements OnInit {
  @ViewChild('accordion', { read: ViewContainerRef, static: false })
  accordion: ViewContainerRef;

  isCreating: boolean = false;
  isEditing: boolean = false;
  totalGrade: number = 0;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cService: CategoryService,
    private eService: ExamService,
    private qService: QuestionService,
    private snackBar: MatSnackBar
  ) {}

  
  questions: any[] = [];
  filteredQuestions: any[]=[];
  currentCategorySize: number = 0;
  categories: Category[] = [];
  exam: Exam;
  examId: string;
  counter: any = 2;

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchData()
    
  }

  //fetching the data
  fetchData(){
    //fetching exam categories
    this.cService.getCategoriesByExam(this.examId).subscribe((val: any) => {
      this.categories = val;
    });
    this.eService.getExam(this.examId).subscribe((val) => {
      this.exam = val;
    });
    this.qService.getQuestionsByExam(this.examId).subscribe((val) => {
      this.questions = val
      this.filteredQuestions = this.questions
      this.calculateTotalGrade()
      this.setCurrentCategorySize(0);
      console.log(val)
    });

  }

  // function for creating category
  createCategory() {
    let d = this.dialog.open(CreateCategoryDialogComponent, {
      data: { id: this.examId, edit: false },
    });

    d.afterClosed().subscribe((val) => {
      if (val) {
        this.categories.push(val.c);
      }
    });
  }

  editCategory(id: number | any) {
    let c: Category = this.categories.filter((val) => val.ID == id)[0];
    let d = this.dialog.open(CreateCategoryDialogComponent, {
      data: { id: this.examId, edit: true, c: c },
    });

    d.afterClosed().subscribe(({ c }) => {
      let ct: Category = c;

      if (c) {
        console.log(ct);
        this.categories = this.categories.map((val: Category) => {
          if (val.ID == id) val = ct;
          return val;
        });
      }
    });
  }

  deleteCategory(id: number | any) {
    const d = this.dialog.open(DeletePromptComponent,{disableClose: true});

    d.afterClosed().subscribe(({ data }: any) => {
      if (data) {
        if (data.isConfirmed == true) {
          this.cService.deleteCategory(id).subscribe(() => {
            this.categories = this.categories.filter((val) => val.ID != id);
          });
        }
      }
    });
  }

  createQuestionForm() {
    this.isCreating = true
  }

  setCurrentCategorySize(id: any){
    if(id==0){
      this.currentCategorySize = this.filteredQuestions.length
    }
    else{
      this.currentCategorySize = this.categories.find((val)=> val.ID == id)?.no_questions_to_appear_in_exam || 0;
    }
  }

  filterByChip(id: any){
    if(id == 0){
      this.filteredQuestions = this.questions
      this.calculateTotalGrade()
      this.setCurrentCategorySize(id)
    }
    else{
      this.filteredQuestions = this.questions.filter((val)=> val.C_ID == id)
      this.calculateTotalGrade()
      this.setCurrentCategorySize(id)
    }
  }

  calculateTotalGrade(){
    this.totalGrade = 0;
    this.filteredQuestions.map((val) => (this.totalGrade += val.Points));
  }

  questionCreated(data: any){
    this.questions.push(data)
    this.filteredQuestions = this.questions
    this.isCreating = false;
  }

  cancelQuestionCreation(data: any){
    this.isCreating = false;
  }

  questionUpdated(data: any){
    this.questions.filter((val)=> val.ID == data.ID,data)
    this.filteredQuestions = this.questions
  }



  deleteQuestion(id: any) {
    this.qService.deleteQuestion(id).subscribe((val)=>{
      this.questions = this.questions.filter((val) => val.ID !== id);
      this.filteredQuestions = this.questions
      this.snackBar.open('Question Deleted Successfully', 'Dismiss', {
        duration: 2500,
        panelClass: 'success-snack-bar',
      });
    },()=>{
      this.snackBar.open('Failed to Delete Question', 'Dismiss', {
        duration: 2500,
        panelClass:'danger-snack-bar'
      });
    })
    
  }
}
