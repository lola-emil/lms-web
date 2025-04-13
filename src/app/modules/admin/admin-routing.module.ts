import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserListComponent } from './fragments/user-list/user-list.component';
import { UserFormComponent } from './fragments/user-form/user-form.component';
import { UserImportComponent } from './fragments/user-import/user-import.component';
import { SubjectListComponent } from './fragments/subject-list/subject-list.component';
import { SubjectManagementComponent } from './pages/subject-management/subject-management.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { GeneralSettingsComponent } from './fragments/general-settings/general-settings.component';
import { SchoolSettingsComponent } from './fragments/school-settings/school-settings.component';
import { SubjectFormComponent } from './fragments/subject-form/subject-form.component';

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
        path: "subject-list",
        component: SubjectListComponent
      },
      {
        path: "add-subject",
        component: SubjectFormComponent
      },
      {
        path: "",
        redirectTo: "subject-list",
        pathMatch: 'full'
      }
    ]
  },

  {
    path: "settings",
    component: SettingsComponent,
    children: [
      {
        path: "general-settings",
        component: GeneralSettingsComponent
      },
      {
        path: "school-settings",
        component: SchoolSettingsComponent
      }
    ]
  },


  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
