import { Component, Input } from '@angular/core';
import { Crumb } from "../../../components/ui/navbar/navbar.component";
import { TeacherRouteService } from '../services/teacher-route.service';
import { Action, MainLayoutComponent, Navigation } from "../../../components/layout/main-layout/main-layout.component";



@Component({
  selector: 'app-layout',
  imports: [MainLayoutComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private teacherRouteService: TeacherRouteService) {
    this.navigations = this.teacherRouteService.navigations;
    this.quickActions = this.teacherRouteService.quickActions;
  }

  @Input() pageTitle: string = "";

  quickActions: Action[] = [];
  navigations: Navigation[] = [];

  @Input() crumbs: Crumb[] = [];

}
