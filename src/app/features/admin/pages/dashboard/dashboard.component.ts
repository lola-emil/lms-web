import { Component } from '@angular/core';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";

@Component({
  selector: 'app-dashboard',
  imports: [DrawerComponent, TopbarComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

}
