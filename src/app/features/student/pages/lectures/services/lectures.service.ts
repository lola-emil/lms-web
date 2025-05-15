import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type StudentSubject = {
  teacherSubject: {
    subject: {
      subjectMaterials: {
        id: number;
        title?: string;
        materialType: any;
        createdAt: string;
        updatedAt: string;
        quizSessions: {
          id: number;
          createdAt: string;
          score: number;
        }[];
        questions: { id: number; }[];
      }[];
    };
  };
};

@Injectable({
  providedIn: 'root'
})
export class LecturesService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getMaterials(studentSubjectId: number) {
    return this.apollo.watchQuery<{ studentEnrolledSubject: StudentSubject; }>({
      query: gql`
        query StudentEnrolledSubjects {
            studentEnrolledSubject(id: ${studentSubjectId}) {
                teacherSubject {
                    subject {
                        subjectMaterials {
                            id
                            title
                            materialType
                            createdAt
                            updatedAt
                            quizSessions {
                              id
                              createdAt
                              score
                           }
                            questions {
                              id
                            }
                        }
                    }
                }
            }
        }

      `
    }).valueChanges;
  }
}
