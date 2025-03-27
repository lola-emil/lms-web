import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './features/common/pages/page-not-found/page-not-found.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { StudentCoursesComponent } from './pages/student-courses/student-courses.component';
import { StudentCourseDetailsComponent } from './pages/student-course-details/student-course-details.component';

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./features/common/common-routing.module").then(m => m.CommonRoutingModule)
  },

  {
    path: "student",
    loadChildren: () => import("./features/student/student-routing.module").then(m => m.StudentRoutingModule)
  },
  {
    path: "teacher",
    loadChildren: () => import("./features/teacher/teacher-routing.module").then(m => m.TeacherRoutingModule)
  },

  {
    path: "student-dashboard",
    component: StudentDashboardComponent
  },

  {
    path: "student-courses",
    component: StudentCoursesComponent
  },

  {
    path: "student-courses/:id",
    component: StudentCourseDetailsComponent
  },

  {
    path: "**",
    component: PageNotFoundComponent
  },
];
