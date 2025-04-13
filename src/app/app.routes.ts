import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "sign-in",
    component: SigninPageComponent
  },
  {
    path: "admin",
    loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "student",
    loadChildren: () => import("./modules/student/student.module").then(m => m.StudentModule)
  },
  {
    path: "teacher",
    loadChildren: () => import("./modules/teacher/teacher.module").then(m => m.TeacherModule)
  }
];
