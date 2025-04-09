import { Component } from '@angular/core';
import { DrawerService } from '../../../../layout/main-layout/drawer.service';
import { ModalService } from '../../../../ui/modal/modal.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styles: ``
})
export class SidenavComponent {
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
