import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from "../../layout/admin-layout/admin-layout.component";
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  imports: [AdminLayoutComponent, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './user-management.component.html',
  styles: ``
})
export class UserManagementComponent implements OnInit {



  constructor(
  ) {}

  ngOnInit(): void {
  }

}
