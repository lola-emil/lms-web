import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserRepoService } from '../../../../repositories/user-repo.service';
import { Subscription, tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FullUserData, UserListService } from '../../services/user-list.service';

@Component({
  selector: 'app-user-list',
  imports: [DatePipe],
  templateUrl: './user-list.component.html',
  styles: ``
})
export class UserListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  users: FullUserData[] = [];

  constructor(
    private userRepo: UserRepoService,
    private userListService: UserListService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.userListService.getListOfUsers()
      .pipe(
        tap(val => {
          this.users = val;
        })
      )
      .subscribe(),
    );

    const aso = this.userListService.getListOfUsers()
    aso.subscribe(val => {
      console.log(val);
    })

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
