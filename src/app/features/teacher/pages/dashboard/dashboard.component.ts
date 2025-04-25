import { Component } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { HelloSvgComponent } from "../../../../shared/svg/hello-svg/hello-svg.component";

@Component({
  selector: 'app-dashboard',
  imports: [DrawerComponent, TopbarComponent, HelloSvgComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent {

}
