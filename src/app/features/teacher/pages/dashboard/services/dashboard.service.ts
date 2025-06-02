import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type TeacherAssignedSubjectsByTeacherIdResponse = {
  teacherSubjectsPerTeacher: {
    id: string;
    schoolYearId: string;
    createdAt: string;
    updatedAt: string;
    subject: {
      id: string;
      title: string;
      coverImgUrl: string;
      gradeLevel: {
        level: number
      }
    };
    studentEnrolledSubjects: {
      id: number;
    }[];
  }[];
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private apollo: Apollo
  ) { }

  getTeacherSubjects(teacherId: number) {
    return this.apollo.watchQuery<TeacherAssignedSubjectsByTeacherIdResponse>({
      query: gql`
        query TeacherSubject {
          teacherSubjectsPerTeacher(teacherId: ${teacherId}) {
              id
              subjectId
              teacherId
              subject {
                  id
                  title
                  coverImgUrl
                  gradeLevel {
                      id
                      level
                  }
              }
          }
        }
      `
    }).valueChanges;
  }
}
