import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { UserManagementComponent } from "./pages/user-management/user-management.component";
import { CurriculumManagementComponent } from "./pages/curriculum-management/curriculum-management.component";
import { SubjectDetailPageComponent } from "./pages/subject-detail-page/subject-detail-page.component";
import { QuizCreationFormComponent } from "./pages/quiz-creation-form/quiz-creation-form.component";
import { LessonContentComponent } from "./pages/lesson-content/lesson-content.component";
import { EditLessonComponent } from "./pages/edit-lesson/edit-lesson.component";
import { TeacherSubjectComponent } from "./pages/teacher-subject/teacher-subject.component";
import { EnrolledStudentsComponent } from "./pages/enrolled-students/enrolled-students.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ProfileSettingsComponent } from "./pages/profile-settings/profile-settings.component";
import { AcademicSettingsComponent } from "./pages/academic-settings/academic-setings.component";
import { StudentPerSectionComponent } from "./pages/student-per-section/student-per-section.component";
import { ClassSectionComponent } from "./pages/class-section/class-section.component";

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
    component: SubjectDetailPageComponent,
    children: [
      // {
      //   path: "lessons",
      //   component: SubjectLessonsComponent
      // },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "assigned-teachers"
      },
      {
        path: "assigned-teachers",
        component: TeacherSubjectComponent
      },
      {
        path: "enrolled-students",
        component: EnrolledStudentsComponent
      }
    ]
  },
  {
    path: "lesson-content/:id",
    component: LessonContentComponent
  },
  {
    path: "edit-lesson",
    component: EditLessonComponent
  },
  {
    path: "doc-editor",
    loadComponent: () => import("./pages/doc-editor/doc-editor.component").then(c => c.DocEditorComponent)
  },
  {
    path: "quiz-creation",
    component: QuizCreationFormComponent
  },
  {
    path: "user-profile/:id",
    component: UserProfileComponent
  },
  {
    path: "profile-settings",
    component: ProfileSettingsComponent
  },
  {
    path: "academic-settings",
    component: AcademicSettingsComponent
  },
  {
    path: "class-sections/:id",
    component: StudentPerSectionComponent
  },
  {
    path: "class-sections",
    component: ClassSectionComponent
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
