import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type Subject = {
  id: number;
  title: string;
  coverImgUrl?: string;
  classLevelId: number;
  createdAt: string;
  updatedAt: string;

  subjectMaterials: {
    id: number;
    description: string;
    subjectId: number;
    materialType: string;
    fileURL?: string;
    mdContentId?: number;
    createdAt: string;
    updatedAt: string;
  }[]
};

@Injectable({
  providedIn: 'root'
})
export class SubjectDetailService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getSubjectDetail(subjectId: number) {
    return this.apollo.watchQuery<{subject: Subject}>({
      query: gql`
          query Subject {
              subject(id: 1) {
                  id
                  title
                  coverImgUrl
                  classLevelId
                  createdAt
                  updatedAt
                  subjectMaterials {
                      id
                      description
                      subjectId
                      materialType
                      fileURL
                      mdContentId
                      createdAt
                      updatedAt
                  }
              }
          }
      `
    }).valueChanges;
  }
}
