import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../common/page-not-found/page-not-found.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { ProgressAndReportComponent } from './progress-and-report/progress-and-report.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { DashboardComponent as StudentDashboardComponent } from './dashboard/dashboard.component';
import { LecturesComponent } from './lectures/lectures.component';
import { ActivitiesComponent } from './activities/activities.component';
import { LiveSessionComponent } from './live-session/live-session.component';

const routes: Routes = [


  {
    path: "dashboard",
    component: StudentDashboardComponent
  },

  {
    path: "progress-and-reports",
    component: ProgressAndReportComponent
  },

  {
    path: "courses",
    component: CoursesComponent,
  },
  {
    path: "courses/:id",
    component: CourseComponent,
    children: [
      {
        path: "lectures",
        component: LecturesComponent
      },
      {
        path: "activities",
        component: ActivitiesComponent
      },
      {
        path: "live-session",
        component: LiveSessionComponent
      },
      {
        path: "",
        redirectTo: "lectures",
        pathMatch: "full"
      }
    ]
  },

  {
    path: "schedules",
    component: SchedulesComponent,

  },

  {
    path: "announcements",
    component: AnnouncementsComponent
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
export class StudentRoutingModule { }
