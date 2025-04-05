import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailsPageComponent } from './pages/course-details-page/course-details-page.component';
import { EventsAndSchedulesPageComponent } from './pages/events-and-schedules-page/events-and-schedules-page.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { LessonContentPageComponent } from './pages/lesson-content-page/lesson-content-page.component';

const routes: Routes = [
  {
    path: "",
    component: StudentDashboardComponent,
  },
  {
    path: "courses",
    component: CoursesComponent
  },
  {
    path: "courses/:id",
    component: CourseDetailsPageComponent
  },
  {
    path: "calendar",
    component: EventsAndSchedulesPageComponent
  },

  // MGA TEMPORARY LANG USA FOR DESIGN
  {
    path: "quiz",
    component: QuizComponent
  },
  {
    path: "lesson-content",
    component: LessonContentPageComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
