import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type Menu = {
  label?: string,
  path?: string,
  children?: Menu[]
};

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {


  @Input()
  menus: Menu[] = [];

  @Input()
  cta: Menu[] = [];
}
