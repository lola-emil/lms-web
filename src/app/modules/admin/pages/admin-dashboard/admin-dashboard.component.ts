import { Component } from '@angular/core';
import { UserLayoutComponent } from "../../../../layout/user-layout/user-layout.component";
import { NavbarComponent } from "../../../../ui/navbar/navbar.component";
import { ModalService } from '../../../../ui/modal/modal.service';
import { DrawerService } from '../../../../layout/main-layout/drawer.service';
import { RouterLink } from '@angular/router';
import { SidenavComponent } from "../../fragments/sidenav/sidenav.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [UserLayoutComponent, SidenavComponent],
  templateUrl: './admin-dashboard.component.html',
  styles: ``
})
export class AdminDashboardComponent {

  constructor(
    private modalService: ModalService,
    private drawerService: DrawerService
  ) {}

  openImportUsersModal() {
    this.modalService.open();
  }

  openImportSectionsModal() {
    this.modalService.open();
  }
}
