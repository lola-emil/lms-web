import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export type User = {
  id: number;
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
    private http: HttpClient
  ) { }

  getUsers() {
    return this.apollo.watchQuery<{ users: User[]; }>({
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
      `,
      fetchPolicy: 'no-cache'
    }).valueChanges;
  }


submitUser(body: Partial<{
  firstname: string | null;
  middlename?: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
  role: string | null;
}>) {
  return this.apollo.mutate({
    mutation: gql`

      mutation CreateUser(
        $firstname: String!,
        $middlename: String,
        $lastname: String!,
        $email: String!,
        $password: String!,
        $role: Role!
      ) {
        createUser(
          firstname: $firstname
          middlename: $middlename
          lastname: $lastname
          email: $email
          password: $password
          role: $role
        ) {
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
    `,
    variables: {
      firstname: body.firstname,
      middlename: body.middlename,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
      role: body.role,  // This will pass the role value from the input body
    }
  });
}

  uploadImportFile(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    return this.http.post(`${environment.apiURL}/bulk-import/bulk-import-user`, formData);
  }
}

