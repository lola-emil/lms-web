import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoadsComponent } from "./pages/loads/loads.component";
import { SubjectDetailComponent } from "./pages/subject-detail/subject-detail.component";
import { ClassworkComponent } from "./pages/classwork/classwork.component";
import { AnnouncementsComponent } from "./pages/announcements/announcements.component";
import { StudentsComponent } from "./pages/students/students.component";
import { GradesComponent } from "./pages/grades/grades.component";
import { ClassworkFormComponent } from "./pages/classwork-form/classwork-form.component";
import { GradebookComponent } from "./pages/gradebook/gradebook.component";
import { MeetingComponent } from "./pages/meeting/meeting.component";
import { ProfileSettingsComponent } from "./pages/profile-settings/profile-settings.component";
import { ClassworkDetailsComponent } from "./pages/classwork-details/classwork-details.component";


const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "loads",
    component: LoadsComponent
  },
  {
    path: "gradebook",
    component: GradebookComponent
  },
  {
    path: "loads/:id",
    component: SubjectDetailComponent,
    children: [
      {
        path: "classwork",
        component: ClassworkComponent
      },
      {
        path: "",
        redirectTo: "classwork",
        pathMatch: "full"
      },
      {
        path: "classwork/create-classwork",
        component: ClassworkFormComponent
      },
      {
        path: "announcements",
        component: AnnouncementsComponent
      },
      {
        path: "students",
        component: StudentsComponent
      },
      {
        path: "grades",
        component: GradesComponent
      },

    ]
  },
  {
    path: "classwork-detail/:id",
    component: ClassworkDetailsComponent
  },
  {
    path: "meeting",
    loadComponent: () => import("./pages/meeting/meeting.component").then(c => c.MeetingComponent)
  },
  {
    path: "profile-settings",
    component: ProfileSettingsComponent
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
export class TeacherRoutingModule { }
