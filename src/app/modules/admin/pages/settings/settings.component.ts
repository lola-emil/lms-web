import { Component } from '@angular/core';
import { AdminLayoutComponent } from "../../layout/admin-layout/admin-layout.component";
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [AdminLayoutComponent, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './settings.component.html',
  styles: ``
})
export class SettingsComponent {

}
