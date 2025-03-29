import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailsPageComponent } from './pages/course-details-page/course-details-page.component';
import { EventsAndSchedulesPageComponent } from './pages/events-and-schedules-page/events-and-schedules-page.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },

  {
    path: "signin",
    component: SignInPageComponent
  },

  {
    path: "student-dashboard",
    component: StudentDashboardComponent
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
  {
    path: "forum",
    component: ForumPageComponent
  }
];
