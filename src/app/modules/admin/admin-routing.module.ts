import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { SchoolSettingsComponent } from './pages/school-settings/school-settings.component';
import { AcademicManagementComponent } from './pages/academic-management/academic-management.component';
import { SubjectMangementComponent } from './pages/subject-mangement/subject-mangement.component';
import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';
import { AddSubjectPageComponent } from './pages/add-subject-page/add-subject-page.component';
import { AddGradeSectionPageComponent } from './pages/add-grade-section-page/add-grade-section-page.component';

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
    path: "subject-management",
    component: SubjectMangementComponent
  },
  {
    path: "academic-management",
    component: AcademicManagementComponent
  },
  {
    path: "school-settings",
    component: SchoolSettingsComponent
  },
  {
    path: "add-user",
    component: AddUserPageComponent
  },
  {
    path: "add-grade-section",
    component: AddGradeSectionPageComponent
  },
  {
    path: "add-subject",
    component: AddSubjectPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
