import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type SubjectMaterial = {
  id: number;
  materialType: any;
  createdAt: string;
  updatedAt: string;
  title?: string;
  content?: string;
  teacherSubject: {
    id: number;
  };
  attachments: {
    id: number;
    filename?: string;
    fileURL: string;
  }[];
};

@Injectable({
  providedIn: 'root'
})
export class LectureContentService {

  constructor(
    private readonly apollo: Apollo/*  */
  ) { }

  getLessonContent(materialId: number) {
    return this.apollo.watchQuery<{ subjectMaterial: SubjectMaterial; }>({
      query: gql`
        query SubjectMaterial {
            subjectMaterial(id: ${materialId}) {
                id
                materialType
                createdAt
                updatedAt
                title
                content
                teacherSubject {
                  id
                }
                attachments {
                    id
                    filename
                    fileURL
                    subjectMaterialId
                }
            }
        }

      `
    }).valueChanges;
  }
}
