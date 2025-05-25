import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WelcomeComponent } from '../../../../shared/svg/welcome/welcome.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { catchError, finalize, of, tap } from 'rxjs';
import type { ValidationErrorItem } from "joi";
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-sign-in-page',
  imports: [WelcomeComponent, ReactiveFormsModule],
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
    private router: Router,
  ) { }

  errors: Map<string, string> = new Map();
  isSigningIn = false;

  submit() {
    const value = this.userForm.value;
    this.errors.clear();

    this.isSigningIn = true;
    this.authService.signIn(value.email + "", value.password + "")
      .pipe(
        tap(val => {
          console.log(val);
          this.authService.setUserDetail(val as any);
          location.reload();
        }),

        catchError(err => {
          this.isSigningIn = false;
          const validationErrors: ValidationErrorItem[] = err.error.data;
          console.log("login error", err.error.data);

          validationErrors.forEach(val => {
            if (val.context?.key)
              this.errors.set(val.context?.key, val.message);
          });
          return of(null);
        }),
      ).subscribe();
  }
}
