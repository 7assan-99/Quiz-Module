import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuardGuard } from './Guards/admin-guard.guard';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentGuard } from './Guards/student.guard';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorGuard } from './Guards/instructor.guard';
import { ManageCoursesComponent } from './admin-dashboard/manage-courses/manage-courses.component';
import { CreateCourseComponent } from './admin-dashboard/manage-courses/create-course/create-course.component';
import { ViewCoursesComponent } from './admin-dashboard/manage-courses/view-courses/view-courses.component';
import { ManagestudentsComponent } from './admin-dashboard/managestudents/managestudents.component';
import { CreateStudentComponent } from './admin-dashboard/managestudents/create-student/create-student.component';
import { ViewStudentsComponent } from './admin-dashboard/managestudents/view-students/view-students.component';
import { ManageInstructorsComponent } from './admin-dashboard/manage-instructors/manage-instructors.component';
import { CreateInstructorsComponent } from './admin-dashboard/manage-instructors/create-instructors/create-instructors.component';
import { ViewInstructorsComponent } from './admin-dashboard/manage-instructors/view-instructors/view-instructors.component';
import { ManageAdminsComponent } from './admin-dashboard/manage-admins/manage-admins.component';
import { CreateAdminComponent } from './admin-dashboard/manage-admins/create-admin/create-admin.component';
import { ViewAdminsComponent } from './admin-dashboard/manage-admins/view-admins/view-admins.component';
import { AddStudentsToCourseComponent } from './admin-dashboard/manage-courses/add-students-to-course/add-students-to-course.component';
import { AddInstructorsToCourseComponent } from './admin-dashboard/manage-courses/add-instructors-to-course/add-instructors-to-course.component';
import { InstructorCoursesComponent } from './instructor-dashboard/instructor-courses/instructor-courses.component';
import { InstructorCourseViewComponent } from './instructor-dashboard/instructor-course-view/instructor-course-view.component';
import { CourseOverviewComponent } from './instructor-dashboard/course-overview/course-overview.component';
import { CreateExamComponent } from './instructor-dashboard/create-exam/create-exam.component';
import { ManageExamComponent } from './instructor-dashboard/manage-exam/manage-exam.component';
import { StudentCoursesComponent } from './student-dashboard/student-courses/student-courses.component';
import { StudentCourseViewComponent } from './student-dashboard/student-course-view/student-course-view.component';
import { TakeExamComponent } from './student-dashboard/take-exam/take-exam.component';
import { ExamAttemptComponent } from './student-dashboard/exam-attempt/exam-attempt.component';
import { StudentResultListComponent } from './student-dashboard/student-result-list/student-result-list.component';
import { ExamsListComponent } from './instructor-dashboard/exams-list/exams-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'ad',
    component: AdminDashboardComponent,
    canActivate: [AdminGuardGuard],
    pathMatch: 'prefix',
    children: [
      {
        path: 'mCourses',
        component: ManageCoursesComponent,
        canActivate: [AdminGuardGuard],
        children: [
          {
            path: 'create',
            component: CreateCourseComponent,
            canActivate: [AdminGuardGuard],
          },
          {
            path: 'view',
            component: ViewCoursesComponent,
            canActivate: [AdminGuardGuard],
          },
          {
            path: 'addStudents',
            component: AddStudentsToCourseComponent,
            canActivate: [AdminGuardGuard],
          },
          {
            path: 'addInstructors',
            component: AddInstructorsToCourseComponent,
            canActivate: [AdminGuardGuard],
          },
          { path: '**', redirectTo: 'view' },
        ],
      },
      {
        path: 'mStudents',
        component: ManagestudentsComponent,
        children: [
          {
            path: 'create',
            component: CreateStudentComponent,
            canActivate: [AdminGuardGuard],
          },
          {
            path: 'view',
            component: ViewStudentsComponent,
            canActivate: [AdminGuardGuard],
          },
          { path: '**', redirectTo: 'view' },
        ],
      },
      {
        path: 'mInstructors',
        component: ManageInstructorsComponent,
        canActivate: [AdminGuardGuard],
        children: [
          {
            path: 'create',
            component: CreateInstructorsComponent,
            canActivate: [AdminGuardGuard],
          },
          {
            path: 'view',
            component: ViewInstructorsComponent,
            canActivate: [AdminGuardGuard],
          },
          { path: '**', redirectTo: 'view' },
        ],
      },
      {
        path: 'mAdmins',
        component: ManageAdminsComponent,
        canActivate: [AdminGuardGuard],
        children: [
          {
            path: 'create',
            component: CreateAdminComponent,
            canActivate: [AdminGuardGuard],
          },
          {
            path: 'view',
            component: ViewAdminsComponent,
            canActivate: [AdminGuardGuard],
          },
          { path: '**', redirectTo: 'view' },
        ],
      },
    ],
  },
  {
    path: 'sd',
    component: StudentDashboardComponent,
    canActivate: [StudentGuard],
    children: [
      {
        path: 'courses',
        component: StudentCoursesComponent,
        canActivate: [StudentGuard],
      },
      {
        path:'course/:id',
        component: StudentCourseViewComponent,
        canActivate: [StudentGuard],
        children:[
          {
            path:'overview',
            component: CourseOverviewComponent,
            canActivate: [StudentGuard]
          },
          {
            path:'takeExam',
            component: TakeExamComponent,
            canActivate:[StudentGuard]
          },{
            path:'result-list',
            component: StudentResultListComponent,
            canActivate: [StudentGuard]
          }
        ]
      },
      {
        path:'exam/attempt/:aId',
        component: ExamAttemptComponent,
        canActivate:[StudentGuard]
      }
    ],
  },
  {
    path: 'id',
    component: InstructorDashboardComponent,
    canActivate: [InstructorGuard],
    children: [
      {
        path: 'courses',
        component: InstructorCoursesComponent,
        canActivate: [InstructorGuard],
      },
      {
        path: 'course/:id',
        component: InstructorCourseViewComponent,
        canActivate: [InstructorGuard],
        children: [
          {
            path: 'overview',
            component: CourseOverviewComponent,
            canActivate: [InstructorGuard],
          },
          {
            path: 'createExam',
            component: CreateExamComponent,
            canActivate: [InstructorGuard],
          },
          {
            path:'exam-grade-list',
            component: ExamsListComponent,
            canActivate: [InstructorGuard]
          }
        ],
      },
      {
        path: 'exam/manage/:id',
        component: ManageExamComponent,
        canActivate: [InstructorGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
