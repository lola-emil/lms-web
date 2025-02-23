import { Routes } from '@angular/router';
import { SignInPageComponent } from './features/common/sign-in-page/sign-in-page.component';
import { PageNotFoundComponent } from './features/common/page-not-found/page-not-found.component';
import { ForgotCredentialComponent } from './features/common/forgot-credential/forgot-credential.component';
import { DashboardComponent as StudentDashboardComponent } from './features/student/dashboard/dashboard.component';
import { CourseComponent } from './features/student/course/course.component';
import { ProgressAndReportComponent } from './features/student/progress-and-report/progress-and-report.component';
import { SchedulesComponent } from './features/student/schedules/schedules.component';

export const routes: Routes = [
  {
    path: "",
    component: SignInPageComponent
  },

  {
    path: "forgot-credential",
    component: ForgotCredentialComponent
  },

  {
    path: "student-dashboard",
    component: StudentDashboardComponent
  },

  {
    path: "progress-and-reports",
    component: ProgressAndReportComponent
  },

  {
    path: "course",
    component: CourseComponent
  },

  {
    path: "schedules",
    component: SchedulesComponent
  },

  {
    path: "**",
    component: PageNotFoundComponent
  },
];
