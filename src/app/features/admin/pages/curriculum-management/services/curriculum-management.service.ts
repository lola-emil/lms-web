import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type Subject = {
  id: number;
  title: string;
  coverImgUrl?: string;
  classLevelId: number;

  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: 'root'
})
export class CurriculumManagementService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getSubjects() {
    return this.apollo.watchQuery<{ subjects: Subject[]; }>({
      query: gql`
        query Subjects {
          subjects {
              id
              title
              coverImgUrl
              classLevelId
              createdAt
              updatedAt
          }
        }
      `
    }).valueChanges;
  }
}
