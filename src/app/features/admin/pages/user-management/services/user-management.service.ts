import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type User = {
  id: number
  email: string;
  firstname: string;
  middlename?: string;
  lastname: string;

  role: "ADMIN" | "STUDENT" | "TEACHER",

  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(
    private readonly apollo: Apollo,
  ) { }

  getUsers() {
    return this.apollo.watchQuery<{users: User[]}>({
      query: gql`
        query Users {
          users {
            id
            email
            firstname
            middlename
            lastname
            role
            createdAt
            updatedAt
          }
        }
      `
    }).valueChanges;
  }
}

