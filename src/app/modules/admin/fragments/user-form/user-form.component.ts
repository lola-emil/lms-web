import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRole, UserRoleRepoService } from '../../../../repositories/user-role-repo.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { UserRepoService } from '../../../../repositories/user-repo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { ToastService } from '../../../../ui/toast/toast.service';

type ErrorResponse = {
  context: { label: string, value: string, key: string; },
  message: string,
  path: string[],
  type: string;
};

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './user-form.component.html',
  styles: ``
})
export class UserFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  userRoles: UserRole[] = [];


  userFormGroup = new FormGroup({
    profile: new FormGroup({
      fname: new FormControl(""),
      mname: new FormControl(""),
      lname: new FormControl(""),
      contact_no: new FormControl(""),
      home_address: new FormControl(""),
    }),
    credential: new FormGroup({
      email: new FormControl(""),
      password: new FormControl(""),
      user_role_id: new FormControl("")
    })
  });

  userFormErrors: {
    [key: string]: { message: string; };
  } = {};

  constructor(
    private userRoleRepo: UserRoleRepoService,
    private userRepo: UserRepoService,
    private toastService: ToastService
  ) { }


  submit() {
    this.userFormErrors = {};
    this.subscriptions.push(
      this.userRepo.post(this.userFormGroup.value)
        .pipe(
          tap(val => {
            this.toastService.success("Added successfully.");
            this.userFormGroup.reset();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            (<ErrorResponse[]>errorResponse.error.data).forEach(err => {
              this.userFormErrors[err.context.label] = { message: err.message };
            });
            return of(null);
          })
        ).subscribe()
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userRoleRepo.get().pipe(
        tap(val => {
          this.userRoles = val;
        })
      ).subscribe()
    );
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
