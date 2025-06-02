import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type TeacherAssignedSubject2Response = {
  teacherAssignedSubject: {
    id: string;
    schoolYear: {
      yearStart: string;
      yearEnd: string;
    };
    subject: {
      title: string;
      coverImgUrl: string;
    };
  };
};


export type EnrolledStudent = {
  student: {
    id: number;
    email: string;
    firstname: string;
    middlename?: string;
    lastname: string;
    role: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SubjectDetailService {

  constructor(
    private apollo: Apollo
  ) { }

  getSubjectDetail(teacherSubjectId: number) {
    return this.apollo.watchQuery<TeacherAssignedSubject2Response>({
      query: gql`
        query TeacherSubject {
          teacherSubject(id: ${teacherSubjectId}) {
                id
                schoolYear {
                    yearStart
                    yearEnd
                }
                subject {
                    title
                    coverImgUrl
                }
          }
        }

      `
    }).valueChanges;
  }

  getStudents(teacherSubjectId: number) {
    return this.apollo.watchQuery<{teacherAssignedSubject: {id: number; studentEnrolledSubjects: EnrolledStudent[]}}>({
      query: gql`
        query TeacherAssignedSubject {
            teacherSubject(id: ${teacherSubjectId}) {
                id
                studentEnrolledSubjects {
                    student {
                        id
                        email
                        firstname
                        middlename
                        lastname
                        role
                        createdAt
                        updatedAt
                    }
                }
            }
        }
      `
    }).valueChanges;
  }
}
