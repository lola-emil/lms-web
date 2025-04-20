import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { GradebookComponent } from './pages/gradebook/gradebook.component';
import { EnrolledSubjectsComponent } from './pages/enrolled-subjects/enrolled-subjects.component';
import { SubjectDetailComponent } from './pages/subject-detail/subject-detail.component';
import { SubjectLessonListComponent } from './fragments/subject-lesson-list/subject-lesson-list.component';
import { AssignmentsAndActivitiesComponent } from './fragments/assignments-and-activities/assignments-and-activities.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: StudentDashboardComponent
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "enrolled-subjects",
    component: EnrolledSubjectsComponent
  },
  {
    path: "enrolled-subjects/subject-detail/:id",
    component: SubjectDetailComponent,
    children: [
      {
        path: "lessons",
        component: SubjectLessonListComponent
      },
      {
        path: "",
        redirectTo: "lessons",
        pathMatch: "full"
      },

      {
        path: "assignments-and-activities",
        component: AssignmentsAndActivitiesComponent
      }
    ]
  },
  {
    path: "grade-book",
    component: GradebookComponent
  },
  {
    path: "quiz",
    component: QuizPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
