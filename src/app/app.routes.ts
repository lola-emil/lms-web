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
  }
];
