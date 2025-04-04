import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CurriculumManagementComponent } from './pages/curriculum-management/curriculum-management.component';
import { SchoolSettingsComponent } from './pages/school-settings/school-settings.component';

const routes: Routes = [
  {
    path: "",
    component: AdminDashboardComponent
  },
  {
    path: "user-management",
    component: UserManagementComponent
  },
  {
    path: "curriculum-management",
    component: CurriculumManagementComponent
  },
  {
    path: "school-settings",
    component: SchoolSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
