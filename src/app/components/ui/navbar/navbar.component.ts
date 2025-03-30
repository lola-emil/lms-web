import { Component, Input } from '@angular/core';
export type Crumb = {
  label: string;
  path?: string;
};

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input()
  crumbs: Crumb[] = [];
}
