import { Component, Input } from '@angular/core';
import { Crumb, NavbarComponent } from "../../../components/ui/navbar/navbar.component";
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeacherRouteService } from '../services/teacher-route.service';

export type Action = {
  label: string;
};

export type Navigation = {
  label: string;
  path: string;
};


@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, NgIf, RouterLink, NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private teacherRouteService: TeacherRouteService) {
    this.navigations = this.teacherRouteService.navigations;
    this.quickActions = this.teacherRouteService.quickActions;
   }

  @Input() title: string = "";

  quickActions: Action[] = [];
  navigations: Navigation[] = [];

  @Input() crumbs: Crumb[] = [];

}
