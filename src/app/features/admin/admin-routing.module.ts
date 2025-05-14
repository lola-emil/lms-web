import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { UserManagementComponent } from "./pages/user-management/user-management.component";
import { CurriculumManagementComponent } from "./pages/curriculum-management/curriculum-management.component";
import { SubjectDetailPageComponent } from "./pages/subject-detail-page/subject-detail-page.component";
import { DocEditorComponent } from "./pages/doc-editor/doc-editor.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "user-management",
    component: UserManagementComponent,
  },
  {
    path: "content-management",
    component: CurriculumManagementComponent
  },
  {
    path: "content-management/:id",
    component: SubjectDetailPageComponent
  },
  {
    path: "doc-editor",
    component: DocEditorComponent
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes),

  ]
})
export class AdminRoutingModule { }
