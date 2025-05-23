import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private apollo: Apollo
  ) { }


  countUser(role: "STUDENT" | "TEACHER") {
    return this.apollo.watchQuery<{ userCount: number; }>({
      query: gql`
        query SubjectPerLevel {
          userCount(role: ${role})
        }
      `
    }).valueChanges;
  }

  countMaterials() {
    return this.apollo.watchQuery<{ materialCount: number; }>({
      query: gql`
        query SubjectMaterial {
          materialCount
        }
      `
    }).valueChanges;
  }
}
