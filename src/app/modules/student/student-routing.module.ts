import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { GradebookComponent } from './pages/gradebook/gradebook.component';
import { EnrolledSubjectsComponent } from './pages/enrolled-subjects/enrolled-subjects.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: StudentDashboardComponent
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "enrolled-subjects",
    component: EnrolledSubjectsComponent
  },
  {
    path: "grade-book",
    component: GradebookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
