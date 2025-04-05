import { Component, Input } from '@angular/core';
import { NotificationComponent } from "../notification/notification.component";
export type Crumb = {
  label: string;
  path?: string;
};

@Component({
  selector: 'app-navbar',
  imports: [NotificationComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input()
  crumbs: Crumb[] = [];
}
