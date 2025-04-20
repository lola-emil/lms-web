import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { User, UserRepoService } from '../../../repositories/user-repo.service';
import { UserProfileRepoService, UserProfile } from '../../../repositories/user-profile-repo.service';
import { UserRole, UserRoleRepoService } from '../../../repositories/user-role-repo.service';


export type FullUserData = {
  user: User;
  profile?: UserProfile;
  role?: UserRole;
};

export type PaginatedFullUserData = {
  data: FullUserData[];
  total: number;
};

@Injectable({ providedIn: 'root' })
export class UserListService {
  constructor(
    private userRepo: UserRepoService,
    private userProfileRepo: UserProfileRepoService,
    private userRoleRepo: UserRoleRepoService
  ) { }

  getListOfUsers(opt?: { limit?: number; offset?: number; }): Observable<FullUserData[]> {
    return this.userRepo.get({
      limit: opt?.limit,
      offset: opt?.offset
    }).pipe(
      // Step 1: Once users are fetched, fetch only the related profiles and roles
      switchMap(users => {
        const userIds = users.map(u => u.id);

        return forkJoin({
          users: of(users),
          profiles: this.userProfileRepo.get({ user_id: userIds }),  // assume you can filter by user_ids
          roles: this.userRoleRepo.get({ id: users.map(u => u.user_role_id) }) // assume you can filter by role IDs
        });
      }),
      map((val) => {
        return (<User[]>val.users).map(user => {
          const profile = val.profiles.find(p => p.user_id === user.id);
          const role = val.roles.find(r => r.id === user.user_role_id);

          return {
            user,
            profile,
            role
          };
        });
      })
    );
  }
}


