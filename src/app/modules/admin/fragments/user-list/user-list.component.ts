import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserRepoService } from '../../../../repositories/user-repo.service';
import { Subscription, tap } from 'rxjs';
import { DatePipe, NgClass } from '@angular/common';
import { FullUserData, UserListService } from '../../services/user-list.service';

@Component({
  selector: 'app-user-list',
  imports: [DatePipe, NgClass],
  templateUrl: './user-list.component.html',
  styles: ``
})
export class UserListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  users: FullUserData[] = [];

  userCount = 0;
  userListLimit = 10;
  userListPage = 1;
  userListMaxPage = 1;

  constructor(
    private userRepo: UserRepoService,
    private userListService: UserListService
  ) { }

  ngOnInit(): void {
    this.updateList();
    this.subscriptions.push(
      this.userRepo.count()
        .subscribe(val => {

          // calculate Max page para sa table
          this.userCount = val.count;
          this.userListMaxPage = Math.ceil(this.userCount / this.userListLimit);
        })
    );
  }


  updateList() {
    this.subscriptions.push(
      this.userListService.getListOfUsers({
        limit: this.userListLimit,
        offset: this.userListLimit * (this.userListPage - 1)
      })
        .pipe(
          tap(val => {
            this.users = val;
          })
        )
        .subscribe(),
    );
  }

  nextUserListPage() {
    this.userListPage += 1;
    this.updateList();
  }

  prevUserListPage() {
    this.userListPage -= 1;
    this.updateList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
