import { Component } from '@angular/core';
import { UserLayoutComponent } from "../../../../layout/user-layout/user-layout.component";
import { SidenavComponent } from "../../fragments/sidenav/sidenav.component";

@Component({
  selector: 'app-user-management',
  imports: [UserLayoutComponent, SidenavComponent],
  templateUrl: './user-management.component.html',
  styles: ``
})
export class UserManagementComponent {

}
