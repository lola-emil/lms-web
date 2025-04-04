import { Component, Input } from '@angular/core';
import { Crumb } from "../../../components/ui/navbar/navbar.component";
import { StudentRouteService } from '../services/student-route.service';
import { Action, MainLayoutComponent, Navigation } from "../../../components/layout/main-layout/main-layout.component";


@Component({
  selector: 'app-layout',
  imports: [MainLayoutComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private studentRouteService: StudentRouteService) {
    this.navigations = this.studentRouteService.navigations;
    this.quickActions = this.studentRouteService.quickActions;
   }

  @Input() pageTitle: string = "";

  quickActions: Action[] = [];
  navigations: Navigation[] = [];

  @Input() crumbs: Crumb[] = [];

}
