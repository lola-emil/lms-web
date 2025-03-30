import { Injectable } from '@angular/core';
import { Action } from '../layout/layout.component';
import { Navigation } from '../../student/layout/layout.component';

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
      label: "Calendar",
      path: "/teacher/calendar"
    },

    {
      label: "Forum",
      path: "/teacher/forum"
    },
  ];
}
