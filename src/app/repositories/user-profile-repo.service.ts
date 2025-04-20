import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';


export type UserProfile = {
  id: number;
  fname: string;
  mname?: string;
  lname: string;

  home_address?: string;
  contact_no: string;
  user_id: number
};


@Injectable({
  providedIn: 'root'
})
export class UserProfileRepoService extends CrudRepo<UserProfile> {

  constructor(http: HttpClient) {
    super(http, "user-management", "user-profiles");
  }
}
