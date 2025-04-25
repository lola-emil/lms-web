import { Component } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loads',
  imports: [DrawerComponent, TopbarComponent, RouterLink],
  templateUrl: './loads.component.html',
  styles: ``
})
export class LoadsComponent {

}
