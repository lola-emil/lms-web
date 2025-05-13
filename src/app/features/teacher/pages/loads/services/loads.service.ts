import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type TeacherAssignedSubjectsByTeacherIdResponse = {
  teacherAssignedSubjectsByTeacherId: {
    id: string;
    schoolYearId: string;
    createdAt: string;
    updatedAt: string;
    subject: {
      id: string;
      title: string;
      coverImgUrl: string;
    };
    studentEnrolledSubjects: {
      id: number;
    }[];
  }[];
};


@Injectable({
  providedIn: 'root'
})
export class LoadsService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getTeacherSubjects(teacherId: number) {
    return this.apollo.watchQuery<TeacherAssignedSubjectsByTeacherIdResponse>({
      query: gql`
        query TeacherAssignedSubjectsByTeacherId {
            teacherAssignedSubjectsByTeacherId(teacherId: ${teacherId}) {
                id
                schoolYearId
                createdAt
                updatedAt
                subject {
                    id
                    title
                    coverImgUrl
                }
                studentEnrolledSubjects {
                    id
                }
            }
        }
      `
    }).valueChanges;
  }
}
