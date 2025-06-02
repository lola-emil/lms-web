import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type SchoolYear = {
  id: number;
  yearStart: number;
  yearEnd: number;

  isCurrent: boolean
}

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

  constructor(
    private apollo: Apollo,
  ) { }

  getCurrentSchoolYear() {
    return this.apollo.watchQuery<{currentSchoolYear: SchoolYear}>({
      query: gql`
        query CurrentSchoolYear {
            currentSchoolYear {
                id
                yearStart
                yearEnd
                isCurrent
                createdAt
                updatedAt
            }
        }
      `
    }).valueChanges;
  }
}
