import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export interface Person {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  reason: { message: string }[];
}

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
  limit = 10;


  constructor(
    private readonly apollo: Apollo,
    private http: HttpClient
  ) { }

  getUsers(page: number = 1, role?: "ADMIN" | "STUDENT" | "TEACHER", searchQuery?: string) {
    let offset = (page - 1) * this.limit;

    return this.apollo.watchQuery<{
      count: number,
      users: User[];
    }>({
      query: gql`
        query Users($offset: Int!, $limit: Int!, $role: Role, $searchQuery: String) {
          count(role: $role)
          users(offset: $offset, limit: $limit, role: $role, searchQuery: $searchQuery) {
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
        offset,
        limit: this.limit,
        role: role || null,
        searchQuery
      },
      fetchPolicy: 'no-cache'
    }).valueChanges;
  }

  getUserByRole(role: "STUDENT" | "ADMIN" | "TEACHER") {
    return this.apollo.watchQuery<{ userByRole: User[]; }>({
      query: gql`
        query SubjectPerLevel {
              userByRole(role: ${role}) {
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
      fetchPolicy: "no-cache"
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

  uploadImportFile(file: File, role: "TEACHER" | "STUDENT") {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("role", role);

    return this.http.post<{data: Person[], message: string; successful: Person[], unsuccessful: Person[]}>(`${environment.apiURL}/bulk-import/bulk-import-user`, formData);
  }

  downloadCSV(data: Person[], filename: string = 'data.csv'): void {
    const headers = ['firstname', 'middlename', 'lastname', 'email', 'reason'];
    const csvRows = data.map(person => {
      const reasonMessage = person.reason.length > 0 ? person.reason[0].message : '';
      const fields = [
        person.firstname,
        person.middlename,
        person.lastname,
        person.email,
        reasonMessage
      ];
      return fields.map(field => `"${field.replace(/"/g, '""')}"`).join(',');
    });

    const csvContent = [headers.join(','), ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.setAttribute('download', filename);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}

