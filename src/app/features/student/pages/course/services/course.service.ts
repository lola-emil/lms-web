import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type StudentSubject = {
  teacherSubject: {
    id: number;
    subject: {
      id: number;
      title:  string;
    },
    teacher: {
      firstname: string;
      lastname: string;
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getSubjectDetail(studentSubjectId: number) {
    return this.apollo.watchQuery<{studentEnrolledSubject: StudentSubject}>({
      query: gql`
        query StudentEnrolledSubject {
            studentEnrolledSubject(id: ${studentSubjectId}) {
                teacherSubject {
                    id
                    subject {
                        id
                        title
                    }
                    teacher {
                        firstname
                        middlename
                        lastname
                    }
                }
            }
        }

      `
    }).valueChanges;
  }
}
