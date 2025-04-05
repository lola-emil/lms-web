import { Component, Input } from '@angular/core';
import { Action, MainLayoutComponent, Navigation } from "../../../components/layout/main-layout/main-layout.component";
import { Crumb } from '../../../components/ui/navbar/navbar.component';
import { AdminRouteService } from '../services/admin-route.service';

@Component({
  selector: 'app-layout',
  imports: [MainLayoutComponent],
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent {

  @Input() pageTitle: string = "";

  quickActions: Action[];
  navigations: Navigation[];

  @Input() crumbs: Crumb[] = [];



  constructor(private adminRouteService: AdminRouteService) {
    this.navigations = this.adminRouteService.navigations;
    this.quickActions = this.adminRouteService.quickActions;
   }

}
