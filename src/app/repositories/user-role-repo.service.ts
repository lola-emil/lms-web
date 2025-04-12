import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';

export type UserRole = {
  id: number;
  role_name: string;
};

@Injectable({
  providedIn: 'root'
})
export class UserRoleRepoService extends CrudRepo<UserRole> {

  constructor(http: HttpClient) {
    super(http, "user-management", "user-roles")
   }

}
