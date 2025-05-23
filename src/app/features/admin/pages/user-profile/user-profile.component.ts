import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User, UserProfileService } from './services/user-profile.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

type Toast = {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // in ms
  message: string;
};

@Component({
  selector: 'app-user-profile',
  imports: [TopbarComponent, DrawerComponent, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styles: ``
})
export class UserProfileComponent implements OnInit {

  user?: User;
  userId?: number;

  toastMessages: Toast[] = [];

  isUpdating = false;

  removeToast(index: number) {
    this.toastMessages.splice(index, 1);
  }

  addToast(toast: Toast) {
    this.toastMessages.push(toast);
    setTimeout(() => this.removeToast(this.toastMessages.length - 1), toast.duration || 3000);
  }

  userForm = new FormGroup({
    firstname: new FormControl(""),
    middlename: new FormControl<string | undefined>(undefined),
    lastname: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl<string | undefined>(undefined)
  });

  constructor(
    private userProfile: UserProfileService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(val => this.userId = parseInt(val['id']));
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userProfile.getUser(this.userId ?? 0)
      .subscribe(res => {
        const user = res.data.user;
        this.userForm.controls.firstname.setValue(user.firstname);
        this.userForm.controls.middlename.setValue(user.middlename);
        this.userForm.controls.lastname.setValue(user.lastname);
        this.userForm.controls.email.setValue(user.email);
      });
  }

  updateUser() {
    this.isUpdating = true;
    this.userProfile.updateUser({
      ...this.userForm.value,
      id: this.userId
    })
      .pipe(
        tap(res => {
          console.log(res);
          this.addToast({
            message: "User updated successfully"
          });

          this.isUpdating = false;
        }),
        catchError(errRes => {
          this.isUpdating = false;
          return of(null);
        })
      )
      .subscribe();
  }

}
