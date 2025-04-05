import { Injectable } from '@angular/core';
import { Action, Navigation } from '../../../components/layout/main-layout/main-layout.component';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteService {

  constructor() { }

    quickActions: Action[] = [
      {
        label: "Add new user"
      },
      {
        label: "Import users (CSV)"
      },
      {
        label: "Import courses (CSV)"
      }
    ];

    navigations: Navigation[] = [
      {
        label: "Dashboard",
        path: "/admin"
      },
      {
        label: "User management",
        path: "/admin/user-management"
      },
      {
        label: "Curriculum Management",
        path: "/admin/curriculum-management"
      },
      {
        label: "School Settings",
        path: "/admin/school-settings"
      }
    ];
}
