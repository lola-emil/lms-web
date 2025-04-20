import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { SubjectsAndCurriculumComponent } from './pages/subjects-and-curriculum/subjects-and-curriculum.component';
import { GradeLevelStrandsComponent } from './pages/grade-level-strands/grade-level-strands.component';
import { AddNewSubjectComponent } from './pages/add-new-subject/add-new-subject.component';
import { SubjectDetailComponent } from './pages/subject-detail/subject-detail.component';
import { SchoolProfileComponent } from './pages/school-profile/school-profile.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: AdminDashboardComponent
  },
  {
    path: "user-management",
    component: UserManagementComponent
  },
  {
    path: "subjects-and-curriculum",
    component: SubjectsAndCurriculumComponent
  },
  {
    path: "subjects-and-curriculum/subject-detail/:id",
    component: SubjectDetailComponent
  },
  {
    path: "grade-level-and-strands",
    component: GradeLevelStrandsComponent
  },
  {
    path: "add-new-subject",
    component: AddNewSubjectComponent
  },
    {
    path: "school-profile",
    component: SchoolProfileComponent
  },
  {
    path: "user-management/user-profile/:id",
    component: UserProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
