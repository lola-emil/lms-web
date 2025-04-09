import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { EnrolledSubjectsComponent } from './pages/enrolled-subjects/enrolled-subjects.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

const routes: Routes = [
  {
    path: "",
    component: StudentDashboardComponent
  },
  {
    path: "subjects",
    component: EnrolledSubjectsComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
