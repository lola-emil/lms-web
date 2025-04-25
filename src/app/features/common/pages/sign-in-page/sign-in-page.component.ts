import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WelcomeComponent } from '../../../../shared/svg/welcome/welcome.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-sign-in-page',
  imports: [WelcomeComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

  userForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  submit() {
    const value = this.userForm.value;
    this.authService.signIn(value.email ?? "", value.password ?? "")
      .pipe(
        tap((val: any) => {
          this.authService.setUserDetail(val);
          location.reload();
        }),
        catchError(error => {
          console.log(error.data);
          return of(null);
        })
      )
      .subscribe();
  }
}
