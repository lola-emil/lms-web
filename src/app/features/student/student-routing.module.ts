import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent as StudentDashboardComponent } from './pages/dashboard/dashboard.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { CourseComponent } from './pages/course/course.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LecturesComponent } from './pages/lectures/lectures.component';
import { LiveSessionComponent } from './pages/live-session/live-session.component';
import { ProgressAndReportComponent } from './pages/progress-and-report/progress-and-report.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { ForumComponent } from './pages/forum/forum.component';
import { LectureContentComponent } from './pages/lecture-content/lecture-content.component';


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
        component: LecturesComponent,
      },
      {
        path: "forum",
        component: ForumComponent
      },
      {
        path: "activities",
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
    path: "courses/:id/lectures/:id",
    component: LectureContentComponent
  },

  {
    path: "schedules",
    component: SchedulesComponent,

  },

  {
    path: "announcements",
    component: AnnouncementsComponent
  },

  {
    path: "forums",
    component: ForumComponent
  }

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
