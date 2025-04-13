import { Component } from '@angular/core';
import { Menu, NavbarComponent } from "../../../../ui/navbar/navbar.component";
import { ToastComponent } from "../../../../ui/toast/toast.component";
import { ModalComponent } from "../../../../ui/modal/modal.component";

@Component({
  selector: 'app-teacher-layout',
  imports: [NavbarComponent, ToastComponent, ModalComponent],
  templateUrl: './teacher-layout.component.html',
  styles: ``
})
export class TeacherLayoutComponent {
  menus: Menu[] = [
    {
      label: "Dashboard",
      path: "/teacher/dashboard"
    },
    {
      label: "Gradebook",
      path: "/teacher/grade-book"
    },
    {
      label: "Subject Management",
      path: "/teacher/subject-management"
    }
  ];
}
