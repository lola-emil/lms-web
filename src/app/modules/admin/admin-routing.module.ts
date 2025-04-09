import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { SubjectManagementComponent } from './pages/subject-management/subject-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { SchoolSettingsComponent } from './fragments/school-settings/school-settings.component';

const routes: Routes = [
  {
    path: "",
    component: AdminDashboardComponent
  },
  {
    path: "subject-management",
    component: SubjectManagementComponent
  },
  {
    path: "user-management",
    component: UserManagementComponent
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
