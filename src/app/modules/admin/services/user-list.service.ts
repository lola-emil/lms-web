import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { User, UserRepoService } from '../../../repositories/user-repo.service';
import { UserProfileRepoService, UserProfile } from '../../../repositories/user-profile-repo.service';
import { UserRole, UserRoleRepoService } from '../../../repositories/user-role-repo.service';




export type FullUserData = {
  user: User;
  profile?: UserProfile;
  role?: UserRole;
};

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
    private userRepo: UserRepoService,
    private userProfileRepo: UserProfileRepoService,
    private userRoleRepo: UserRoleRepoService
  ) { }

  getListOfUsers(): Observable<FullUserData[]> {
    return forkJoin({
      users: this.userRepo.get(),         // returns Observable<User[]>
      profiles: this.userProfileRepo.get(), // returns Observable<UserProfile[]>
      roles: this.userRoleRepo.get()      // returns Observable<UserRole[]>
    }).pipe(
      map(val => {
        return val.users.map(user => {
          const profile = val.profiles.find(p => p.user_id === user.id);
          const role = val.roles.find(r => r.id === user.user_role_id);

          return {
            user,
            profile,
            role
          }
        })
      })
    );
  }
}
