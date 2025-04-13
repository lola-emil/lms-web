import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { SubjectManagementComponent } from './pages/subject-management/subject-management.component';
import { GradeBookComponent } from './pages/grade-book/grade-book.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: TeacherDashboardComponent
  },

  {
    path: "grade-book",
    component: GradeBookComponent
  },

  {
    path: "subject-management",
    component: SubjectManagementComponent
  },

  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
