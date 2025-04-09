import { Component } from '@angular/core';
import { Menu, NavbarComponent } from "../../ui/navbar/navbar.component";
import { ModalComponent } from "../../ui/modal/modal.component";
import { ModalService } from '../../ui/modal/modal.service';
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { DrawerService } from '../../layout/main-layout/drawer.service';
import { CalendarComponent } from "../../ui/calendar/calendar.component";

@Component({
  selector: 'app-home-page',
  imports: [NavbarComponent, ModalComponent, MainLayoutComponent],
  templateUrl: './home-page.component.html',
  styles: ``
})
export class HomePageComponent {
  constructor(
    private modalService: ModalService,
    private drawerService: DrawerService
  ) {}
  navbarMenus: Menu[] = [
    {
      label: "Home"
    },
    {
      label: "About"
    },
    {
      label: "Contact"
    }
  ];

  cta: Menu[] = [
    {
      label: "Sign in",
      path: "/sign-in"
    }
  ];

  openModal() {
    this.modalService.open();
  }

  openDrawer() {
    console.log("shit");
    this.drawerService.open();
  }
}
