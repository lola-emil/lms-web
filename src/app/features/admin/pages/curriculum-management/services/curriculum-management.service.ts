import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export type Subject = {
  id: number;
  title: string;
  coverImgUrl?: string;
  classLevelId: number;

  gradeLevel: {
    id: number;
    level: number;
  };

  // subjectMaterials: { id: number; }[];

  createdAt: string;
  updatedAt: string;
};

export type ClassLevel = {
  id: number;
  level: number;
};

@Injectable({
  providedIn: 'root'
})
export class CurriculumManagementService {

  constructor(
    private readonly apollo: Apollo,
    private http: HttpClient
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
              gradeLevel {
                id
                level
              }
              # subjectMaterials {
              #   id
              # }
          }
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  filterSubject(classLevelId: number) {
    return this.apollo.watchQuery<{ subjectPerLevel: Subject[]; }>({
      query: gql`
        query SubjectPerLevel {
            subjectPerLevel(classLevelId: ${classLevelId}) {
                id
                title
                coverImgUrl
                classLevelId
                createdAt
                updatedAt
                gradeLevel {
                  id
                  level
                }
            }
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  getGradeLevels() {
    return this.apollo.watchQuery<{ classLevels: ClassLevel[]; }>({
      query: gql`
        query ClassLevels {
          classLevels {
            id
            level
          }
        }
      `
    }).valueChanges;
  }

  addSubject(body: {
    title: string;
    gradeLevelId: number;
    coverImage?: File;
  }) {
    const formData = new FormData();

    if (body.coverImage)
      formData.append("files", body.coverImage);

    formData.append("title", body.title);
    formData.append("gradeLevelId", body.gradeLevelId + '');

    return this.http.post(`${environment.apiURL}/graphql-ext/add-subject`, formData);
  }
}
