import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WelcomeComponent } from '../../../../shared/svg/welcome/welcome.component';

@Component({
  selector: 'app-sign-in-page',
  imports: [WelcomeComponent, RouterLink],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

}
