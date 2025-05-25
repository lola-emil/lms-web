import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from '../../../../../services/auth.service';

export type User = {
  id: number;
  email: string | null;
  firstname: string | null;
  middlename?: string | null;
  lastname: string | null;
};

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUser(userId: number) {
    return this.apollo.watchQuery<{ user: User; }>({
      query: gql`
        query User {
            user(id: ${userId}) {
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

  updateUser(body: Partial<User>) {
    const userDetail = this.authService.getUserDetail();
    return this.http.post(`${environment.apiURL}/graphql-ext/update-user`, {
      ...body,
      updatedById: userDetail.id
    });

  }
}
