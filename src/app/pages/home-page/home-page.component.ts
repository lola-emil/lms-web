import { Component } from '@angular/core';
import { NavbarComponent } from "../../ui/navbar/navbar.component";
import { PageCoverComponent } from "../../ui/page-cover/page-cover.component";

@Component({
  selector: 'app-home-page',
  imports: [NavbarComponent, PageCoverComponent],
  templateUrl: './home-page.component.html',
  styles: ``
})
export class HomePageComponent {

}
