import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './Styling-modules/Angular-Material/material.module';
import { MdbMaterilaModule } from './Styling-modules/Mdb-Material/mdb-material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { AdminNavComponent } from './admin-dashboard/admin-nav/admin-nav.component';
import { ManageCoursesComponent } from './admin-dashboard/manage-courses/manage-courses.component';
import { ManagestudentsComponent } from './admin-dashboard/managestudents/managestudents.component';
import { CreateCourseComponent } from './admin-dashboard/manage-courses/create-course/create-course.component';
import { ViewCoursesComponent } from './admin-dashboard/manage-courses/view-courses/view-courses.component';
import { TokenInterceptor } from './Guards/token.interceptor';
import { ViewStudentsComponent } from './admin-dashboard/managestudents/view-students/view-students.component';
import { CreateStudentComponent } from './admin-dashboard/managestudents/create-student/create-student.component';
import { ManageInstructorsComponent } from './admin-dashboard/manage-instructors/manage-instructors.component';
import { ViewInstructorsComponent } from './admin-dashboard/manage-instructors/view-instructors/view-instructors.component';
import { CreateInstructorsComponent } from './admin-dashboard/manage-instructors/create-instructors/create-instructors.component';
import { DeletePromptComponent } from './DIalogs/delete-prompt/delete-prompt.component';
import { EditDialogComponent } from './DIalogs/edit-dialog/edit-dialog.component';
import { EditDialogCourseComponent } from './DIalogs/edit-dialog-course/edit-dialog-course.component';
import { ManageAdminsComponent } from './admin-dashboard/manage-admins/manage-admins.component';
import { ViewAdminsComponent } from './admin-dashboard/manage-admins/view-admins/view-admins.component';
import { CreateAdminComponent } from './admin-dashboard/manage-admins/create-admin/create-admin.component';
import { EditDialogAdminComponent } from './DIalogs/edit-dialog-admin/edit-dialog-admin.component';
import { AddStudentsToCourseComponent } from './admin-dashboard/manage-courses/add-students-to-course/add-students-to-course.component';
import { AddInstructorsToCourseComponent } from './admin-dashboard/manage-courses/add-instructors-to-course/add-instructors-to-course.component';
import { InstructorNavComponent } from './instructor-dashboard/instructor-nav/instructor-nav.component';
import { InstructorCoursesComponent } from './instructor-dashboard/instructor-courses/instructor-courses.component';
import { InstructorCourseViewComponent } from './instructor-dashboard/instructor-course-view/instructor-course-view.component';
import { CourseOverviewComponent } from './instructor-dashboard/course-overview/course-overview.component';
import { CreateExamComponent } from './instructor-dashboard/create-exam/create-exam.component';
import { ManageExamComponent } from './instructor-dashboard/manage-exam/manage-exam.component';
import { CreateCategoryDialogComponent } from './DIalogs/create-category-dialog/create-category-dialog.component';
import { CreateQuestionComponent } from './DIalogs/create-question/create-question.component';
import { CustomSelectBoxComponent} from './custom-select-box/custom-select-box.component';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';
import { StudentCoursesComponent } from './student-dashboard/student-courses/student-courses.component';
import { StudentCourseViewComponent } from './student-dashboard/student-course-view/student-course-view.component';
import { TakeExamComponent } from './student-dashboard/take-exam/take-exam.component';
import { ExamAttemptComponent } from './student-dashboard/exam-attempt/exam-attempt.component';
import { McqQuestionComponent } from './questions-components/mcq-question/mcq-question.component';
import { SaQuestionComponent } from './questions-components/sa-question/sa-question.component';
import { ConfirmSubmitComponent } from './DIalogs/confirm-submit/confirm-submit.component';
import { CodeQuestionComponent } from './questions-components/code-question/code-question.component';
import { StudentResultListComponent } from './student-dashboard/student-result-list/student-result-list.component';
import { ExamsListComponent } from './instructor-dashboard/exams-list/exams-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    InstructorDashboardComponent,
    AdminNavComponent,
    ManageCoursesComponent,
    ManagestudentsComponent,
    CreateCourseComponent,
    ViewCoursesComponent,
    ViewStudentsComponent,
    CreateStudentComponent,
    ManageInstructorsComponent,
    ViewInstructorsComponent,
    CreateInstructorsComponent,
    DeletePromptComponent,
    EditDialogComponent,
    EditDialogCourseComponent,
    ManageAdminsComponent,
    ViewAdminsComponent,
    CreateAdminComponent,
    EditDialogAdminComponent,
    AddStudentsToCourseComponent,
    AddInstructorsToCourseComponent,
    InstructorNavComponent,
    InstructorCoursesComponent,
    InstructorCourseViewComponent,
    CourseOverviewComponent,
    CreateExamComponent,
    ManageExamComponent,
    CreateCategoryDialogComponent,
    CreateQuestionComponent,
    CustomSelectBoxComponent,
    ClickedOutsideDirective,
    StudentCoursesComponent,
    StudentCourseViewComponent,
    TakeExamComponent,
    ExamAttemptComponent,
    McqQuestionComponent,
    SaQuestionComponent,
    ConfirmSubmitComponent,
    CodeQuestionComponent,
    StudentResultListComponent,
    ExamsListComponent
  ],
  entryComponents:[
    CreateQuestionComponent,
    CustomSelectBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MdbMaterilaModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['localhost:3000'],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
