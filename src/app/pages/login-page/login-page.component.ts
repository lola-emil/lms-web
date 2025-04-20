import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  signInForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  submit() {
    const body = this.signInForm.value;
    this.subscriptions.push(
      this.authService.signIn(body)
        .pipe(
          tap(val => {
            console.log(val);

            this.authService.setUserDetail(val);

            // Redirect based on role
            const role = val.role.toLowerCase();
            switch (role) {
              case 'admin':
                this.router.navigate(['/admin']);
                break;
              case 'teacher':
                this.router.navigate(['/teacher']);
                break;
              case 'student':
                this.router.navigate(['/student']);
                break;
              default:
                this.router.navigate(['/']); // fallback
            }
          }),
          catchError(error => {
            console.log(error);
            return of(null);
          })
        ).subscribe()
    );
  }
}
