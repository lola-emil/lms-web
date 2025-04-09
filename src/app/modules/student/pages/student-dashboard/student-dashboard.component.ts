import { Component } from '@angular/core';
import { UserLayoutComponent } from "../../../../layout/user-layout/user-layout.component";
import { SidenavComponent } from "../../fragments/sidenav/sidenav.component";

@Component({
  selector: 'app-student-dashboard',
  imports: [UserLayoutComponent, SidenavComponent],
  templateUrl: './student-dashboard.component.html',
  styles: ``
})
export class StudentDashboardComponent {

}
