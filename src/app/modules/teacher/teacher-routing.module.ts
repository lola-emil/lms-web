import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { SubjectsPageComponent } from './pages/subjects-page/subjects-page.component';
import { TeacherCalendarComponent } from './pages/teacher-calendar/teacher-calendar.component';

const routes: Routes = [
  {
    path: "",
    component: TeacherDashboardComponent
  },
  {
    path: "subjects",
    component: SubjectsPageComponent
  },
  {
    path: "calendar",
    component: TeacherCalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
