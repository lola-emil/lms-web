import { Component } from '@angular/core';
import { Menu, NavbarComponent } from "../../../../ui/navbar/navbar.component";
import { ModalComponent } from "../../../../ui/modal/modal.component";

@Component({
  selector: 'app-admin-layout',
  imports: [NavbarComponent, ModalComponent],
  templateUrl: './admin-layout.component.html',
  styles: ``
})
export class AdminLayoutComponent {
  menus: Menu[] = [
    {
      label: "Dashboard",
      path: "/admin/dashboard"
    },
    {
      label: "User Management",
      path: "/admin/user-management"
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
}
