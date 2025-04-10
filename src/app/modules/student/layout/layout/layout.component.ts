import { Component } from '@angular/core';
import { UserLayoutComponent } from "../../../../layout/user-layout/user-layout.component";
import { Menu, NavbarComponent } from "../../../../ui/navbar/navbar.component";

@Component({
  selector: 'app-layout',
  imports: [UserLayoutComponent, NavbarComponent],
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent {
  menus: Menu[] = [
    {
      label: "Student Dashboard",
      path: "/student"
    },
    {
      label: "Enrolled Subjects",
      path: "/student/subjects"
    },
    {
      label: "Gradebook"
    },
    {
      label: "Calendar",
      path: "/student/calendar"
    }
  ];
}
