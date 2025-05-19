import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export type Subject = {
  teacherAssignedSubjects: TeacherSubject[];
};

export type TeacherSubject = {
  id: number;
  teacher: Student;
  studentEnrolledSubjects: StudentSubject[];
  createdAt: string;
};

export type StudentSubject = {
  student: Student;
  createdAt: string;
};

export type Student = {
  id: number;
  email: string;
  firstname: string;
  middlename?: string;
  lastname: string;
};

@Injectable({
  providedIn: 'root'
})
export class EnrolledStudentsService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  getStudents() {
    return this.apollo.watchQuery<{ students: Student[]; }>({
      query: gql`
        query Users {
            students {
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

      `
    }).valueChanges;
  }

  getTeacherSubjects(subjectId: number) {
    return this.apollo.watchQuery<{ subject: Subject; }>({
      query: gql`
        query Subject {
            subject(id: ${subjectId}) {
                teacherAssignedSubjects {
                    id
                    studentEnrolledSubjects {
                      student {
                        id
                        firstname
                        lastname
                        email
                      }
                      createdAt
                    }
                    teacher {
                      id
                      firstname
                      lastname
                      email
                    }
                }
            }
        }

      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  addStudent(body: {
    studentId: number;
    teacherSubjectId: number;
  }) {
    return this.http.post(`${environment.apiURL}/graphql-ext/enroll-student`, body);
  }
}
