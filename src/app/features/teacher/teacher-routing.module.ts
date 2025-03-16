import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { GradebookComponent } from "./pages/gradebook/gradebook.component";
import { ScheduleComponent } from "./pages/schedule/schedule.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { CourseComponent } from "./pages/course/course.component";


const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "gradebook",
    component: GradebookComponent
  },
  {
    path: "schedules",
    component: ScheduleComponent
  },
  {
    path: "courses",
    component: CoursesComponent,
  },
   {
      path: "courses/:id",
      component: CourseComponent,
      children: [

      ]
    },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TeacherRoutingModule { }
