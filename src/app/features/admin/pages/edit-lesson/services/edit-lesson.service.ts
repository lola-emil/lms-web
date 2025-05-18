import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';


export type Subject = {
  id: number;
  title: string;
};

export type Lesson = {
  id: number;
  title: string;
  subjectId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  subject: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  };
};


@Injectable({
  providedIn: 'root'
})
export class EditLessonService {

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
              }
          }
        `
    }).valueChanges;
  }


  getLesson(lessonId: number) {
    return this.apollo.watchQuery<{ subjectMaterial: Lesson; }>({
      query: gql`
        query SubjectMaterial {
            subjectMaterial(id: ${lessonId}) {
                id
                title
                subjectId
                content
                createdAt
                updatedAt
                subject {
                    id
                    title
                    createdAt
                    updatedAt
                }
            }
        }
        `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  updateLesson(body: {
    title?: string | null;
    content?: string | null;
    subjectId?: number | null;
    subjectMaterialId?: number | null;
  }) {
    return this.http.post(`${environment.apiURL}/graphql-ext/update-lesson`, body);
  }
}
