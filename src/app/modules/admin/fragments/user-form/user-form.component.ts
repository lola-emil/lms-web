import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRole, UserRoleRepoService } from '../../../../repositories/user-role-repo.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.component.html',
  styles: ``
})
export class UserFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  userRoles: UserRole[] = [];

  constructor(
    private userRoleRepo: UserRoleRepoService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.userRoleRepo.get().pipe(
        tap(val => {
          this.userRoles = val;
        })
      ).subscribe()
    )
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
