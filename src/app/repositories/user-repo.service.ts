import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from './user-profile-repo.service';
import { CrudRepo } from './crud-repo';

export type User = {
  id: number;
  email: string;
  password: string;
  user_role_id: number;
  last_active: string;
  created_at: string;
  updated_at: string;
};

@Injectable({
  providedIn: 'root'
})
export class UserRepoService extends CrudRepo<User> {
  constructor(http: HttpClient) {
    super(http, 'user-management', 'users')
  }
}
