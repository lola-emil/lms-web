import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Crumb, NavbarComponent } from '../../ui/navbar/navbar.component';
import { Action, Navigation } from '../main-layout/main-layout.component';
import { KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { DrawerComponent } from "../../ui/drawer/drawer.component";


export type MenuAction = {
  label: string,
  path?: string,
  handler?: () => void
};

export type Menu = {
  title: string,
  actions: MenuAction[]
};

@Component({
  selector: 'app-layout',
  imports: [RouterLink, NgClass, DrawerComponent, NavbarComponent, NgFor, KeyValuePipe],
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent {
  @Input()
  pageTitle: string = "";

  @Input()
  quickActions: Action[] = [];

  @Input()
  navigations: Navigation[] = [];

  @Input()
  crumbs: Crumb[] = [];

  @Input()
  details: any = {};

  @Input()
  menus: Menu[] = []

}
