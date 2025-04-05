import { Injectable } from '@angular/core';
import { Action, Navigation } from '../../../components/layout/main-layout/main-layout.component';

@Injectable({
  providedIn: 'root'
})
export class TeacherRouteService {

  constructor() { }

  quickActions: Action[] = [
    {
      label: "Make an Announcement",
    },
    {
      label: "New Assignment/Activity"
    }
  ];

  navigations: Navigation[] = [
    {
      label: "Dashboard",
      path: "/teacher"
    },

    {
      label: "Subjects",
      path: "/teacher/subjects"
    },

    {
      label: "Gradebook",
      path: "/teacher/gradebook"
    },

    {
      label: "Calendar",
      path: "/teacher/calendar"
    },

    {
      label: "Forum",
      path: "/teacher/forum"
    },
  ];
}
