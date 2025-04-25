import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { User, UserRepoService } from '../../../../repositories/user-repo.service';
import { UserProfile, UserProfileRepoService } from '../../../../repositories/user-profile-repo.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { UserRole, UserRoleRepoService } from '../../../../repositories/user-role-repo.service';

@Component({
  selector: 'app-user-management',
  imports: [DrawerComponent, TopbarComponent],
  templateUrl: './user-management.component.html',
  styles: ``
})
export class UserManagementComponent implements OnInit {

  users: Partial<{
    user: User,
    profile: UserProfile,
    role: UserRole;
  }>[] = [];

  constructor(
    private userRepo: UserRepoService,
    private userProfileRepo: UserProfileRepoService,
    private userRoleRepo: UserRoleRepoService
  ) { }

  ngOnInit(): void {
    this.userRepo.get({})
      .pipe(
        switchMap(user => {
          const userIds = user.map(val => val.id);
          const roleIds = user.map(val => val.role_id);

          return forkJoin({
            users: of(user),
            profiles: this.userProfileRepo.get({ user_id: userIds }),
            roles: this.userRoleRepo.get({ id: roleIds })
          });
        })
      ).subscribe(val => {
        const formatted = val.users.map(user => {
          const profile = val.profiles.find(val => val.user_id == user.id);
          const role = val.roles.find(val => val.id == user.role_id);
          return {
            user,
            profile,
            role
          };
        });
        this.users = formatted;
        console.log(formatted);
      });
  }
}
