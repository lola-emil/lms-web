import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DrawerLayoutComponent } from "../../fragments/drawer-layout/drawer-layout.component";
import { FullUserData, UserListService } from '../../services/user-list.service';
import { Subscription, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { UserRepoService } from '../../../../repositories/user-repo.service';

@Component({
  selector: 'app-user-management',
  imports: [DrawerLayoutComponent, RouterLink],
  templateUrl: './user-management.component.html',
  styles: ``
})
export class UserManagementComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  users: FullUserData[] = [];

  selectedFile: File | null = null;
  acceptedFiles = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel"].join(",");

  usersCount = 0;

  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;

  constructor(
    private userListService: UserListService,
    private userRepo: UserRepoService
  ) { }


  ngOnInit(): void {
    this.subscriptions.push(
      this.userRepo.count()
        .subscribe(val => {
          this.usersCount = val.count;
          this.maxPage = Math.ceil(this.usersCount / this.limit);
        })
    );
    this.updateUserList();
  }

  limit = 10;
  page = 1;
  maxPage = 1;

  updateUserList() {
    this.subscriptions.push(
      this.userListService.getListOfUsers(
        {
          limit: this.limit,
          offset: this.limit * (this.page - 1)
        }
      )
        .pipe(
          tap(val => {
            this.users = val;
          }),
        )
        .subscribe(),

    );
  }

  nextPage() {
    this.page += 1;
    this.updateUserList();
  }

  prevPage() {
    this.page -= 1;
    this.updateUserList();
  }

  toggleImportModal() {
    this.modalRef.nativeElement.show();
  }

  importFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      console.log(input.files[0]);
      this.selectedFile = input.files[0];

      // this.userRepo.importFile(input.files[0])
      // .subscribe(val => {
      //   console.log(val);
      // })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



}
