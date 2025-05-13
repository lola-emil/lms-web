import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { tap } from 'rxjs';
import { User, UserManagementService } from './services/user-management.service';

@Component({
  selector: 'app-user-management',
  imports: [DrawerComponent, TopbarComponent],
  templateUrl: './user-management.component.html',
  styles: ``
})
export class UserManagementComponent implements OnInit {


  mgaUsers: User[] = [];

  constructor(

    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
    this.userManagementService.getUsers()
      .pipe(
        tap(val => {
          console.log(val.data.users);

          this.mgaUsers = val.data.users;
        })
      )
      .subscribe();
  }
}
