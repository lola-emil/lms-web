import { Component } from '@angular/core';
import { Menu, NavbarComponent } from "../../../../ui/navbar/navbar.component";
import { ModalComponent } from "../../../../ui/modal/modal.component";
import { ToastComponent } from "../../../../ui/toast/toast.component";

@Component({
  selector: 'app-admin-layout',
  imports: [NavbarComponent, ModalComponent, ToastComponent],
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
      label: "Subject Management",
      path: "/admin/subject-management"
    },

    {
      label: "Settings",
      path: "/admin/settings"
    }
  ];
}
