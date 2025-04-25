import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './features/common/pages/page-not-found/page-not-found.component';
import { RoleGuard } from './auth/role.guard';

export const routes: Routes = [
  {
    path: "",
    canActivate: [RoleGuard],
    loadChildren: () => import("./features/common/common-routing.module").then(m => m.CommonRoutingModule)
  },

  {
    path: "student",
    canActivate: [RoleGuard],
    loadChildren: () => import("./features/student/student-routing.module").then(m => m.StudentRoutingModule)
  },
  {
    path: "teacher",
    canActivate: [RoleGuard],
    loadChildren: () => import("./features/teacher/teacher-routing.module").then(m => m.TeacherRoutingModule)
  },

  {
    path: "admin",
    canActivate: [RoleGuard],
    loadChildren: () => import("./features/admin/admin-routing.module").then(m => m.AdminRoutingModule)
  },

  {
    path: "**",
    component: PageNotFoundComponent
  },
];
