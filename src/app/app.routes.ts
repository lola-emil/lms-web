import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "login",
    canActivate: [LoginGuard],
    component: LoginPageComponent
  },
  {
    path: "admin",
    canActivate: [LoginGuard, AuthGuard],
    loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "teacher",
    canActivate: [LoginGuard, AuthGuard],
    loadChildren: () => import("./modules/teacher/teacher.module").then(m => m.TeacherModule)
  },
  {
    path: "student",
    canActivate: [LoginGuard, AuthGuard],
    loadChildren: () => import("./modules/student/student.module").then(m => m.StudentModule)
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];
