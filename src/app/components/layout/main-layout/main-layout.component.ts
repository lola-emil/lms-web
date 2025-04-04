import { Component, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Crumb, NavbarComponent } from '../../ui/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { DrawerComponent } from "../../ui/drawer/drawer.component";
export type Action = {
  label: string;
};

export type Navigation = {
  label: string;
  path: string;
};

@Component({
  selector: 'app-main-layout',
  imports: [RouterLink, NgClass, NavbarComponent, NgIf, DrawerComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {


  @Input()
  pageTitle: string = "";

  @Input()
  quickActions: Action[] = [];

  @Input()
  navigations: Navigation[] = [];

  @Input()
  crumbs: Crumb[] = [];
}
