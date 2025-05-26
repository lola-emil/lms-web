import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type SubjectMaterial = {
  id: number;
  teacherSubjectId: number;
  materialType: any;
  createdAt: string;
  updatedAt: string;
  title?: string;
  content?: string;
  attachments: {
    id: number;
    filename?: string;
    fileURL: string;
  }[]
};

@Injectable({
  providedIn: 'root'
})
export class LessonContentService {

  constructor(
    private readonly apollo: Apollo
  ) { }


    getLessonContent(materialId: number) {
      return this.apollo.watchQuery<{ subjectMaterial: SubjectMaterial; }>({
        query: gql`
          query SubjectMaterial {
              subjectMaterial(id: ${materialId}) {
                  id
                  teacherSubjectId
                  materialType
                  createdAt
                  updatedAt
                  title
                  content
                  attachments {
                      id
                      filename
                      fileURL
                      subjectMaterialId
                  }
              }
          }
        `,
        fetchPolicy: "no-cache"
      }).valueChanges;
    }
}
