import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export type Subject = {
  teacherAssignedSubjects: TeacherSubject[];
};

export type TeacherSubject = {
  teacher: Teacher;
  createdAt: string;
};

export type Teacher = {
  id: number;
  email: string;
  firstname: string;
  middlename?: string;
  lastname: string;
};

@Injectable({
  providedIn: 'root'
})
export class TeacherSubjectService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  getTeacherSubjects(subjectId: number) {
    return this.apollo.watchQuery<{ subject: Subject; }>({
      query: gql`
        query Subjects {
            subject(id: ${subjectId}) {
                teacherAssignedSubjects {
                  createdAt
                    teacher {
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


  getTeachers() {
    return this.apollo.watchQuery<{ teachers: Teacher[]; }>({
      query: gql`
        query Users {
            teachers {
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

  addTeacher(body: {
    subjectId: number;
    teacherId: number;
  }) {
    return this.http.post(`${environment.apiURL}/graphql-ext/add-teacher-to-subject`, body);
  }
}
