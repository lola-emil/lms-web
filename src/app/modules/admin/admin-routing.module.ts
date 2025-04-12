import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserListComponent } from './fragments/user-list/user-list.component';
import { UserFormComponent } from './fragments/user-form/user-form.component';
import { UserImportComponent } from './fragments/user-import/user-import.component';
import { SubjectListComponent } from './fragments/subject-list/subject-list.component';
import { SchoolSettingsComponent } from './pages/school-settings/school-settings.component';
import { SubjectManagementComponent } from './pages/subject-management/subject-management.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: AdminDashboardComponent
  },
  {
    path: "user-management",
    component: UserManagementComponent,
    children: [
      {
        path: "user-list",
        component: UserListComponent,
      },
      {
        path: "user-form",
        component: UserFormComponent
      },
      {
        path: "import-user",
        component: UserImportComponent
      },
      {
        path: "",
        redirectTo: "user-list",
        pathMatch: 'full'
      }
    ]
  },
  {
    path: "subject-management",
    component: SubjectManagementComponent,
    children: [
      {
        path: "",
        component: SubjectListComponent
      }
    ]
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
