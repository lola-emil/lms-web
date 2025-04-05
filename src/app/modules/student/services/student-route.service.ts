  import { Injectable } from '@angular/core';
import { Action, Navigation } from '../../../components/layout/main-layout/main-layout.component';

@Injectable({
  providedIn: 'root'
})
export class StudentRouteService {

  constructor() { }

  quickActions: Action[] = [];

  navigations: Navigation[] = [
    {
      label: "Dashboard",
      path: "/student"
    },

    {
      label: "Enrolled Subjects",
      path: "/student/courses"
    },

    {
      label: "Calendar",
      path: "/student/calendar"
    },

    {
      label: "Forum",
      path: "/student/forum"
    },
  ];
}
