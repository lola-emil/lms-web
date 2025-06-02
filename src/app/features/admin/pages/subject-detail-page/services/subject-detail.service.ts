import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type Subject = {
  id: number;
  title: string;
  coverImgUrl?: string;
  classLevelId: number;
  createdAt: string;
  updatedAt: string;

  gradeLevel: {
    level: number
  }
};

@Injectable({
  providedIn: 'root'
})
export class SubjectDetailService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getSubjectDetail(subjectId: number) {
    return this.apollo.watchQuery<{ subject: Subject; }>({
      query: gql`
          query Subject {
              subject(id: ${subjectId}) {
                  id
                  title
                  coverImgUrl
                  classLevelId
                  createdAt
                  updatedAt
                  gradeLevel {
                    level
                  }
              }
          }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }
}
