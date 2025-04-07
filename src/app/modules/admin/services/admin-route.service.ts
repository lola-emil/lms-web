import { Injectable } from '@angular/core';
import { Action, Navigation } from '../../../components/layout/main-layout/main-layout.component';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteService {

  constructor() { }

    quickActions: Action[] = [
      {
        label: "Add/Import Subject",
        path: "/admin/add-subject"
      },

      {
        label: "Add/Import grade sections",
        path: "/admin/add-grade-section"
      },

      {
        label: "Add/Import new user",
        path: "/admin/add-user"
      },

    ];

    navigations: Navigation[] = [
      {
        label: "Dashboard",
        path: "/admin"
      },
      {
        label: "User Management",
        path: "/admin/user-management"
      },
      {
        label: "Subject Management",
        path: "/admin/subject-management"
      },
      {
        label: "Academic Management",
        path: "/admin/academic-management"
      },
      {
        label: "School Settings",
        path: "/admin/school-settings"
      }
    ];

    setQuickActions(actions: Action[]) {
      this.quickActions = actions;
    }
}
