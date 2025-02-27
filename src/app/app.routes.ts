import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './features/common/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./features/common/common-routing.module").then(m => m.CommonRoutingModule)
  },

  {
    path: "student",
    loadChildren: () => import("./features/student/student-routing.module").then(m => m.StudentRoutingModule)
  },
  {
    path: "teacher",
    loadChildren: () => import("./features/teacher/teacher-routing.module").then(m => m.TeacherRoutingModule)
  },

  {
    path: "**",
    component: PageNotFoundComponent
  },
];
