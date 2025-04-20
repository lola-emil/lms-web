import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { SubjectManagementComponent } from './pages/subject-management/subject-management.component';
import { GradebookComponent } from './pages/gradebook/gradebook.component';
import { SubjectDetailComponent } from './pages/subject-detail/subject-detail.component';
import { SubjectDetailLessonListComponent } from './fragments/subject-detail-lesson-list/subject-detail-lesson-list.component';
import { ActivitiesAndAssignmentsComponent } from './fragments/activities-and-assignments/activities-and-assignments.component';
import { SubjectDetailStudentsComponent } from './fragments/subject-detail-students/subject-detail-students.component';
import { AddMaterialPageComponent } from './pages/add-material-page/add-material-page.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: TeacherDashboardComponent
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },

  {
    path: "subject-management",
    component: SubjectManagementComponent
  },
  {
    path: "subject-management/subject-detail/:id/add-material",
    component: AddMaterialPageComponent
  },
  {
    path: "subject-management/subject-detail/:id",
    component: SubjectDetailComponent,
    children: [
      {
        path: "lessons",
        component: SubjectDetailLessonListComponent
      },
      {
        path: "",
        redirectTo: "lessons",
        pathMatch: "full"
      },
      {
        path: "activities-and-assignments",
        component: ActivitiesAndAssignmentsComponent
      },
      {
        path: "students",
        component: SubjectDetailStudentsComponent
      }
    ]
  },
  {
    path: "gradebook",
    component: GradebookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
