import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from '../../../../../services/auth.service';

export type ClassLevel = {
  id: number;
  level: number;
};

export type ClassSection = {
  id: number;
  sectionName: string;

  classLevel: {
    id: number;
    level: number;
  };
};

export type SchoolYear = {
  id: number;
  yearStart: number;
  yearEnd: number;

  isCurrent: boolean;

  createdAt: string;
  updatedAt: string;
};


@Injectable({
  providedIn: 'root'
})
export class AcademicSettingsService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    private authService: AuthService
  ) { }


  getSchoolYears() {
    return this.apollo.watchQuery<{ schoolYears: SchoolYear[]; }>({
      query: gql`
        query SchoolYears {
            schoolYears {
                id
                yearStart
                yearEnd
                isCurrent
                createdAt
                updatedAt
            }
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  submitSchoolYear(body: Partial<{
    yearStart: number;
    yearEnd: number;
  }>) {
    const user = this.authService.getUserDetail();
    return this.http.post(`${environment.apiURL}/graphql-ext/add-school-year`, {
      ...body,
      createdById: user.id
    });
  };



  changeCurrentSchoolYear(body: Partial<{
    schoolYearId: number;
    isCurrent: boolean;
    adminPassword: string;
  }>) {
    const user = this.authService.getUserDetail();
    return this.http.post(`${environment.apiURL}/graphql-ext/change-school-year`, {
      ...body,
      adminId: user.id
    });
  }


}
